//! Authentication library

pub mod pwd;
pub mod token;

pub use pwd::{hash_password, verify_password};
pub use token::{Claims, encode_jwt, decode_jwt};
