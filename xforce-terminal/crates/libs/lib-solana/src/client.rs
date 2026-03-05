//! Solana RPC client

use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::{clock::Epoch, pubkey::Pubkey};
use std::sync::Arc;
use tracing::info;

#[derive(Debug, Clone)]
pub struct EpochInfo {
    pub epoch: Epoch,
    pub slot_index: u64,
    pub slots_in_epoch: u64,
}

#[derive(Debug, Clone)]
pub enum Network {
    Mainnet,
    Devnet,
}

pub struct SolanaClient {
    rpc: Arc<RpcClient>,
    network: Network,
}

#[derive(Debug, Clone, Default)]
pub struct SolanaClientBuilder {
    network: Option<Network>,
    helius_api_key: Option<String>,
    custom_rpc_url: Option<String>,
}

impl SolanaClientBuilder {
    pub fn network(mut self, network: Network) -> Self {
        self.network = Some(network);
        self
    }

    pub fn helius_api_key(mut self, key: String) -> Self {
        self.helius_api_key = Some(key);
        self
    }

    pub fn custom_rpc_url(mut self, url: String) -> Self {
        self.custom_rpc_url = Some(url);
        self
    }

    pub fn build(self) -> SolanaClient {
        let network = self.network.unwrap_or(Network::Devnet);
        let rpc_url = self.custom_rpc_url.unwrap_or_else(|| match network {
            Network::Mainnet => {
                if let Some(key) = self.helius_api_key {
                    format!("https://mainnet.helius-rpc.com/?api-key={}", key)
                } else {
                    "https://api.mainnet-beta.solana.com".to_string()
                }
            }
            Network::Devnet => "https://api.devnet.solana.com".to_string(),
        });

        SolanaClient {
            rpc: Arc::new(RpcClient::new(rpc_url)),
            network,
        }
    }
}

impl SolanaClient {
    pub fn builder() -> SolanaClientBuilder {
        SolanaClientBuilder::default()
    }

    pub fn new(network: Network, helius_api_key: Option<String>) -> Self {
        let url = match network {
            Network::Mainnet => {
                if let Some(key) = helius_api_key {
                    format!("https://mainnet.helius-rpc.com/?api-key={}", key)
                } else {
                    "https://api.mainnet-beta.solana.com".to_string()
                }
            }
            Network::Devnet => "https://api.devnet.solana.com".to_string(),
        };

        info!("Connecting to Solana RPC: {}", url);

        Self {
            rpc: Arc::new(RpcClient::new(url)),
            network,
        }
    }

    pub async fn get_account(&self, pubkey: &Pubkey) -> anyhow::Result<solana_sdk::account::Account> {
        self.rpc.get_account(pubkey).await
            .map_err(|e| anyhow::anyhow!("RPC error: {}", e))
    }

    pub async fn get_epoch_info(&self) -> anyhow::Result<EpochInfo> {
        let info = self.rpc.get_epoch_info().await
            .map_err(|e| anyhow::anyhow!("Failed to get epoch info: {}", e))?;

        Ok(EpochInfo {
            epoch: info.epoch,
            slot_index: info.slot_index,
            slots_in_epoch: info.slots_in_epoch,
        })
    }

    pub async fn health_check(&self) -> anyhow::Result<()> {
        self.rpc.get_version().await
            .map_err(|e| anyhow::anyhow!("Health check failed: {}", e))?;
        Ok(())
    }

    pub fn network(&self) -> &Network {
        &self.network
    }

    pub async fn send_transaction(&self, transaction: &solana_sdk::transaction::Transaction) -> anyhow::Result<String> {
        let signature = self.rpc.send_and_confirm_transaction(transaction).await
            .map_err(|e| anyhow::anyhow!("Failed to send transaction: {}", e))?;
        Ok(signature.to_string())
    }

    pub async fn get_latest_blockhash(&self) -> anyhow::Result<solana_sdk::hash::Hash> {
        self.rpc.get_latest_blockhash().await
            .map_err(|e| anyhow::anyhow!("Failed to get blockhash: {}", e))
    }

    pub async fn get_signatures_for_address(
        &self,
        pubkey: &Pubkey,
    ) -> anyhow::Result<Vec<solana_client::rpc_response::RpcConfirmedTransactionStatusWithSignature>> {
        self.rpc.get_signatures_for_address(pubkey).await
            .map_err(|e| anyhow::anyhow!("Failed to get signatures: {}", e))
    }
}
