import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './shadcn/table';

interface Props {
  onClose: () => void;
}

const fetchHistory = async () => {
  const res = await fetch('http://localhost:4000/api/history');
  return res.json();
};

const HistoryModal: React.FC<Props> = ({ onClose }) => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['history'], 
    queryFn: fetchHistory
  });

  if (isLoading) return <div>Loading history...</div>;
  if (error) return <div>Error loading history.</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-3/4 max-w-lg p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Bet History</h2>
        <Table className="w-full table-auto mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Bet Amount</TableHead>
              <TableHead>Bet Number</TableHead>
              <TableHead>Dice Result</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((bet: any) => (
              <TableRow key={bet.id}>
                <TableCell>{bet.betAmount}</TableCell>
                <TableCell>{bet.betNumber}</TableCell>
                <TableCell>{bet.diceResult}</TableCell>
                <TableCell>{bet.result}</TableCell>
                <TableCell>{new Date(bet.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
