import Financial from '@/components/Financial';

export const metadata = {
  title: 'Financial Overview',
  description: 'View your quantitative and commission account details',
};

export default function FinancialPage() {
  return (
    <main>
      <Financial />
    </main>
  );
}