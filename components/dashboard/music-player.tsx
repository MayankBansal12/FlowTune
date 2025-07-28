"use client";

import { mockMusicData } from "@/__mocks__/mockSongsData";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  // PauseCircle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  // MoveUpRight,
  Volume2,
  VolumeOff,
  // MonitorSpeaker,
  // Airplay,
  ChevronDown,
  Shuffle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs?.toString()?.padStart(2, "0")}`;
};

const timeStringToSeconds = (str) => {
  const [min, sec] = str.split(":").map(Number);
  return min * 60 + sec;
};

const MusicPlayer = () => {
  const [playerExpand, setPlayerExpand] = useState(true);
  const [currentSongPlaying] = useState(mockMusicData[1]);
  const [volumeOff, setVolumeOff] = useState(true);
  const [isMusicPaused, setIsMusicPaused] = useState(true);
  const [songProgress, setSongProgress] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
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

  const togglePlayPause = () => {
    setIsMusicPaused((prev) => !prev);
  };

  const toggleVolumeLevel = () => {
    if (!volumeOff) {
      setVolumeLevel(0);
    } else {
      setVolumeLevel(100);
    }
    setVolumeOff((prev) => !prev);
  };

  return (
    <motion.div
      layout
      onDoubleClick={() => setPlayerExpand(false)}
      initial={{
        y: 10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 1,
        duration: 0.3,
        layout: { duration: 0.3 },
      }}
      style={{
        position: "absolute",
        width: playerExpand ? "45%" : "15%",
        height: playerExpand ? 100 : 30,
        backgroundColor: playerExpand ? "#9e9e9e" : "#4caf50",
        borderRadius: playerExpand ? "var(--radius-xl)" : 100,
        bottom: playerExpand ? "0.5rem" : "2rem",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {playerExpand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ padding: 10, color: "white" }}
          className="group relative w-full flex justify-center items-center gap-2"
        >
          <div className="absolute top-0 left-0 ">
            <ChevronDown
              className="text-transparent p-1 w-8 h-8 group-hover:text-accent-foreground hover:text-accent-foreground/80 cursor-pointer transition-all"
              onClick={() => setPlayerExpand(false)}
            />
          </div>
          <div className="flex gap-2 items-center w-1/3">
            <img
              loading="lazy"
              src={currentSongPlaying.cover}
              className="w-20 h-20 rounded-2xl shadow-lg"
              alt={currentSongPlaying.title}
            />
            <div className="flex flex-col justify-start items-center">
              <span>{currentSongPlaying.title}</span>
              <span className="text-sm text-accent-foreground/50">
                {currentSongPlaying.artist}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 w-1/3 h-full">
            <div className="flex items-center gap-4">
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Shuffle />
              </Button>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <SkipBack />
              </Button>
              <Button
                size="sm"
                onClick={togglePlayPause}
                className="inset-0 rounded-full cursor-pointer"
              >
                {isMusicPaused ? <Play /> : <Pause />}
              </Button>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <SkipForward />
              </Button>
            </div>
            <div className="flex flex-col gap-1 w-full">
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
          <div className="flex gap-2 w-1/4 px-2">
            {volumeOff ? (
              <VolumeOff onClick={toggleVolumeLevel} className="w-5 h-5" />
            ) : (
              <Volume2 onClick={toggleVolumeLevel} className="w-5 h-5" />
            )}
            <Slider
              value={[volumeLevel]}
              onValueChange={(value) => {
                setVolumeLevel(value[0]);
                if (value[0] === 0) setVolumeOff(true);
                else setVolumeOff(false);
              }}
              className=""
              step={1}
              onDoubleClick={(e) => e.stopPropagation()}
            />
          </div>
        </motion.div>
      )}

      {!playerExpand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full h-full"
          onClick={() => setPlayerExpand(true)}
        >
          Galway Girl
        </motion.div>
      )}
    </motion.div>
  );
};

export { MusicPlayer };
