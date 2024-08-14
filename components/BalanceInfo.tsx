import React from 'react';

interface BalanceInfoProps {
  balance?: number;
  pending?: number;
  paymentMethod?: string;
  onBalanceUpdate: (newBalance: number) => void;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balance, pending, paymentMethod, onBalanceUpdate }) => {
  return (
    <div className="balance-info bg-gray-800 p-4 rounded-lg mb-4 w-full text-center">
      <div className="text-3xl font-semibold text-yellow-400">
        {balance?.toFixed(8)} {paymentMethod}
      </div>
      <div className="text-sm text-gray-400">Pending: {pending?.toFixed(8)} {paymentMethod}</div>
    </div>
  );
};

export default BalanceInfo;
