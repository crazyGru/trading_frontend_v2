'use client';
import Link from "next/link";
import { Home, TrendingUp, CreditCard, UserPlus, DollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";

const Icons = {
  home: Home,
  trade: TrendingUp,
  recharge: CreditCard,  // Updated icon for "Recharge"
  invite: UserPlus,
  withdraw: DollarSign,  // Updated icon for "Withdraw"
};

const NAV_ITEMS = [
  { href: "/", icon: Icons.home, label: "Home" },
  { href: "/#", icon: Icons.trade, label: "Trade" },
  { href: "/recharge", icon: Icons.recharge, label: "Recharge" },
  { href: "/#", icon: Icons.invite, label: "Invite" },
  { href: "/withdraw", icon: Icons.withdraw, label: "Withdraw" },
];

const BottomNavigation: React.FC = () => {
  return (
    <TooltipProvider>
      <Dock
        direction="middle"
        className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-gray-950 border-t border-gray-200 py-2 flex justify-around"
      >
        {NAV_ITEMS.map((item) => (
          <DockIcon key={item.label} className="flex-1 flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.href} className="flex flex-col items-center">
                  <item.icon className="text-slate-300" size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  );
};

export default BottomNavigation;
