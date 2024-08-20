"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import QuantitativeAccount from "./QuantitativeAccount";
import CommissionAccount from "./CommissionAccount";

export default function Financial() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <p className="text-gray-400">Please log in to view your financial information.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
      >
        <Card className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-gray-100">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="quantitative">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="quantitative">Quantitative Account</TabsTrigger>
                <TabsTrigger value="commission">Commission Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quantitative">
                <QuantitativeAccount username={user.username} />
              </TabsContent>
              
              <TabsContent value="commission">
                <CommissionAccount username={user.username} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}