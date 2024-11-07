// frontend/src/components/BetForm.tsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from './hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './shadcn/card';

const BetForm: React.FC = () => {
  
  const [betAmount, setBetAmount] = useState('');
  const [betNumber, setBetNumber] = useState('1');
  const [message, setMessage] = useState('');
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [winnings, setWinnings] = useState(null)

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          betAmount: parseInt(betAmount),
          betNumber: parseInt(betNumber),
        }),
      });
      return res.json();
    },
    onSuccess: (data: any) => {
      setLoading(false);
      if (data.error) {
        setMessage(data.error);
        toast({ title: 'Bet Error', description: data.error });
      } else {
        setWinnings(data.winnings);
        setDiceResult(data.diceResult);
        setMessage(data.didWin ? 'You won!' : 'You lost.');
        toast({ title: 'Bet Result', description: data.didWin ? 'You won!' : 'You lost.' });
        queryClient.invalidateQueries({ queryKey: ['balance'] });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setDiceResult(null);
    mutation.mutate();
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-5 justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 max-w-[400px]">
        <div className='flex gap-5'>
          <div className="mb-4">
            <label className="block mb-2">Bet Amount:</label>
            <input
              type="number"
              min="1"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bet Number (1-6):</label>
            <select
              value={betNumber}
              onChange={(e) => setBetNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-400 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit Bet'}
        </button>
      </form>

      {message && (
        <Card className="mt-4 md:mt-0 md:ml-4 flex-1 max-w-[400px] shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Bet Result</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              {diceResult !== null && (
                <p className="text-lg">Dice Result: <span className="font-bold ml-1">{diceResult}</span></p>
              )}
              <p className="text-lg">Game Result: <span className="font-bold ml-1">{message}</span></p>
              {diceResult !== null && (
                <p className={`text-lg ${message === 'You won!' ? 'text-green-500' : 'text-red-500'}`}>
                  Amount {message === 'You won!' ? 'Won' : 'Lost'}: <span className="font-bold ml-1">{winnings}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BetForm;
