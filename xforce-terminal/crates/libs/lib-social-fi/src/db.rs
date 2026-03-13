use rusqlite::{params, Connection, Result};
use std::path::Path;
use tracing::info;

/// Manages the local SQLite database for persisting P2P data.
pub struct SocialDb {
    conn: std::sync::Mutex<Connection>,
}

impl SocialDb {
    /// Initializes a new database connection at the given path, creating tables if they don't exist.
    pub fn new<P: AsRef<Path>>(db_path: P) -> Result<Self> {
        let conn = Connection::open(db_path)?;

        // Initialize Schema
        conn.execute(
            "CREATE TABLE IF NOT EXISTS channels (
                url TEXT PRIMARY KEY,
                last_updated INTEGER DEFAULT CURRENT_TIMESTAMP
            )",
            [],
        )?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS updates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                version_id TEXT NOT NULL,
                parents TEXT NOT NULL,
                content BLOB,
                received_at INTEGER DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(url) REFERENCES channels(url)
            )",
            [],
        )?;

        // Index for faster queries on a specific channel's history
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_updates_url ON updates(url)",
            [],
        )?;

        info!("Social-Fi SQLite database initialized");
        Ok(Self {
            conn: std::sync::Mutex::new(conn),
        })
    }

    /// Stores a raw Braid Update for a specific channel URL.
    pub fn insert_update(
        &self,
        url: &str,
        version_id: &str,
        parents_json: &str,
        content: Option<&[u8]>,
    ) -> Result<()> {
        // Ensure channel exists
        let conn = self.conn.lock().unwrap();
        conn.execute(
            "INSERT OR IGNORE INTO channels (url) VALUES (?1)",
            params![url],
        )?;

        // Insert Update
        conn.execute(
            "INSERT INTO updates (url, version_id, parents, content) VALUES (?1, ?2, ?3, ?4)",
            params![url, version_id, parents_json, content],
        )?;

        Ok(())
    }

    /// Retrieves all updates for all channels, grouped by URL.
    /// This is used to hydrate the in-memory store on startup.
    pub fn get_all_updates(
        &self,
    ) -> Result<std::collections::HashMap<String, Vec<(String, Vec<String>, Option<Vec<u8>>)>>>
    {
        let conn = self.conn.lock().unwrap();
        let mut stmt =
            conn.prepare("SELECT url, version_id, parents, content FROM updates ORDER BY id ASC")?;
        let rows = stmt.query_map([], |row| {
            let url: String = row.get(0)?;
            let version_id: String = row.get(1)?;
            let parents_json: String = row.get(2)?;
            let content: Option<Vec<u8>> = row.get(3)?;

            // For now we just return the raw strings/bytes, the node logic will parse them
            // In a real app we'd store JSON parents properly
            Ok((url, version_id, vec![parents_json], content))
        })?;

        let mut map = std::collections::HashMap::new();
        for row in rows {
            let (url, version_id, parents, content) = row?;
            map.entry(url)
                .or_insert_with(Vec::new)
                .push((version_id, parents, content));
        }

        Ok(map)
    }
}
