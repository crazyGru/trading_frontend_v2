"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Trade() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BTC");

  const handleTrade = (type: "buy" | "sell") => {
    console.log(`${type} ${amount} ${currency}`);
    // Implement trade logic here
  };

  return (
    <div className="p-4 pb-16">
      <Card>
        <CardHeader>
          <CardTitle>Trade Crypto</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buy">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
            <TabsContent value="buy">
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  className="w-full p-2 border rounded"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
                <Button onClick={() => handleTrade("buy")} className="w-full">
                  Buy
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="sell">
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  className="w-full p-2 border rounded"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
                <Button onClick={() => handleTrade("sell")} className="w-full">
                  Sell
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}