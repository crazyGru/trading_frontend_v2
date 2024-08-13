// components/ActionButtons.tsx
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function ActionButtons() {
  return (
    <Card className="bg-gray-800">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button className="w-full">
            <ArrowUpRight className="mr-2" size={18} />
            Buy
          </Button>
          <Button variant="outline" className="w-full">
            <ArrowDownRight className="mr-2" size={18} />
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}