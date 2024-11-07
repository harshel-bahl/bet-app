import React from 'react';
import { useQuery } from '@tanstack/react-query';

export const fetchBalance = async () => {
  const res = await fetch('http://localhost:4000/api/balance');
  return res.json();
};

const BalanceDisplay: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['balance'], 
    queryFn: fetchBalance, 
    staleTime: 1000,
  });

  if (isLoading) return <div>Loading balance...</div>;
  if (error) return <div>Error loading balance.</div>;

  return (
      <h2 style={{ color: data.balance >= 1000 ? '#33cc33' : '#ff3333' }} className='text-5xl font-bold'>
        ${data.balance.toFixed(2)}
      </h2>
  );
};

export default BalanceDisplay;
