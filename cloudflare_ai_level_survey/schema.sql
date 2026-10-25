CREATE TABLE IF NOT EXISTS responses (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
 answers_json TEXT NOT NULL,
 average_score REAL NOT NULL,
 level INTEGER NOT NULL CHECK (level BETWEEN 0 AND 4)
);
CREATE INDEX IF NOT EXISTS idx_responses_level ON responses(level);
