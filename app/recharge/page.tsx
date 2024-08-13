"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RechargeOptions from '@/components/RechargeOptions';
import RechargeQR from '@/components/RechargeQR';
import RechargeForm from '@/components/RechargeForm';
import { MoveLeft } from 'lucide-react';
export default function RechargePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [qrData, setQrData] = useState<{ payment_link: string; qr_code: string } | null>(null);
  const router = useRouter();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    if (qrData) {
      setQrData(null);
    } else if (selectedOption) {
      setSelectedOption(null);
    } else {
      router.back();
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <div className="flex items-center mb-4">
        <button onClick={handleBack} className="mr-4">
        <MoveLeft/>
        </button>
        <h1 className="text-xl font-bold">Recharge</h1>
      </div>
      
      {!selectedOption && <RechargeOptions onSelect={handleOptionSelect} />}
      {selectedOption && !qrData && <RechargeForm option={selectedOption} />}
      {qrData && <RechargeQR qrData={qrData} />}
    </div>
  );
}