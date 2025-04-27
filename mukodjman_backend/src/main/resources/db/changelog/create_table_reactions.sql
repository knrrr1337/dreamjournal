CREATE TABLE reactions (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           dream_id INT NOT NULL,
                           user_id INT NOT NULL,
                           type ENUM('like', 'dislike') NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (dream_id) REFERENCES dreams(id) ON DELETE CASCADE,
                           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);