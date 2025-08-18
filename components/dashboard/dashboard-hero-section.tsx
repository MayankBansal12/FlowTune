"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

export function HeroSection() {
  return (
    <div className="grid grid-cols-3 row-span-5 w-full gap-4">
      <div className="col-span-1 bg-white/20 rounded-2xl p-4">something</div>
      <div className="col-span-1 bg-white/20 rounded-2xl p-4">
        something something
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
          boxShadow: "0 0 0 0 rgba(0,0,0,0)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.15)",
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center justify-start gap-4 py-8 bg-red-500/30 backdrop-blur-md rounded-2xl px-4 shadow-lg text-center will-change-transform"
        style={{ perspective: 1000 }}
      >
        <h3 className="text-xl font-bold  tracking-wide font-mono">
          Lofi Music 24/7
        </h3>
        <p className="text-sm text-muted-foreground mb-4 font-mono">
          Experience the world of lofi beats - chill, relax, and focus with
          endless music.
        </p>
        <Button className="flex items-center gap-2 cursor-pointer backdrop-blur-md bg-red-400/10 hover:bg-red-600/10 transition-colors px-4 py-2 rounded-3xl  font-medium">
          <Play className="w-5 h-5" />
          Listen Now
        </Button>
      </motion.div>
    </div>
  );
}
