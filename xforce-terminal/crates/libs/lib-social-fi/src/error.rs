use thiserror::Error;

#[derive(Debug, Error)]
pub enum SocialFiError {
    #[error("Node error: {0}")]
    NodeError(String),

    #[error("Init error: {0}")]
    InitError(String),

    #[error("Sync error: {0}")]
    SyncError(String),

    #[error("Identity error: {0}")]
    IdentityError(String),

    #[error(transparent)]
    Other(#[from] anyhow::Error),
}
