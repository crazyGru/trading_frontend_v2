
import Header from '@/components/Header';
import QuickActions from '@/components/QuickActions';
import ImageCarosel from '@/components/TradingSection';
import InviteBanner from '@/components/InviteBanner';
import { CryptoList } from '@/components/CryptoList';
import BottomNavigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <ImageCarosel />
      <QuickActions />
      {/* <InviteBanner /> */}
        <CryptoList />
      <BottomNavigation />
    </div>
  );
}