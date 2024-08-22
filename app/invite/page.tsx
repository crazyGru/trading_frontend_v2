"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Copy, Send, UserCheck, DollarSign } from "lucide-react";
import QRCode from "react-qr-code";

export default function Invite() {
  const [inviteCode, setInviteCode] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(user.username || '');
  }, []);

  useEffect(() => {
    if (username) {
      fetchInviteCode();
    }
  }, [username]);

  const fetchInviteCode = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invite/${username}`);
      const data = await response.json();
      setInviteCode(data.code);
      setInviteLink(`${process.env.NEXT_PUBLIC_APP_URL}/signup?code=${data.code}`);
    } catch (error) {
      toast({
        title: "Error fetching invite code",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = (text:string, type:string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied`,
      className: "bg-gray-800 text-gray-200 text-sm"
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className=" bg-gray-900 flex items-center justify-center ">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="w-full min-w-lg bg-gray-800 shadow-xl border border-gray-700">
          <CardContent className="p-8">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center text-gray-100">
              Invite Friends
            </motion.h2>
            
            <motion.div variants={itemVariants} className="flex justify-between mb-6">
              {[
                { icon: Send, text: "Send Invitation", color: "text-blue-400" },
                { icon: UserCheck, text: "Friend Registers", color: "text-green-400" },
                { icon: DollarSign, text: "Earn Rebate", color: "text-yellow-400" }
              ].map(({ icon: Icon, text, color }, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Icon className={`mb-3 ${color}`} size={28} />
                  <span className="text-xs text-center text-gray-400">{text}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.a 
              variants={itemVariants}
              href="#" 
              className="text-blue-400 text-sm mb-6 block text-center hover:text-blue-300 transition-colors duration-200"
            >
              View Invitation Rewards
            </motion.a>

            {["Invite Link", "Invitation Code"].map((label, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center mb-4"
              >
                <div>
                  <p className="text-sm text-gray-400 mb-1">{label}</p>
                  <p className="text-sm text-gray-200 font-medium truncate">
                    {index === 0 ? inviteLink : inviteCode}
                  </p>
                </div>
                <Button 
                  onClick={() => handleCopy(index === 0 ? inviteLink : inviteCode, label)} 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-gray-600 transition-colors duration-200 border-gray-600"
                >
                  <Copy className="h-4 w-4 text-gray-300" />
                </Button>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="flex justify-center mt-2 bg-white p-2 rounded-lg">
              <QRCode value={inviteLink} size={150} />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}