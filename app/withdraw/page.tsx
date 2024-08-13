'use client';

import React, { useState, useEffect } from 'react';
import BalanceInfo from '@/components/BalanceInfo';
import WithdrawForm from '@/components/WithdrawForm';
import PaymentMethod from '@/components/PaymentMethod';
import ConfirmButton from '@/components/ConfirmButton';
import { toast } from '@/components/ui/use-toast';

const Withdraw = () => {
  const [balance, setBalance] = useState(0);
  const [pending, setPending] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('TRC20-USDT');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(user.username || '');
  }, []);
  
  useEffect(() => {
    // Fetch user balance info
    const fetchBalance = async () => {
      try {
        const response = await fetch(`/api/balance/${username}`);
        setBalance(response.balance);
      } catch (error) {
        toast({
            title: 'Error fetching balance',
            description: 'Please try again later.',
            variant: 'destructive',
          });
      }
    };
    if (username) {
      fetchBalance();
    }
  }, [username]);

  const handleWithdraw = async (withdrawData: any) => {
    try {
      const response = await fetch(`/api/withdraw/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(withdrawData),
      });
      toast({
        title: 'Withdrawal successful',
        description: 'Your withdrawal has been processed.',
        className: 'bg-green-500 text-white',
      });
    } catch (error:any) {
      toast({
        title: 'Error processing withdrawal',
        description: error.response.data.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="withdraw-page">
      <h1 className="text-2xl font-bold mb-4">Withdraw</h1>
      <BalanceInfo balance={balance} pending={pending} />
      <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      <WithdrawForm onWithdraw={handleWithdraw} paymentMethod={paymentMethod} />
      <ConfirmButton onClick={handleWithdraw} />
    </div>
  );
};

export default Withdraw;
