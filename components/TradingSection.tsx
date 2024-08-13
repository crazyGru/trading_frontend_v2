// components/TradingSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TradingSection() {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 my-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-2">Quantitative Trading</h2>
        <p className="mb-4">Experience AI-powered trading strategies</p>
        <Button variant="secondary">Learn More</Button>
      </CardContent>
    </Card>
  );
}