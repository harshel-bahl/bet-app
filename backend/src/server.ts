
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDB } from './initDB';
import { playGame, resetGame } from './services/GameService';
import { getUser } from './models/UserModel';
import { getBetHistory } from './models/BetModel';

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
});

// API Endpoints

app.get('/api/balance', async (req, res) => {
  const user = await getUser();
  res.json({ balance: user.balance, hasWonOnce: user.hasWonOnce });
});

app.post('/api/bet', async (req, res) => {
  const { betAmount, betNumber } = req.body;
  try {
    const result = await playGame(betAmount, betNumber);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/withdraw', async (req, res) => {
  const user = await getUser();
  if (user.hasWonOnce) {
    await resetGame();
    res.json({ message: 'Balance withdrawn successfully.' });
  } else {
    res.status(400).json({ error: 'You need to win at least once to withdraw.' });
  }
});

app.get('/api/history', async (req, res) => {
  const history = await getBetHistory();
  res.json(history);
});
