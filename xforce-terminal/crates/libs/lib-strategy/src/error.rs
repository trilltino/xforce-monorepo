use thiserror::Error;

#[derive(Debug, Error)]
pub enum StrategyError {
    #[error("Initialization error: {0}")]
    InitError(String),

    #[error("Calculation error: {0}")]
    CalcError(String),

    #[error("Execution error: {0}")]
    ExecutionError(String),

    #[error("Model error: {0}")]
    ModelError(String),

    #[error(transparent)]
    Other(#[from] anyhow::Error),
}
