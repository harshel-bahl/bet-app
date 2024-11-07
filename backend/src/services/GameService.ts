import { getUser, updateUserBalance } from '../models/UserModel';
import { addBet } from '../models/BetModel';
import { deleteAllBets } from '../models/BetModel';

export const playGame = async (betAmount: number, betNumber: number) => {
  const user = await getUser();

  if (betAmount > user.balance) {
    throw new Error('Insufficient balance.');
  }

  let diceResult = Math.floor(Math.random() * 6) + 1;
  let finalResult = diceResult;
  let didWin = diceResult === betNumber;

  // Rigged dice logic
  if (user.balance >= 10000 && didWin) {
    if (Math.random() < 0.5) {
      finalResult = Math.floor(Math.random() * 6) + 1;
      didWin = finalResult === betNumber;
    }
  } else if (user.balance >= 5000 && didWin) {
    if (Math.random() < 0.3) {
      finalResult = Math.floor(Math.random() * 6) + 1;
      didWin = finalResult === betNumber;
    }
  }

  let newBalance = user.balance - betAmount;
  let hasWonOnce = user.hasWonOnce;
  let winnings = -betAmount; // Default to loss

  if (didWin) {
    winnings = betAmount * 4; // Net gain is 4 times the bet amount
    newBalance += winnings + betAmount; // Add back the bet amount and winnings
    hasWonOnce = true;
  }

  await updateUserBalance(newBalance, hasWonOnce);

  await addBet({
    userId: user.id,
    betAmount,
    betNumber,
    diceResult: finalResult,
    result: didWin ? 'Win' : 'Lose',
  });

  if (newBalance <= 0) {
    await resetGame();
  }

  return {
    diceResult,
    finalResult,
    winnings,
    didWin,
    newBalance,
  };
};

export const resetGame = async () => {
  await updateUserBalance(1000, false);
  await deleteAllBets();
};
