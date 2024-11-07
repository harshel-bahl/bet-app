import { db } from '../database';

export const addBet = async (bet: {
  userId: number;
  betAmount: number;
  betNumber: number;
  diceResult: number;
  result: string;
}) => {
  const database = await db;
  return database.run(
    `INSERT INTO bets (userId, betAmount, betNumber, diceResult, result) VALUES (?, ?, ?, ?, ?)`,
    [bet.userId, bet.betAmount, bet.betNumber, bet.diceResult, bet.result]
  );
};

export const getBetHistory = async () => {
  const database = await db;
  return database.all(`SELECT * FROM bets WHERE userId = 1 ORDER BY timestamp DESC`);
};

export const deleteAllBets = async () => {
  const database = await db;
  return database.run(`DELETE FROM bets`);
};
