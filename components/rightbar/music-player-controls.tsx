"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import usePlayerStore from "@/app/stores/usePlayerStore";
import { useRef, useState, useEffect } from "react";

const MusicPlayerControls = () => {
  const {
    playerQueue,
    isPlaying,
    isShuffle,
    isRepeat,
    isMuted,
    setIsMuted,
    volumeLevel,
    setVolumeLevel,
    togglePlayPause,
    toggleMute,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeContainerRef = useRef(null);

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolumeLevel(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleVolumeClick = () => {
    toggleMute();
  };

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!showVolumeSlider) return;
      if (
        volumeContainerRef.current &&
        !volumeContainerRef.current.contains(e.target)
      ) {
        setShowVolumeSlider(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [showVolumeSlider]);

  return (
    <div className="flex items-center justify-center gap-4 px-4">
      <Button
        size="sm"
        variant="ghost"
        className="cursor-pointer p-1"
        onClick={toggleShuffle}
        style={{
          color: isShuffle ? "#4caf50" : "white",
          opacity: isShuffle ? 1 : 0.7,
        }}
      >
        <Shuffle size={16} />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="cursor-pointer p-1"
        onClick={playPrevious}
        disabled={playerQueue.length <= 1}
      >
        <SkipBack size={16} />
      </Button>

      <Button
        size="lg"
        onClick={togglePlayPause}
        className="inset-0 bg-accent-foreground rounded-full cursor-pointer p-2"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="cursor-pointer p-1"
        onClick={playNext}
        disabled={playerQueue.length <= 1}
      >
        <SkipForward size={16} />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="cursor-pointer p-1"
        onClick={toggleRepeat}
        style={{
          color: isRepeat ? "#4caf50" : "white",
          opacity: isRepeat ? 1 : 0.7,
        }}
      >
        {isRepeat ? <Repeat1 size={16} /> : <Repeat size={16} />}
      </Button>

      <div
        ref={volumeContainerRef}
        className="relative"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <Button
          size="sm"
          variant="ghost"
          className="cursor-pointer p-1"
          onClick={handleVolumeClick}
        >
          {isMuted || volumeLevel === 0 ? (
            <VolumeOff size={16} />
          ) : (
            <Volume2 size={16} />
          )}
          <span className="!text-[0.4rem] text-white/60">
            {(isMuted ? 0 : volumeLevel) + "%"}
          </span>
        </Button>

        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-2xl flex flex-col items-center">
                <Slider
                  value={[isMuted ? 0 : volumeLevel]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  orientation="vertical"
                  className="h-20"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { MusicPlayerControls };
