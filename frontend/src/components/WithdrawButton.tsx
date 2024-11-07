// frontend/src/components/WithdrawButton.tsx
import React, { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const WithdrawButton: React.FC = () => {
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  
  const { data } = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/balance');
      return res.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:4000/api/withdraw', {
        method: 'POST',
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    }
  });

  const handleWithdraw = () => {
    mutation.mutate();
  };

  useEffect(() => {
    if (data && data.balance >= 20000) {
      const button = buttonRef.current;
      const moveButton = () => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        if (button) {
          button.style.position = 'absolute';
          button.style.left = `${x}px`;
          button.style.top = `${y}px`;
        }
      };
      if (button) {
        button.addEventListener('mouseover', moveButton);
        return () => {
          button.removeEventListener('mouseover', moveButton);
        };
      }
    }
  }, [data]);

  return (
    <button
      ref={buttonRef}
      className="bg-green-500 text-white px-4 py-2 rounded"
      onClick={handleWithdraw}
    >
      Withdraw
    </button>
  );
};

export default WithdrawButton;
