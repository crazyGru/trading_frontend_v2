// components/MePage.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, LockIcon, RefreshCw, HelpCircle, Globe, AlertCircle, X } from "lucide-react";
import Link from "next/link";

interface User {
  username: string;
  id: string;
}

interface FinancialData {
  totalAssets: number;
  quantitativeAccount: number;
  commissionAccount: number;
  rechargeAmount: number;
  totalRevenue: number;
  commissionToday: number;
  todayEarnings: number;
  yesterdayEarnings: number;
  level1Total: number;
  level1Valid: number;
  level1Commission: number;
  level2Total: number;
  level2Valid: number;
  level2Commission: number;
  level3Total: number;
  level3Valid: number;
  level3Commission: number;
}

interface WithdrawHistory {
  timestamp: string;
  to: string;
  amount: string;
}

export default function MePage() {
  const [user, setUser] = useState<User | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWithdrawHistory, setShowWithdrawHistory] = useState<boolean>(false);
  const [withdrawHistory, setWithdrawHistory] = useState<WithdrawHistory[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchFinancialData(JSON.parse(storedUser).username);
    }
  }, []);

  const fetchFinancialData = async (username: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/financial`);
      const data = await response.json();
      setFinancialData(data);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWithdrawHistory = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.username}/withdraw_history`);
      const data = await response.json();
      setWithdrawHistory(data.withdraw_history);
    } catch (error) {
      console.error("Error fetching withdraw history:", error);
    }
  };

  const handleWithdrawClick = () => {
    fetchWithdrawHistory();
    setShowWithdrawHistory(true);
  };

  const handleSignout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!user || !financialData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Unable to load user data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
         <Card className="bg-gray-800 border-gray-700 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-100">{user.username}</h2>
                <p className="text-sm text-gray-400">UID: {user.id}</p>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Total Assets (USDT)</h3>
              <p className="text-2xl font-bold text-blue-400">{financialData.totalAssets}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-400">Quantitative Account (USDT)</p>
                  <p className="text-lg font-semibold text-gray-100">{financialData.quantitativeAccount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Commission Account (USDT)</p>
                  <p className="text-lg font-semibold text-gray-100">{financialData.commissionAccount}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-400">Recharge Amount</p>
                <p className="text-lg font-semibold text-gray-100">{financialData.rechargeAmount}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Recharge</Button>
              <Button className="bg-gray-600 hover:bg-gray-700 text-white" onClick={handleWithdrawClick}>Withdraw</Button>
            <Link href='/financial' className="p-2 bg-gray-700 rounded-lg mb-2 hover:bg-gray-600 transition-colors duration-200 text-white">Detail</Link>
            </div>

             <div>
             </div>
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-400">{financialData.totalRevenue}</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-400">Commission Today</p>
                  <p className="text-lg font-semibold text-gray-100">{financialData.commissionToday}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Today's Earnings</p>
                  <p className="text-lg font-semibold text-gray-100">{financialData.todayEarnings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Yesterday's Earnings</p>
                  <p className="text-lg font-semibold text-gray-100">{financialData.yesterdayEarnings}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Subordinate Invitation</h3>
              {[1, 2, 3].map((level) => (
                <div key={level} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm text-gray-400">Level {level}</p>
                    <p className="text-sm text-gray-300">Total/Valid</p>
                    <p className="text-sm text-gray-300">{financialData[`level${level}Total` as keyof FinancialData]}/{financialData[`level${level}Valid` as keyof FinancialData]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Get Commission</p>
                    <p className="text-sm text-gray-300">{financialData[`level${level}Commission` as keyof FinancialData]}</p>
                  </div>
                </div>
              ))}
            </div>

            {['Security Center', 'Transfer', 'What is quantitative trading?', 'News', 'Language Settings', 'Common Problem'].map((item, index) => (
              <Link href="#" key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg mb-2 hover:bg-gray-600 transition-colors duration-200">
                <div className="flex items-center">
                  {index === 0 && <LockIcon className="mr-2 text-gray-400" />}
                  {index === 1 && <RefreshCw className="mr-2 text-gray-400" />}
                  {index === 2 && <HelpCircle className="mr-2 text-gray-400" />}
                  {index === 3 && <Globe className="mr-2 text-gray-400" />}
                  {index === 4 && <Globe className="mr-2 text-gray-400" />}
                  {index === 5 && <AlertCircle className="mr-2 text-gray-400" />}
                  <span className="text-gray-100">{item}</span>
                </div>
                <ChevronDown className="text-gray-400" />
              </Link>
            ))}
            <Button variant={"ghost"} className="bg-gray-600 mt-1 mb-10 hover:bg-gray-700 text-white" onClick={handleSignout}>Sign Out</Button>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showWithdrawHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-100">Withdraw History</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowWithdrawHistory(false)}
                  className="text-gray-400 hover:text-gray-100"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {withdrawHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700 rounded-lg p-4 mb-2"
                  >
                    <p className="text-sm text-gray-400">{new Date(item.timestamp).toLocaleString()}</p>
                    <p className="text-sm text-gray-300">To: {item.to}</p>
                    <p className="text-lg font-semibold text-green-400">{item.amount} USDT</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}