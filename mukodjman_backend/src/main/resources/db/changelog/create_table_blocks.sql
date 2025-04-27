CREATE TABLE blocks (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        blocker_id INT NOT NULL,
                        blocked_id INT NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (blocker_id) REFERENCES dreamjournal.users(id) ON DELETE CASCADE,
                        FOREIGN KEY (blocked_id) REFERENCES dreamjournal.users(id) ON DELETE CASCADE,
                        UNIQUE (blocker_id, blocked_id) -- Prevent duplicate block entries
);