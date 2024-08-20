'use client';

import React, { useState, useEffect } from 'react';
import BalanceInfo from '@/components/BalanceInfo';
import WithdrawForm from '@/components/WithdrawForm';
import ConfirmButton from '@/components/ConfirmButton';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const Withdraw = () => {
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');
  const [withdrawData, setWithdrawData] = useState({ address: '', amount: 0 });
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = Cookies.get('access_token');
    if (storedToken) {
      console.log('Stored token:', storedToken);
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      console.log('Fetching user data with token:', token);
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="withdraw-page bg-gray-900 min-h-screen text-white p-4"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <BalanceInfo 
          balance={balance} 
          onBalanceUpdate={setBalance}
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <WithdrawForm onWithdraw={setWithdrawData} />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <ConfirmButton onClick={handleWithdraw} />
      </motion.div>
    </motion.div>
  );
};

export default Withdraw;