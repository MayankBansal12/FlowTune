import React from "react";
import { ItemList, SongItem } from "../render-songs";
import { mockMusicData } from "@/__mocks__/mockSongsData";
import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "motion/react";

export function RightBar() {
  return (
    <div className="h-full grid grid-rows-10">
      <div className=" flex flex-col row-span-7 backdrop-blur-md bg-white/20 rounded-2xl p-4">
        <h2 className="text-xl ">In Queue</h2>
        <div className="py-4 h-full overflow-y-auto">
          <ItemList
            items={mockMusicData}
            ItemComponent={SongItem}
            isRightBar={true}
          />
        </div>
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
        className="flex flex-col items-center justify-start gap-4 py-8 bg-red-500/30 backdrop-blur-md mt-4 rounded-2xl px-4 shadow-lg text-center will-change-transform row-span-3"
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
