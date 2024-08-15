import { Wallet, TrendingUp, ArrowLeftRight, Gift } from "lucide-react";
import ShinyButton from "@/components/magicui/shiny-button";

const actions = [
  { name: "Recharge", icon: <Wallet size={24} /> },
  { name: "Withdraw", icon: <ArrowLeftRight size={24} /> },
  { name: "Help", icon: <Gift size={24} /> },
  { name: "Invite Friends", icon: <TrendingUp size={24} /> },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4 my-6">
      {actions.map((action) => (
        <div key={action.name} className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center p-4 bg-gray-800 text-white rounded-lg shadow-md">
            {action.icon}
          </div>
          <ShinyButton text={action.name} className="mt-2 text-sm text-slate-200 font-semibold" />
        </div>
      ))}
    </div>
  );
}
