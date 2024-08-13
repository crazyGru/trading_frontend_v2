import React, { useState } from 'react';

interface WithdrawFormProps {
  onWithdraw: (data: { address: string; amount: number; password: string }) => void;
  paymentMethod: string;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ onWithdraw, paymentMethod }) => {
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onWithdraw({ address, amount, password });
  };

  return (
    <form onSubmit={handleSubmit} className="withdraw-form w-full bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="text-sm text-gray-400 mb-4">
        Withdrawal limit range {paymentMethod === 'TRC20-USDT' ? '3.00' : '20.00'} - 9999999.00
      </div>
      <div>
        <label className="block text-gray-400 mb-1">Withdrawal Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-lg text-white"
          placeholder="Enter your wallet address"
          required
        />
      </div>
      <div>
        <label className="block text-gray-400 mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded-lg text-white"
          placeholder="Enter the amount"
          required
        />
      </div>
      <div>
        <label className="block text-gray-400 mb-1">Security Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-lg text-white"
          placeholder="Enter your security password"
          required
        />
      </div>
    </form>
  );
};

export default WithdrawForm;
