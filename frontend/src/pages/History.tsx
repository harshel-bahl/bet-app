import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/shadcn/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/shadcn/card';
import { Button } from '../components/shadcn/button';
import { useNavigate } from 'react-router-dom';

const fetchHistory = async () => {
  const res = await fetch('http://localhost:4000/api/history');
  return res.json();
};

const HistoryPage: React.FC = () => {

const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: ['history'], 
    queryFn: fetchHistory
  });

  if (isLoading) return <div>Loading history...</div>;
  if (error) return <div>Error loading history.</div>;

  return (
    <div className="w-full flex flex-col justify-center items-center bg-background rounded-lg px-8 py-5 gap-10">
      <h1 className='text-2xl font-bold mr-auto'>Bet History</h1>
      <Table className="w-full table-auto mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Bet Amount</TableHead>
            <TableHead>Bet Number</TableHead>
            <TableHead>Dice Result</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((bet: any) => {
            const date = new Date(bet.timestamp);
            return (
              <TableRow key={bet.id}>
                <TableCell>{bet.betAmount}</TableCell>
                <TableCell>{bet.betNumber}</TableCell>
                <TableCell>{bet.diceResult}</TableCell>
                <TableCell className={bet.result === 'Win' ? 'bg-green-400' : 'bg-red-400'}>
                  {bet.result}
                </TableCell>
                <TableCell>{date.toLocaleDateString()}</TableCell>
                <TableCell>{date.toLocaleTimeString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {data.length == 0 && <Card className='mt-10'>
                    <CardHeader>
                        <CardTitle>Looks like your bet history is empty!</CardTitle>
                        <CardDescription>Make some bets for them to show up here</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col items-center justify-center'>
                        <Button onClick={() => {
                            navigate('/');
                        }}>Let's bet</Button>
                    </CardContent>
                </Card>}
    </div>
  );
};

export default HistoryPage;
