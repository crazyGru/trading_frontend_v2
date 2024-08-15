import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WithdrawFormProps {
  onWithdraw: (data: { address: string; amount: number }) => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ onWithdraw }) => {
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    onWithdraw({ address, amount });
  }, [address, amount, onWithdraw]);

  return (
    <motion.form 
    className="withdraw-form w-full bg-gray-800 p-4 rounded-lg space-y-4"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
      <div className="text-sm text-gray-400 mb-4">
        Withdrawal limit range 3.00 - 9999999.00 USDT
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-lg text-white"
          placeholder="Enter your wallet address"
          required
        />
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded-lg text-white"
          placeholder="Enter the amount"
          required
        />
      </motion.div>
    </motion.form>
  );
};

export default WithdrawForm;