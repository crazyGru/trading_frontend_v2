import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type RechargeFormProps = {
  walletAddress: string;
  onCheck: () => Promise<void>;
};

export default function RechargeForm({ walletAddress, onCheck }: RechargeFormProps) {
  const [qrData, setQrData] = useState<{ payment_link: string; qr_code: string } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const generatePaymentLink = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate_payment_link`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setQrData(data);
      } else {
        console.error('Failed to generate payment link');
      }
    } catch (error) {
      console.error('Error generating payment link:', error);
    }
  };

  const handleCheck = async () => {
    setIsChecking(true);
    await onCheck();
    setIsChecking(false);
  };

  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recharge Address</h2>
        <span className="text-teal-400">TRC20-USDT</span>
      </div>
      {qrData ? (
        <>
          <div className="flex justify-center">
            <Image src={`data:image/png;base64,${qrData.qr_code}`} alt="QR Code" width={200} height={200} />
          </div>
          <div className="bg-yellow-400 text-black p-2 rounded-md flex justify-between items-center">
            <span className="truncate">{qrData.payment_link}</span>
            <button onClick={() => navigator.clipboard.writeText(qrData.payment_link)} className="text-xs">Copy</button>
          </div>
        </>
      ) : (
        <Button onClick={generatePaymentLink} className="w-full">Generate QR Code</Button>
      )}
     
      <Button 
        onClick={handleCheck} 
        className="w-full bg-yellow-400 text-black" 
        disabled={isChecking}
      >
        {isChecking ? 'Checking...' : 'Check Recharge'}
      </Button>
    </div>
  );
}
