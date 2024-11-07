import { db } from '../database';

export const getUser = async () => {
  const database = await db;
  return database.get(`SELECT * FROM users WHERE id = 1`);
};

export const updateUserBalance = async (balance: number, hasWonOnce: boolean) => {
  const database = await db;
  return database.run(`UPDATE users SET balance = ?, hasWonOnce = ? WHERE id = 1`, [balance, hasWonOnce]);
};
