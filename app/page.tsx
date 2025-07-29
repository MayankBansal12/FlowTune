"use client";

import { motion, AnimatePresence } from "motion/react";
import { Dashboard } from "@/components/dashboard";
import { RightBar } from "@/components/rightbar";
import { TopSidebar, BottomSidebar } from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="mx-auto py-8 px-4 h-screen w-screen text-[#eee8df] gap-2 bg-cover bg-center">
      <AnimatePresence>
        <motion.div
          className="h-full grid [grid-template-columns:1fr_3.5fr_1.5fr] grid-rows-8 gap-4 mx-auto"
          initial={{ opacity: 1, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Left SideBar - Top and Bottom */}
          <motion.div
            className="row-span-8 grid grid-rows-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.05,
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="row-span-2 backdrop-blur-md bg-white/20 rounded-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TopSidebar />
            </motion.div>
            <motion.div
              className="row-span-6 backdrop-blur-md mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BottomSidebar />
            </motion.div>
          </motion.div>

          {/* Main Dashboard (mid of page) */}
          <motion.div
            className="row-span-8 backdrop-blur-md bg-white/20 rounded-2xl h-full"
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Dashboard />
          </motion.div>

          {/* Right SideBar */}
          <motion.div
            className="row-span-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RightBar />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
