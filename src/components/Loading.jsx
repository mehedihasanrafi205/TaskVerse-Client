import React from "react";
import { motion } from "framer-motion";
import logo from "/logo.png";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-[#F7CE3E]">
      <motion.div
        className="relative w-28 h-28 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-[#F7CE3E]/30" />

        <motion.div className="absolute inset-0 rounded-full border-t-4 border-[#F7CE3E]" />

        <motion.img
          src={logo}
          alt="TaskVerse Logo"
          className="w-14 h-14 object-contain"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.h1
        className="mt-6 text-3xl font-bold logo-font "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Task<span className="text-primary-content">Verse</span>
      </motion.h1>

      <motion.p
        className="mt-3 text-sm text-[#F7CE3E]/70"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;
