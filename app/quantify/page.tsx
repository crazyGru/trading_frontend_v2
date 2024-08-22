"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie'; 
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRotating, setIsRotating] = useState(false);
  // Retrieve user data from localStorage and token from Cookies
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = Cookies.get('access_token');

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

  // Fetch initial data if user and token are available
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (!user || !accessToken) {
          throw new Error('User not authenticated');
        }
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };

        const [userResponse, earningResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user?.username}`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user?.username}/earning_info`, { headers }),
        ]);

        if (!userResponse.ok || !earningResponse.ok) {
          throw new Error('One or more API requests failed');
        }

        const [userData, earningData] = await Promise.all([
          userResponse.json(),
          earningResponse.json(),
        ]);

        setUserData({
          currentVersion: userData.currentVersion,
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
      fetchInitialData();
    }
  }, [user, accessToken]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', { hour12: false });
  };

  const handleBitcoinClick = async () => {
    if (user && accessToken && !isRotating) {
      setIsRotating(true);
      try {
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        };
        const rewardResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_reward/${user?.username}`, { headers });
        
        if (!rewardResponse.ok) {
          throw new Error('Failed to fetch reward');
        }
  
        const rewardData = await rewardResponse.json();
        setRewardMessage(rewardData.message);
  
        toast({
          title: "Reward Fetched",
          description: rewardData.message,
          variant: "default",
        });
      } catch (error: any) {
        console.error('Error fetching reward:', error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsRotating(false);
      }
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!userData) {
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-gray-900 to-gray-900 text-white min-h-screen"
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
        className="bg-gray-800 rounded-lg p-6 mb-6"
      >
        <div className="grid grid-cols-3 gap-4">
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
            <p>Trial Fee</p>
            <p className="font-bold">0.00</p>
          </div>
          <div>
            <p>Quantitative Account</p>
            <p className="font-bold">500.00</p>
          </div>
          <div>
            <p>Today's Earnings</p>
            <p className="font-bold">${userData.todaysEarnings.toFixed(2)}</p>
          </div>
          <div className="col-span-3">
            <p>Total Revenue</p>
            <p className="font-bold">${userData.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      <p className="text-center mb-4">Click below to start quantification</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center justify-center mb-6"
      >
          <motion.button
              onClick={handleBitcoinClick}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mb-4 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ duration: 1, repeat: isRotating ? Infinity : 0, ease: "linear" }}
            >
          <Image src="/bitcoin.png" alt="Bitcoin"  width={200} height={200} />
          </motion.button>
        <div className="text-center">
          <p className="mb-2">Quantify Reset Time</p>
          <p className="text-2xl font-bold">{formatTime(currentTime)}</p>
        </div>
      </motion.div>

      <div className="space-y-4">
        {['Introduction', 'Strategies', 'Results', 'DCE'].map((section, index) => (
          <motion.div
            key={section}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="bg-gray-800 rounded-lg p-4"
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

    </motion.div>
  )
}

export default QuantifyPage