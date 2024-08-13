// components/QuickActions.tsx
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, ArrowLeftRight, Gift } from "lucide-react";

const actions = [
  { name: "Deposit", icon: <Wallet size={24} /> },
  { name: "Trade", icon: <TrendingUp size={24} /> },
  { name: "Transfer", icon: <ArrowLeftRight size={24} /> },
  { name: "Earn", icon: <Gift size={24} /> },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4 text-black my-6">
      {actions.map((action) => (
        <Button
          key={action.name}
          variant="outline"
          className="flex flex-col items-center py-4"
        >
          {action.icon}
          <span className="mt-2 text-sm">{action.name}</span>
        </Button>
      ))}
    </div>
  );
}