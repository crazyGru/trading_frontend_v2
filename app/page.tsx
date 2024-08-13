// app/page.tsx
import Header from '@/components/Header';
import QuickActions from '@/components/QuickActions';
import BalanceCard from '@/components/BalanceCard';
import ActionButtons from '@/components/ActionButtons';
import TradingSection from '@/components/TradingSection';
import InviteBanner from '@/components/InviteBanner';
import CryptoList from '@/components/CryptoList';
import BottomNavigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="p-4 pb-16 max-w-4xl mx-auto">
        <QuickActions />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <BalanceCard />
          <ActionButtons />
        </div>
        <TradingSection />
        <InviteBanner />
        <CryptoList />
      </main>
      <BottomNavigation />
    </div>
  );
}