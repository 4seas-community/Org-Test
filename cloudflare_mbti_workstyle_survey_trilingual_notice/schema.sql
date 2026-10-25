CREATE TABLE IF NOT EXISTS responses (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
 answers_json TEXT NOT NULL,
 type_code TEXT NOT NULL,
 ei INTEGER NOT NULL,
 sn INTEGER NOT NULL,
 tf INTEGER NOT NULL,
 jp INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_responses_type ON responses(type_code);
