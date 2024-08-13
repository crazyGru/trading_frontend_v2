import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

type RechargeFormProps = {
  option: string;
};

export default function RechargeForm({ option }: RechargeFormProps) {
  const [rechargeData, setRechargeData] = useState<{
    payment_link: string;
    qr_code: string;
  } | null>(null);

  useEffect(() => {
    generatePaymentLink();
  }, []);

  const generatePaymentLink = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate_payment_link`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setRechargeData(data);
      } else {
        console.error('Failed to generate payment link');
      }
    } catch (error) {
      console.error('Error generating payment link:', error);
    }
  };

  const handleCopy = () => {
    if (rechargeData) {
      navigator.clipboard.writeText(rechargeData.payment_link);
    }
  };

  if (!rechargeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">AAQ Quantify</h2>
        <span className="text-teal-400">TRC20-USDT</span>
      </div>
      <div className="flex justify-center">
      <img 
  src={`data:image/png;base64,${rechargeData.qr_code}`} 
  alt="QR Code" 
  className="w-40 h-40" 
/>

      </div>
      <p className="text-center text-sm">Recharge Address</p>
      <div className="bg-yellow-400 text-black p-2 rounded-md flex justify-between items-center">
        <span className="truncate">{rechargeData.payment_link}</span>
        <button onClick={handleCopy} className="text-xs">Copy</button>
      </div>
      <Button className="w-full bg-yellow-400 text-black">Recharge Complete</Button>
    </div>
  );
}