import React from 'react';

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="payment-method bg-gray-800 p-4 rounded-lg mb-4 w-full flex justify-around">
      <button
        className={`p-2 rounded-lg ${
          paymentMethod === 'TRC20-USDT' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'
        }`}
        onClick={() => setPaymentMethod('TRC20-USDT')}
      >
        TRC20-USDT
      </button>
      <button
        className={`p-2 rounded-lg ${
          paymentMethod === 'TRX' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'
        }`}
        onClick={() => setPaymentMethod('TRX')}
      >
        TRX
      </button>
    </div>
  );
};

export default PaymentMethod;
