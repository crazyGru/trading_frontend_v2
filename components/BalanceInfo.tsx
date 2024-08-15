import React from 'react';
import { motion } from 'framer-motion';

interface BalanceInfoProps {
  balance?: number;
  pending?: number;
  paymentMethod?: string;
  onBalanceUpdate: (newBalance: number) => void;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balance, pending, paymentMethod, onBalanceUpdate }) => {
  return (
    <motion.div 
      className="balance-info bg-gray-800 p-4 rounded-lg mb-4 w-full text-center"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="text-3xl font-semibold text-yellow-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {balance?.toFixed(8)} {paymentMethod}
      </motion.div>
      <motion.div 
        className="text-sm text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Pending: {pending?.toFixed(8)} {paymentMethod}
      </motion.div>
    </motion.div>
  );
};
export default BalanceInfo;
