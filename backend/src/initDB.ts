import { db } from './database';

export const initDB = async () => {
  const database = await db;
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      balance INTEGER,
      hasWonOnce BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS bets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      betAmount INTEGER,
      betNumber INTEGER,
      diceResult INTEGER,
      result TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);

  const user = await database.get(`SELECT * FROM users WHERE id = 1`);
  if (!user) {
    await database.run(`INSERT INTO users (balance, hasWonOnce) VALUES (1000, 0)`);
  }
};
