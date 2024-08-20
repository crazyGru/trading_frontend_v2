'use client';
import Link from "next/link";
import { Home, TrendingUp, CreditCard, UserPlus, DollarSign,PersonStanding } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";

const Icons = {
  home: Home,
  trade: TrendingUp,
  recharge: CreditCard, 
  invite: UserPlus,
  withdraw: DollarSign,  
  person: PersonStanding,  
};

const NAV_ITEMS = [
  { href: "/", icon: Icons.home, label: "Home" },
  { href: "/quantify", icon: Icons.trade, label: "Quantify" },
  { href: "/recharge", icon: Icons.recharge, label: "Recharge" },
  { href: "/invite", icon: Icons.invite, label: "Invite" },
  { href: "/withdraw", icon: Icons.withdraw, label: "Withdraw" },
  { href: "/me", icon: Icons.person, label: "Me" },
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
