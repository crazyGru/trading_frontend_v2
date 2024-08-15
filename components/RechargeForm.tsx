'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';

type RechargeFormProps = {
  walletAddress: string;
  onCheck: () => Promise<void>;
};

type QRData = {
  payment_link: string;
  qr_code: string;
};

export default function RechargeForm({ walletAddress, onCheck }: RechargeFormProps) {
  const [qrData, setQrData] = useState<QRData | null>(null);
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

  const handleCopy = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData.payment_link);
      toast({
        title: "Copied!",
        description: "Payment link copied to clipboard",
        duration: 2000,
      });
    }
  };

  return (
    <motion.div 
      className="space-y-4 bg-gray-800 p-4 rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-between items-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold">Recharge Address</h2>
        <span className="text-teal-400">TRC20-USDT</span>
      </motion.div>
      {qrData ? (
        <>
          <motion.div 
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Image src={`data:image/png;base64,${qrData.qr_code}`} alt="QR Code" width={250} height={250} />
          </motion.div>
          <motion.div 
            className="bg-yellow-400 text-black p-2 rounded-md flex justify-between items-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="truncate">{qrData.payment_link}</span>
            <motion.button 
              onClick={handleCopy} 
              className="text-xs"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Copy
            </motion.button>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button onClick={generatePaymentLink} className="w-full">Generate QR Code</Button>
        </motion.div>
      )}
     
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button 
          onClick={handleCheck} 
          className="w-full bg-yellow-400 text-black" 
          disabled={isChecking}
        >
          {isChecking ? 'Checking...' : 'Check Recharge'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
