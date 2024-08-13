import Image from 'next/image';
import { Button } from '@/components/ui/button';

type RechargeQRProps = {
  qrData: {
    payment_link: string;
    qr_code: string;
  };
};

export default function RechargeQR({ qrData }: RechargeQRProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(qrData.payment_link);
    // You might want to show a toast notification here
  };

  const handleComplete = () => {
    // Implement the logic for completing the recharge
    console.log('Recharge completed');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recharge Address</h2>
      <div className="flex justify-center">
        <Image src={qrData.qr_code} alt="QR Code" width={200} height={200} />
      </div>
      <div className="bg-yellow-400 text-black p-2 rounded flex justify-between items-center">
        <span className="truncate">{qrData.payment_link}</span>
        <Button onClick={handleCopy} variant="secondary" size="sm">
          Copy
        </Button>
      </div>
      <Button onClick={handleComplete} className="w-full">
        Recharge Complete
      </Button>
    </div>
  );
}