'use client';

import Image from 'next/image';
import { AnimatedList } from '@/components/magicui/animated-list';
import { cn } from '@/lib/utils';

interface Crypto {
  name: string;
  symbol: string;
  price: string; // Use string to accommodate "--" as the initial value
  change: string; // Use string to accommodate "--%" as the initial value
  icon: string;
}

const cryptos: Crypto[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: '--', change: '--%', icon: '/btc.png' },
  { name: 'Ethereum', symbol: 'ETH', price: '--', change: '--%', icon: '/eth.png' },
  { name: 'Cardano', symbol: 'ADA', price: '--', change: '--%', icon: '/ADA.png' },
  { name: 'Polkadot', symbol: 'DOT', price: '--', change: '--%', icon: '/DOT.png' },
  { name: 'Solana', symbol: 'SOL', price: '--', change: '--%', icon: '/SOL.png' },
  { name: 'Ripple', symbol: 'XRP', price: '--', change: '--%', icon: '/XRP.png' },
  { name: 'Dogecoin', symbol: 'DOGE', price: '--', change: '--%', icon: '/DOGE.png' },
  { name: 'Avalanche', symbol: 'AVAX', price: '--', change: '--%', icon: '/AVAX.png' },
  { name: 'Binance Coin', symbol: 'BNB', price: '--', change: '--%', icon: '/bnb.png' },
  { name: 'Litecoin', symbol: 'LTC', price: '--', change: '--%', icon: '/LTC.png' },
  { name: 'Shiba Inu', symbol: 'SHIB', price: '--', change: '--%', icon: '/SHIB.png' },
  { name: 'Tron', symbol: 'TRX', price: '--', change: '--%', icon: '/TRX.png' },
];

const CryptoCard = ({ name, symbol, price, change, icon }: Crypto) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[500px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-gray-800 hover:bg-gray-700 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex items-center justify-center rounded-2xl bg-gray-900 p-2">
          <Image src={icon} alt={name} width={32} height={32} className="rounded-full" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{symbol}/USDT</span>
          </figcaption>
          <p className="text-sm font-normal text-green-500">
            {price}
            <span className="ml-2">{change}</span>
          </p>
        </div>
      </div>
    </figure>
  );
};

export function CryptoList() {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col p-6 overflow-hidden rounded-lg bg-gray-900 md:shadow-xl",
      )}
    >
      <h2 className="text-3xl font-bold text-white mb-6">Top Cryptocurrencies</h2>
      <AnimatedList>
        {cryptos.map((crypto, idx) => (
          <CryptoCard {...crypto} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
