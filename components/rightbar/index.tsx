"use client";

import { mockMusicData } from "@/__mocks__/mockSongsData";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowDownLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
  Shuffle,
  Repeat,
  Repeat1,
} from "lucide-react";
import { ItemList, SongItem } from "@/components/render-songs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/helper";
import usePlayerStore from "@/app/stores/usePlayerStore";

export function RightBar() {
  const audioRef = useRef(null);
  const [currentPlayCollapsed, setCurrentPlayCollapsed] = useState(false);

  const {
    // State
    currentPlaying,
    isPlaying,
    isShuffle,
    isRepeat,
    isMuted,
    volumeLevel,
    currentTime,
    duration,
    playerQueue,
    currentSongIndex,

    // Actions
    setAudioElement,
    togglePlayPause,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    setVolumeLevel,
    toggleMute,
    seekTo,
    updateCurrentTime,
    updateDuration,
    handleSongEnd,
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
      audioRef.current.volume = volumeLevel / 100;
      audioRef.current.muted = isMuted;
    }
  }, [setAudioElement, volumeLevel, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      updateCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      updateDuration(audio.duration);
    };

    const handleEnded = () => {
      handleSongEnd();
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [updateCurrentTime, updateDuration, handleSongEnd]);

  const handleSeek = (value) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolumeLevel(newVolume);
  };

  const handleVolumeClick = () => {
    toggleMute();
  };

  const togglePlayerCollapsed = () => {
    setCurrentPlayCollapsed((prev) => !prev);
  };

  const getQueueItems = () => {
    if (currentSongIndex === -1 || playerQueue.length === 0) {
      return mockMusicData;
    }

    return playerQueue.slice(currentSongIndex);
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <track kind="captions" />
      </audio>

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
              items={getQueueItems()}
              ItemComponent={SongItem}
              isRightBar={true}
            />
          </div>
        </div>

        <motion.div
          layout
          className={`backdrop-blur-md bg-white/20 rounded-2xl ${currentPlayCollapsed ? "h-[20%] !bg-green-700" : "h-[40%]"}`}
        >
          {!currentPlayCollapsed && currentPlaying ? (
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
                  src={currentPlaying.cover}
                  className="w-1/3 rounded-2xl shadow-lg"
                  alt={currentPlaying.title}
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
                      {currentPlaying.title}
                    </h2>
                    <span className="text-sm text-accent-foreground/30">
                      {currentPlaying.artist}
                    </span>
                  </motion.div>
                  <div className="flex flex-col gap-2 w-full">
                    <Slider
                      value={[currentTime]}
                      onValueChange={handleSeek}
                      max={duration || 100}
                      step={1}
                      onDoubleClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex justify-between items-center gap-2 text-xs text-accent-foreground/50">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="h-1/3 flex items-center justify-center gap-4 px-4">
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
                  size="sm"
                  onClick={togglePlayPause}
                  className="inset-0 rounded-full cursor-pointer p-2"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
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

                <div className="flex gap-2 items-center ml-4">
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
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volumeLevel]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    onDoubleClick={(e) => e.stopPropagation()}
                    className="w-20"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-4">
              <div>
                <h3 className="text-lg font-medium mb-2">No song playing</h3>
                <p className="text-sm text-accent-foreground/50">
                  Click on a song to start playing
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
