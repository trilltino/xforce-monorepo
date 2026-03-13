use crate::{pubkey_to_nodeid, SocialDb, SocialFiError};
use braid_http_rs::{Update, Version};
use braid_iroh::{BraidIrohNode, DiscoveryConfig};
use bytes::Bytes;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signature::{Keypair, Signer};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::mpsc;
use tracing::{error, info};

/// The main Social-Fi node that handles P2P communication.
pub struct SocialFiNode {
    pub inner: Arc<BraidIrohNode>,
    pub pubkey: Pubkey,
    pub db: Arc<SocialDb>,
}

#[derive(serde::Serialize, serde::Deserialize, Debug, Clone)]
pub struct FileMetadata {
    pub name: String,
    pub size: u64,
    pub hash: String,
    pub mime: String,
}

impl SocialFiNode {
    /// Spawns a new Social-Fi node using the provided Solana Keypair.
    pub async fn spawn(
        keypair: Keypair,
        port: Option<u16>,
        db_path: PathBuf,
    ) -> Result<Self, SocialFiError> {
        let pubkey = keypair.pubkey();
        let alias = pubkey.to_string();

        let db = SocialDb::new(db_path)
            .map_err(|e| SocialFiError::InitError(format!("Failed to open DB: {}", e)))?;
        let db = Arc::new(db);

        // Use Iroh's real discovery (DNS, Pkarr)
        let discovery = DiscoveryConfig::Real;

        info!(pubkey = %alias, "Spawning Social-Fi node");

        // Map Solana Keypair to Iroh SecretKey
        let solana_bytes = keypair.to_bytes(); // 64 bytes
                                               // Ed25519 SecretKey in iroh is 32 bytes (the seed).
                                               // Solana's 64 bytes is [seed, pubkey].
        let seed = &solana_bytes[..32];
        let secret_key = iroh::SecretKey::from_bytes(seed.try_into().unwrap());

        // Create event channel for DB persistence
        let (tx, mut rx) = mpsc::channel(100);

        let (state, _rx) =
            braid_iroh::spawn_node(&alias, port, Some(secret_key), discovery, Some(tx))
                .await
                .map_err(|e| SocialFiError::NodeError(e.to_string()))?;

        let node = state.peer.clone();

        // --- HYDRATION PHASE ---
        // Load history from SQLite into memory
        if let Ok(history) = db.get_all_updates() {
            for (url, updates) in history {
                let mut hydrated_count = 0;
                for (version_id, _parents, content) in updates {
                    let version = Version::new(version_id);
                    let update =
                        Update::snapshot(version, Bytes::from(content.unwrap_or_default()));
                    node.store_update(&url, update).await;
                    hydrated_count += 1;
                }
                info!("Hydrated {} updates for channel: {}", hydrated_count, url);
            }
        }

        // Spawn a background task to index all incoming updates into SQLite
        let background_db = db.clone();
        tokio::spawn(async move {
            while let Some((url, update)) = rx.recv().await {
                let version_id = update
                    .version
                    .iter()
                    .map(|v| v.to_string())
                    .collect::<Vec<_>>()
                    .join(",");
                let parents_json = format!("{:?}", update.parents); // Simple representation for now
                let content = update.body.as_deref();

                if let Err(e) =
                    background_db.insert_update(&url, &version_id, &parents_json, content)
                {
                    error!("DB Persistence failed for {}: {}", url, e);
                } else {
                    info!("Saved incoming update to SQLite for block Sync: {}", url);
                }
            }
        });

        Ok(Self {
            inner: node,
            pubkey,
            db,
        })
    }

    /// Shares a trading strategy with a specific peer or the public feed.
    pub async fn share_strategy(
        &self,
        strategy_id: &str,
        content: &[u8],
    ) -> Result<(), SocialFiError> {
        let url = format!("/strategies/{}", strategy_id);

        let update = Update::snapshot(
            Version::new(chrono::Utc::now().to_rfc3339()),
            bytes::Bytes::copy_from_slice(content),
        );

        self.inner
            .put(&url, update.clone())
            .await
            .map_err(|e| SocialFiError::SyncError(e.to_string()))?;

        // Save successfully broadcasted strategy to local database
        let version_id = update
            .version
            .iter()
            .map(|v| v.to_string())
            .collect::<Vec<_>>()
            .join(",");
        if let Err(e) = self
            .db
            .insert_update(&url, &version_id, "[]", Some(content))
        {
            error!("Failed to save strategy broadcast to DB: {}", e);
        }

        info!(url = %url, "Shared strategy over P2P");
        Ok(())
    }

    /// Shares a file over the P2P network.
    /// In a full implementation, this would use Iroh Blobs.
    pub async fn share_file(
        &self,
        file_path: PathBuf,
        channel_url: &str,
    ) -> Result<FileMetadata, SocialFiError> {
        let file_name = file_path
            .file_name()
            .and_then(|n| n.to_str())
            .unwrap_or("unknown")
            .to_string();

        let content = std::fs::read(&file_path)
            .map_err(|e| SocialFiError::SyncError(format!("Failed to read file: {}", e)))?;

        let size = content.len() as u64;

        // Calculate hash (SHA256 for now, Iroh uses BLAKE3)
        use sha2::{Digest, Sha256};
        let mut hasher = Sha256::new();
        hasher.update(&content);
        let hash = format!("{:x}", hasher.finalize());

        let metadata = FileMetadata {
            name: file_name,
            size,
            hash: hash.clone(),
            mime: "application/octet-stream".to_string(), // Simple MIME detection could be added
        };

        // Create a special Braid Update with metadata
        let metadata_json = serde_json::to_vec(&metadata).unwrap();
        let update = Update::snapshot(
            Version::new(format!("file-{}", chrono::Utc::now().to_rfc3339())),
            Bytes::from(metadata_json),
        );

        // Broadcast to the channel
        self.inner
            .put(channel_url, update.clone())
            .await
            .map_err(|e| SocialFiError::SyncError(e.to_string()))?;

        // Save metadata to local DB (using url as the channel)
        let version_id = update
            .version
            .iter()
            .map(|v| v.to_string())
            .collect::<Vec<_>>()
            .join(",");
        self.db
            .insert_update(
                channel_url,
                &version_id,
                "[]",
                Some(update.body.as_ref().unwrap()),
            )
            .map_err(|e| SocialFiError::SyncError(e.to_string()))?;

        info!(file = %metadata.name, hash = %hash, "Shared file metadata over P2P");

        Ok(metadata)
    }

    /// Subscribes to a peer's private chat resource.
    pub async fn join_chat(&self, peer_pubkey: &Pubkey) -> Result<(), SocialFiError> {
        let peer_id = pubkey_to_nodeid(peer_pubkey);
        let url = format!("/chat/{}", peer_id);

        // iroh-gossip will handle finding the peer via discovery
        self.inner
            .subscribe(&url, vec![peer_id])
            .await
            .map_err(|e| SocialFiError::SyncError(e.to_string()))?;

        info!(peer = %peer_pubkey, "Joined P2P chat channel");
        Ok(())
    }
}
