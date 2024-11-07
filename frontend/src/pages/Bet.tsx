import React from 'react';
import BalanceDisplay, { fetchBalance } from '../components/BalanceDisplay';
import BetForm from '../components/BetForm';
import WithdrawButton from '../components/WithdrawButton';
import { useQuery } from '@tanstack/react-query';

const BetPage: React.FC = () => {
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['balance'], 
        queryFn: fetchBalance, 
        staleTime: 1000,
    });

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="w-full flex flex-col justify-center items-center bg-background rounded-lg px-8 py-5 gap-10">
                <div className="relative w-full flex justify-between">
                    <h1 className="text-2xl font-bold mb-4 mr-auto">Current Balance</h1>
                    <div 
                        className={`absolute flex items-start top-0 right-0 w-[300px] h-[50px] justify-end ${data && data.balance > 2000 ? "hover:translate-x-40 transition-transform duration-500" : ""}`}
                    >
                        <WithdrawButton />
                    </div>
                </div>

                <div className='flex gap-5 items-center justify-center'>
                    <BalanceDisplay />
                </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center bg-background rounded-lg px-8 py-5 gap-10">
                <div className="w-full flex justify-between">
                    <h1 className="text-2xl font-bold mb-4 mr-auto">Place your bet</h1>
                </div>

                <BetForm />
            </div>
        </div>
    );
};

export default BetPage;
