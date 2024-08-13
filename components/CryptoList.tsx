import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const cryptos = [
  { name: 'Bitcoin', symbol: 'BTC', price: 50000, change: 2.5, icon: '/icons/btc.png' },
  { name: 'Ethereum', symbol: 'ETH', price: 3000, change: -1.2, icon: '/icons/eth.png' },
  { name: 'Cardano', symbol: 'ADA', price: 1.5, change: 0.8, icon: '/icons/ada.png' },
  { name: 'Polkadot', symbol: 'DOT', price: 30, change: -0.5, icon: '/icons/dot.png' },
  { name: 'Solana', symbol: 'SOL', price: 150, change: 5.2, icon: '/icons/sol.png' },
  { name: 'Ripple', symbol: 'XRP', price: 0.75, change: 1.1, icon: '/icons/xrp.png' },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.25, change: -2.3, icon: '/icons/doge.png' },
  { name: 'Chainlink', symbol: 'LINK', price: 20, change: 3.7, icon: '/icons/link.png' },
  // Add more cryptocurrencies as needed
];

export default function CryptoList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h2>
      {cryptos.map((crypto) => (
        <Card key={crypto.symbol} className="bg-gray-800 hover:bg-gray-700 transition-colors">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Image src={crypto.icon} alt={crypto.name} width={32} height={32} className="mr-3" />
              <div>
                <h3 className="font-semibold">{crypto.name}</h3>
                <p className="text-sm text-gray-400">{crypto.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">${crypto.price.toLocaleString()}</p>
              <p className={`text-sm ${crypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change > 0 ? '↑' : '↓'} {Math.abs(crypto.change)}%
              </p>
            </div>
            <Switch />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}