use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    signature::{Keypair, Signature},
    signer::Signer,
    transaction::Transaction,
};

pub struct SolanaService {
    client: RpcClient,
    keypair: Option<Keypair>,
}

impl SolanaService {
    pub fn new() -> Self {
        let rpc_url = std::env::var("SOLANA_RPC_URL")
            .unwrap_or_else(|_| "https://api.devnet.solana.com".to_string());
        
        Self {
            client: RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed()),
            keypair: None,
        }
    }

    pub fn load_keypair_from_file(&mut self, path: &str) -> Result<(), Box<dyn std::error::Error>> {
        let keypair_bytes = std::fs::read_to_string(path)?;
        let keypair_vec: Vec<u8> = serde_json::from_str(&keypair_bytes)?;
        let keypair_arr: [u8; 64] = keypair_vec.try_into()
            .map_err(|_| "Invalid keypair length, expected 64 bytes")?;
        self.keypair = Some(Keypair::new_from_array(keypair_arr[..32].try_into()?));
        Ok(())
    }

    pub fn generate_new_keypair(&mut self) -> String {
        let keypair = Keypair::new();
        let pubkey = keypair.pubkey().to_string();
        self.keypair = Some(keypair);
        pubkey
    }

    pub fn get_public_key(&self) -> Option<String> {
        self.keypair.as_ref().map(|k| k.pubkey().to_string())
    }

    pub async fn get_balance(&mut self) -> Result<f64, Box<dyn std::error::Error>> {
        let pubkey = self.keypair.as_ref()
            .ok_or("No keypair loaded")?
            .pubkey();
        
        let lamports = self.client.get_balance(&pubkey)?;
        Ok(lamports as f64 / 1_000_000_000.0) // Convert to SOL
    }

    pub async fn sign_and_send_transaction(
        &mut self,
        mut transaction: Transaction,
    ) -> Result<Signature, Box<dyn std::error::Error>> {
        let keypair = self.keypair.as_ref()
            .ok_or("No keypair loaded")?;
        
        // Get recent blockhash if not set
        if transaction.message.recent_blockhash == solana_sdk::hash::Hash::default() {
            let blockhash = self.client.get_latest_blockhash()?;
            transaction.message.recent_blockhash = blockhash;
        }
        
        // Sign
        transaction.sign(&[keypair], transaction.message.recent_blockhash);
        
        // Send
        let signature = self.client.send_and_confirm_transaction(&transaction)?;
        Ok(signature)
    }

    pub fn disconnect(&mut self) {
        self.keypair = None;
    }

    pub fn is_connected(&self) -> bool {
        self.keypair.is_some()
    }
}

impl Default for SolanaService {
    fn default() -> Self {
        Self::new()
    }
}
