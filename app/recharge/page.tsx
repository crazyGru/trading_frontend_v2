'use client';

import { useState, useEffect } from 'react';
import BalanceInfo from '@/components/BalanceInfo';
import RechargeForm from '@/components/RechargeForm';
import { toast } from '@/components/ui/use-toast';

export default function RechargePage() {
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
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
      setWalletAddress(userData.wallet_address || '');
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

  const handleCheck = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_charge_history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to check recharge');
      await fetchBalance();
      toast({
        title: 'Recharge check completed',
        description: 'Your balance has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error checking recharge',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <h1 className="text-xl font-bold mb-4">Recharge</h1>
      <BalanceInfo 
        balance={balance} 
        onBalanceUpdate={setBalance}
      />
      <RechargeForm walletAddress={walletAddress} onCheck={handleCheck} />
    </div>
  );
}