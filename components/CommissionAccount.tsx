import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function CommissionAccount({ username }:{username:string}) {
  const [chargeHistory, setChargeHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChargeHistory();
  }, [username]);

  const fetchChargeHistory = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/charge_history`);
      const data = await response.json();
      setChargeHistory(data.charge_history);
    } catch (error) {
      console.error("Error fetching charge history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />;
  }

  return (
    <div className="space-y-4">
      {chargeHistory.map((charge:any, index:number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-700 p-4 rounded-lg"
        >
          <p className="text-sm text-gray-400 mb-1">{new Date(charge.timestamp).toLocaleString()}</p>
          <p className="text-lg font-semibold text-green-400">{charge.amount} USDT</p>
        </motion.div>
      ))}
    </div>
  );
}