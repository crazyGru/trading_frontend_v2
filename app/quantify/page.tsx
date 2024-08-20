"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Progress from '@radix-ui/react-progress';
import { toast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie'; 
import { Loader2 } from 'lucide-react';

interface BotVersion {
  version: string;
  tradesPerDay: string;
  rateOfReturn: string;
  strategy: string;
}

interface UserData {
  currentVersion: string;
  periodOfUse: number;
  countdownDays: number;
  todaysEarnings: number;
  totalRevenue: number;
  quantifyResetTime: string;
  botVersions?: BotVersion[];
}

const QuantifyPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [rewardMessage, setRewardMessage] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setToken] = useState<string | null>(null);

  // Retrieve user data from localStorage and token from Cookies
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = Cookies.get('access_token'); // Retrieve token from cookies

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('No access token found');
      toast({
        title: "Authentication Error",
        description: "No access token found. Please log in again.",
        variant: "destructive",
      });
    }
  }, []);

  // Fetch data if user and token are available
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !accessToken) {
          throw new Error('User not authenticated');
        }
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };

        const [rewardResponse, userResponse, earningResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_reward/${user?.username}`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user?.username}`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user?.username}/earning_info`, { headers }),
        ]);

        if (!rewardResponse.ok || !userResponse.ok || !earningResponse.ok) {
          throw new Error('One or more API requests failed');
        }

        const [rewardData, userData, earningData] = await Promise.all([
          rewardResponse.json(),
          userResponse.json(),
          earningResponse.json(),
        ]);

        setRewardMessage(rewardData.message);
        setUserData({
          currentVersion: userData.currentVersion ,
          periodOfUse: earningData.deposit_time ? Math.floor((new Date().getTime() - new Date(earningData.deposit_time).getTime()) / (1000 * 3600 * 24)) : 0,
          countdownDays: 365 - (earningData.deposit_time ? Math.floor((new Date().getTime() - new Date(earningData.deposit_time).getTime()) / (1000 * 3600 * 24)) : 0),
          todaysEarnings: earningData.earn || 0,
          totalRevenue: earningData.amount || 0,
          quantifyResetTime: '18:48:15',
          botVersions: [],
        });
      } catch (error:any) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    if (user && accessToken) {
      fetchData();
    }
  }, [user, accessToken]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!userData) {
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6">Quantitative Trading</h1>
      
      {rewardMessage && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-cyan-500 text-white p-4 rounded-lg mb-6"
        >
          {rewardMessage}
        </motion.div>
      )}
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-cyan-900 rounded-lg p-6 mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Current version</p>
            <p className="font-bold">{userData.currentVersion}</p>
          </div>
          <div>
            <p>Period of use</p>
            <p className="font-bold">{userData.periodOfUse} days</p>
          </div>
          <div>
            <p>Countdown Days</p>
            <p className="font-bold">{userData.countdownDays}</p>
          </div>
          <div>
            <p>Today's Earnings</p>
            <p className="font-bold">${userData.todaysEarnings.toFixed(2)}</p>
          </div>
          <div>
            <p>Total Revenue</p>
            <p className="font-bold">${userData.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-cyan-900 rounded-lg p-6 mb-6 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="mb-2">Quantify Reset Time</p>
          <p className="text-2xl font-bold">{userData.quantifyResetTime}</p>
        </div>
      </motion.div>

      <div className="space-y-4">
        {['Introduction', 'Strategies', 'Results', 'DCE'].map((section, index) => (
          <motion.div
            key={section}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="bg-cyan-900 rounded-lg p-4"
          >
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(section)}
            >
              <h3 className="font-bold">{section}</h3>
              <span>{expandedSection === section ? '▲' : '▼'}</span>
            </div>
            <AnimatePresence>
              {expandedSection === section && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  {/* Content for each section */}
                  {section === 'Introduction' && (
                    <p>Introduction to Quantitative Trading...</p>
                  )}
                  {section === 'Strategies' && (
                    <p>Our trading strategies include...</p>
                  )}
                  {section === 'Results' && (
                    <p>Our recent trading results...</p>
                  )}
                  {section === 'DCE' && (
                    <p>Information about DCE...</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 mt-6">

        {userData.botVersions?.map((bot, index) => (
          <motion.div
            key={bot.version}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="bg-cyan-900 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{bot.version}</h3>
              
              {index === userData.botVersions.length - 1 && (
                <span className="bg-green-500 text-black px-2 py-1 rounded text-sm">Current version</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p>Quantitative Trades Per Day</p>
                <p className="font-bold">{bot.tradesPerDay}</p>
              </div>
              <div>
                <p>Quantitative rate of return</p>
                <p className="font-bold">{bot.rateOfReturn}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm">Quantitative trading strategies</p>
              <p className="font-bold text-sm">{bot.strategy}</p>
            </div>
            <Progress.Root className="w-full h-2 bg-cyan-700 rounded-full mt-2 overflow-hidden">
              <Progress.Indicator
                className="h-full bg-cyan-400"
                style={{ width: '75%' }}
              />
            </Progress.Root>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default QuantifyPage