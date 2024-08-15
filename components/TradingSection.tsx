import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function TradingSection() {
  return (
    <div className="space-y-6">
      {/* Top Cryptocurrency Cards Section */}
      <div className="flex space-x-4">
        {/* First Card */}
        <Card className="w-full bg-gray-900 text-white flex items-center justify-between p-4 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold">BTC/USDT</h3>
            <p className="text-xl mt-2">--</p>
            <p className="text-sm">--%</p>
          </div>
          <Image
            src="/btc.png" // Replace with your image path
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Card>

        {/* Second Card */}
        <Card className="w-full bg-gray-900 text-white flex items-center justify-between p-4 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold">ETH/USDT</h3>
            <p className="text-xl mt-2">--</p>
            <p className="text-sm">--%</p>
          </div>
          <Image
            src="/eth.png" // Replace with your image path
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Card>
      </div>
    </div>
  );
}
