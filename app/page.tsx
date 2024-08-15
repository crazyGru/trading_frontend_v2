// app/page.tsx
import Header from '@/components/Header';
import QuickActions from '@/components/QuickActions';
import TradingSection from '@/components/TradingSection';
import InviteBanner from '@/components/InviteBanner';
import {CryptoList} from '@/components/CryptoList';
import BottomNavigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="p-4 pb-16 max-w-6xl mx-auto">
        <QuickActions />
        <TradingSection />
        <InviteBanner />
        <CryptoList />
      </main>
      <BottomNavigation />
    </div>
  );
}