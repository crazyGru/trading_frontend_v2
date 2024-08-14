'use client';

import React, { useState, useEffect } from 'react';
import BalanceInfo from '@/components/BalanceInfo';
import WithdrawForm from '@/components/WithdrawForm';
import PaymentMethod from '@/components/PaymentMethod';
import ConfirmButton from '@/components/ConfirmButton';
import { toast } from '@/components/ui/use-toast';

const Withdraw = () => {
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');
  const [withdrawData, setWithdrawData] = useState({ address: '', amount: 0 });
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      setUsername(userData.username);
    } catch (error) {
      toast({
        title: 'Error fetching user data',
        description: 'Please try logging in again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (username && token) {
      fetchBalance();
    }
  }, [username, token]);

  const fetchBalance = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/balance`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch balance');
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      toast({
        title: 'Error fetching balance',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/withdraw/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          address: withdrawData.address,
          amount: withdrawData.amount
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred');
      }
      const data = await response.json();
      setBalance(data.newBalance);
      toast({
        title: 'Withdrawal successful',
        description: 'Your withdrawal has been processed.',
        className: 'bg-green-500 text-white',
      });
    } catch (error: any) {
      toast({
        title: 'Error processing withdrawal',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="withdraw-page bg-gray-900 min-h-screen text-white p-4">
      <BalanceInfo 
        balance={balance} 
        onBalanceUpdate={setBalance}
      />
      <WithdrawForm onWithdraw={setWithdrawData} />
      <ConfirmButton onClick={handleWithdraw} />
    </div>
  );
};

export default Withdraw;