import Image from 'next/image';

type RechargeOptionsProps = {
  onSelect: (option: string) => void;
};

export default function RechargeOptions({ onSelect }: RechargeOptionsProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={() => onSelect('TRC20-USDT')}
        className="w-full bg-gray-800 p-4 rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center">
          <Image src="/trc20-usdt-icon.png" alt="TRC20-USDT" width={24} height={24} />
          <span className="ml-2">TRC20-USDT</span>
        </div>
        <span>&gt;</span>
      </button>
      <button
        onClick={() => onSelect('TRX')}
        className="w-full bg-gray-800 p-4 rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center">
          <Image src="/trx-icon.png" alt="TRX" width={24} height={24} />
          <span className="ml-2">TRX</span>
        </div>
        <span>&gt;</span>
      </button>
    </div>
  );
}