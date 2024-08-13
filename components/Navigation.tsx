import Link from "next/link";
import { Home, TrendingUp, Wallet, UserPlus, User } from "lucide-react";

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        <Link href="/" className="flex flex-col items-center">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/trade" className="flex flex-col items-center">
          <TrendingUp size={20} />
          <span className="text-xs">Trade</span>
        </Link>
        <Link href="/recharge" className="flex flex-col items-center">
          <Wallet size={20} />
          <span className="text-xs">Recharge</span>
        </Link>
        <Link href="/invite" className="flex flex-col items-center">
          <UserPlus size={20} />
          <span className="text-xs">Invite</span>
        </Link>
        <Link href="/withdraw" className="flex flex-col items-center">
          <User size={20} />
          <span className="text-xs">Withdraw</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;