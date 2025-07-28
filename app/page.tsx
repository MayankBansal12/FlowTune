"use client";
import { Dashboard } from "@/components/dashboard";
import { RightBar } from "@/components/rightbar";
import { TopSidebar, BottomSidebar } from "@/components/sidebar/Sidebar";

import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  return (
    <div className="mx-auto py-12 px-4 h-screen text-[#eee8df] gap-2 bg-[url('https://cdn.pixabay.com/photo/2018/03/14/08/07/coffee-3224527_1280.jpg')] bg-cover bg-center">
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-6 h-full max-h-screen grid-rows-8 gap-4 mx-auto"
          initial={{ opacity: 1, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="col-span-1 row-span-8 grid grid-rows-8 "
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
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
          <motion.div
            className="col-span-4 row-span-8 backdrop-blur-md bg-white/20 rounded-2xl h-full"
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Dashboard />
          </motion.div>
          <motion.div
            className="col-span-1 row-span-8 "
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <RightBar />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
