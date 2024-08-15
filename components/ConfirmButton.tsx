'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ConfirmButtonProps {
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick }) => {
  return (
    <div className="confirm-button mt-4 w-full">
      <motion.button
        className="w-full p-3 bg-yellow-400 rounded-lg text-black font-bold"
        onClick={onClick}
        whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        Confirm
      </motion.button>
    </div>
  );
};

export default ConfirmButton;
