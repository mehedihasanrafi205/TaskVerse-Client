import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import ClickSpark from "../components/ClickSpark";
import { AnimatePresence } from "framer-motion";

const MainLayout = () => {
  return (
    <div className="flex relative flex-col min-h-screen bg-base-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,206,62,0.08),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(4,42,43,0.08),transparent_60%)] pointer-events-none"></div>

      <Navbar />

      <ClickSpark
        sparkColor="#f7ce3e"
        sparkSize={9}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <main className="flex-1 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className=""
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </ClickSpark>

      <Footer />
    </div>
  );
};

export default MainLayout;
