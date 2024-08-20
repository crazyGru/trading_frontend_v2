import Header from '@/components/Header';
import QuickActions from '@/components/QuickActions';
import TradingSection from '@/components/TradingSection';
import InviteBanner from '@/components/InviteBanner';
import { CryptoList } from '@/components/CryptoList';
import BottomNavigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <QuickActions />
      <TradingSection />
      <InviteBanner />
      <div className="py-6">
        <CryptoList />
      </div>
      <BottomNavigation />
    </div>
  );
}