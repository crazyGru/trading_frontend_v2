'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Crypto {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
  icon: string;
}

const exchanges = ['binance', 'okx', 'huobi', 'coinbase'];

const cryptoIcons: { [key: string]: string } = {
  BTC: '/btc.png',
  ETH: '/eth.png',
  ADA: '/ADA.png',
  DOT: '/DOT.png',
  SOL: '/SOL.png',
  XRP: '/XRP.png',
  DOGE: '/DOGE.png',
  AVAX: '/AVAX.png',
  BNB: '/bnb.png',
  LTC: '/LTC.png',
  SHIB: '/SHIB.png',
  TRX: '/TRX.png',
};

const TradeInfoCard = ({ symbol }: { symbol: string }) => (
  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
    <div className="flex items-center space-x-4">
      <div className="flex flex-col">
        <span className="text-gray-400 text-sm">{symbol}/USDT</span>
        <span className="text-white font-semibold">--</span>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-lg text-green-500">--%</span>
    </div>
  </div>
);

const CryptoCard = ({ name, symbol, price, change, icon }: Crypto) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Image src={icon} alt={name} width={24} height={24} />
        <div className="flex flex-col">
          <span className="text-white font-semibold">{name}</span>
          <span className="text-gray-400 text-sm">{symbol}/USDT</span>
        </div>
      </div>
        <span className={`text-lg ${price === '--' ? 'text-gray-400' : change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>{price}</span>
        <span className={`text-sm ${change === '--%' ? 'text-gray-400' : change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>{change}</span>
    </div>
  );
};

const fetchCryptoData = async (exchange: string) => {
  const response = await fetch(`/api/crypto?exchange=${exchange}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function CryptoList() {
  const [selectedExchange, setSelectedExchange] = useState('binance');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cryptoData', selectedExchange],
    queryFn: () => fetchCryptoData(selectedExchange),
    refetchInterval: 10000, // Refetch every minute
  });
// console.log(data,'data')
  const cryptoData = data ? data.data.slice(0, 12).map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    price: `${coin.quote.USD.price.toFixed(2)}`,
    change: `${coin.quote.USD.percent_change_24h.toFixed(2)}%`,
    icon: cryptoIcons[coin.symbol] || '/default-crypto.png',
  })) : [];

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <div className="flex justify-between mb-4">
        {cryptoData.slice(0, 3).map((crypto:any) => (
          <TradeInfoCard key={crypto.id} symbol={crypto.symbol} />
        ))}
      </div>
      <div className="flex space-x-4 mb-4">
        {exchanges.map((exchange) => (
          <button
            key={exchange}
            onClick={() => setSelectedExchange(exchange)}
            className={`px-4 py-2 rounded text-white ${
              selectedExchange === exchange ? 'bg-blue-600' : 'bg-blue-500'
            }`}
          >
            {exchange.charAt(0).toUpperCase() + exchange.slice(1)}
          </button>
        ))}
      </div>
      <div className="text-white text-sm font-semibold flex justify-between gap-4 mb-2">
        <div>Currency</div>
        <div className='pl-28'>Latest Price($)</div>
        <div>24h Rise & Down</div>
      </div>
      <div className="space-y-4">
        {isLoading || isError ? (
          Object.keys(cryptoIcons).map((symbol, index) => (
            <CryptoCard
              key={index}
              id={index}
              name={symbol}
              symbol={symbol}
              price="--"
              change="--%"
              icon={cryptoIcons[symbol]}
            />
          ))
        ) : (
          cryptoData.map((crypto: Crypto) => 
          {
            console.log(crypto)
           return <CryptoCard key={crypto.id} {...crypto} />
          }
          )
        )}
      </div>
    </div>
  );
}
