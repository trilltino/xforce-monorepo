use crate::pubkey_to_nodeid;
use iroh::EndpointId;
use solana_sdk::pubkey::Pubkey;

/// Represents a peer's identity in the Social-Fi network.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PeerIdentity {
    pub pubkey: Pubkey,
    pub node_id: EndpointId,
}

impl PeerIdentity {
    pub fn new(pubkey: Pubkey) -> Self {
        let node_id = pubkey_to_nodeid(&pubkey);
        Self { pubkey, node_id }
    }
}
