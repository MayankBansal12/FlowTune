"use client";

import { mockMusicData } from "@/__mocks__/mockSongsData";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDownLeft } from "lucide-react";
import { ItemList, SongItem } from "@/components/render-songs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MusicPlayerControls } from "@/components/music-player-controls";
import { formatTime, timeStringToSeconds } from "@/lib/helper";

export function RightBar() {
  const [currentPlayCollapsed, setCurrentPlayCollapsed] = useState(false);
  const [currentSongPlaying] = useState(mockMusicData[1]);
  const [isMusicPaused, setIsMusicPaused] = useState(true);
  const [songProgress, setSongProgress] = useState(0);
  // const [volumeOff, setVolumeOff] = useState(true)
  // const [volumeLevel, setVolumeLevel] = useState(0);
  const songLength =
    timeStringToSeconds(currentSongPlaying.duration) ?? "00.00";

  useEffect(() => {
    if (isMusicPaused) return;

    const interval = setInterval(() => {
      setSongProgress((prev) => {
        if (prev >= songLength) {
          setIsMusicPaused(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isMusicPaused, songLength]);

  // const togglePlayPause = () => {
  //   setIsMusicPaused((prev) => !prev);
  // };

  // const toggleVolumeLevel = () => {
  //   if (!volumeOff) {
  //     setVolumeLevel(0)
  //   } else {
  //     setVolumeLevel(100)
  //   }
  //   setVolumeOff((prev) => !prev);
  // };

  const togglePlayerCollapsed = () => {
    setCurrentPlayCollapsed((prev) => !prev);
  };

  return (
    <motion.div
      layout
      transition={{
        delay: 0.1,
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="h-full flex flex-col gap-4"
    >
      <div
        className={`flex flex-col backdrop-blur-md bg-white/20 rounded-2xl p-4 ${currentPlayCollapsed ? "h-[80%]" : "h-[60%]"}`}
      >
        <h2 className="text-xl">Player Queue</h2>
        <div className="py-4 h-full overflow-y-auto">
          <ItemList
            items={mockMusicData}
            ItemComponent={SongItem}
            isRightBar={true}
          />
        </div>
      </div>

      <motion.div
        layout
        className={`backdrop-blur-md bg-white/20 rounded-2xl ${currentPlayCollapsed ? "h-[20%] !bg-green-700" : "h-[40%]"}`}
      >
        {!currentPlayCollapsed && (
          <>
            <div className="h-1/6 flex gap-2 justify-between items-center py-2 px-4">
              <h2 className="text-xl">Current Playing</h2>
              <Button
                variant="ghost"
                onClick={togglePlayerCollapsed}
                className="size-10"
              >
                <ArrowDownLeft />
              </Button>
            </div>
            <div className="h-1/2 flex gap-2 px-4 py-3">
              <motion.img
                initial={{ filter: "blur(10px)", rotate: -5 }}
                animate={{ filter: "blur(0px)", rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                loading="lazy"
                src={currentSongPlaying.cover}
                className="w-1/3 rounded-2xl shadow-lg"
                alt={currentSongPlaying.title}
              />
              <div className="w-2/3 flex flex-col gap-2">
                <motion.div
                  initial={{
                    opacity: 0,
                    filter: "blur(5px)",
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.3,
                  }}
                  className="flex flex-col py-2"
                >
                  <h2 className="uppercase text-lg">
                    {currentSongPlaying.title}
                  </h2>
                  <span className="text-sm text-accent-foreground/30">
                    {currentSongPlaying.artist}
                  </span>
                </motion.div>
                <div className="flex flex-col gap-2 w-full">
                  <Slider
                    value={[songProgress]}
                    onValueChange={(value) => setSongProgress(value[0])}
                    max={songLength}
                    step={1}
                    onDoubleClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex justify-between items-center gap-2 text-xs text-accent-foreground/50">
                    <span>{formatTime(songProgress)}</span>
                    <span>{formatTime(songLength)}</span>
                  </div>
                </div>
              </div>
            </div>
            <MusicPlayerControls
              togglePlayPause={togglePlayPause}
              isMusicPaused={isMusicPaused}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
