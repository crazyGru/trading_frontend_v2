// components/BalanceCard.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function BalanceCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-600 to-blue-600">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
        <p className="text-3xl font-bold">$12,345.67</p>
        <p className="text-sm opacity-80 mt-2">+5.23% today</p>
      </CardContent>
    </Card>
  );
}