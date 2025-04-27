CREATE TABLE comments (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          dream_id INT NOT NULL,
                          user_id INT NOT NULL,
                          content TEXT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (dream_id) REFERENCES dreamjournal.dreams(id) ON DELETE CASCADE,
                          FOREIGN KEY (user_id) REFERENCES dreamjournal.users(id) ON DELETE CASCADE
);