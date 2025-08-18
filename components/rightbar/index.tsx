"use client";

import { mockMusicData } from "@/__mocks__/mockSongsData";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Play,
  Pause,
  ListMusic,
} from "lucide-react";
import { ItemList, SongItem } from "@/components/render-songs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/helper";
import usePlayerStore from "@/app/stores/usePlayerStore";
import { MusicPlayerControls } from "./music-player-controls";

export function RightBar() {
  const audioRef = useRef(null);

  const {
    currentPlaying,
    isPlaying,
    isMuted,
    volumeLevel,
    currentTime,
    duration,
    playerQueue,
    currentPlayCollapsed,
    toggleCurrentPlayCollapsed,
    currentSongIndex,
    setAudioElement,
    togglePlayPause,
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

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [updateCurrentTime, updateDuration, handleSongEnd]);

  const handleSeek = (value) => {
    seekTo(value[0]);
  };

  const getQueueItems = () => {
    if (currentSongIndex === -1 || playerQueue.length === 0) {
      return mockMusicData;
    }

    return playerQueue.slice(currentSongIndex);
  };

  return (
    <LayoutGroup id="rightbar">
      <audio ref={audioRef} preload="metadata">
        <track kind="captions" />
      </audio>

      <motion.div
        layout
        transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
        className="h-full flex flex-col gap-4"
      >
        {/* Player Queue */}
        <motion.div
          layout
          transition={{
            layout: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className={`flex flex-col overflow-hidden backdrop-blur-md bg-white/20 rounded-2xl py-2 ${currentPlayCollapsed ? "h-[80%]" : "h-[60%]"}`}
        >
          <h2 className="text-lg flex gap-2 py-4 px-4 items-center">
            <ListMusic /> Player Queue
          </h2>
          <div className="h-full overflow-y-auto">
            <ItemList
              items={getQueueItems()}
              ItemComponent={SongItem}
              isRightBar={true}
            />
          </div>
        </motion.div>

        {/* Current Playing */}
        <motion.div
          layout
          transition={{
            layout: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className={`overflow-hidden backdrop-blur-md bg-white/20 rounded-2xl ${currentPlayCollapsed ? "h-[20%]" : "h-[40%]"}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!currentPlaying ? (
              <motion.div
                key="no-song"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-4"
              >
                <h3 className="text-lg font-medium mb-2">No song playing</h3>
                <p className="text-sm text-accent-foreground/50">
                  Double click on a song to start playing
                </p>
              </motion.div>
            ) : currentPlayCollapsed ? (
              <motion.div
                key="collapsed"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className="flex py-2 px-4 h-full"
              >
                <div className="flex gap-2 justify-center items-center">
                  <div className="group relative w-1/3">
                    <motion.img
                      layoutId="current-playing-poster"
                      initial={{ filter: "blur(5px)", rotate: -5 }}
                      animate={{ filter: "blur(0px)", rotate: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      loading="lazy"
                      src={currentPlaying.cover}
                      className="w-full rounded-2xl shadow-lg group-hover:shadow-2xl"
                      alt={currentPlaying.title}
                    />
                    <div
                      className={`absolute inset-0 bg-black/30 rounded-2xl transition-opacity group-hover:opacity-100 ${!isPlaying ? "opacity-100" : "opacity-0"}`}
                    ></div>
                    <Button
                      onClick={togglePlayPause}
                      className={`h-full absolute top-1/2 left-1/2 inset-0 bg-accent-foreground rounded-full cursor-pointer p-2 group-hover:opacity-100 transition-opacity ${!isPlaying ? "opacity-100" : "opacity-0"}`}
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </Button>
                  </div>
                  <div className="w-2/3 flex flex-col gap-2">
                    <motion.div
                      layoutId="current-playing-title"
                      initial={{
                        opacity: 0,
                        filter: "blur(5px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
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
                    <motion.div
                      layoutId="current-playing-slider"
                      className="flex flex-col gap-2 w-full"
                    >
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
                    </motion.div>
                  </div>
                </div>
                <Button size="icon" onClick={toggleCurrentPlayCollapsed}>
                  <ArrowUpRight />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-2 justify-between items-center py-2 px-4">
                  <h2 className="text-xl">Current Playing</h2>
                  <Button size="icon" onClick={toggleCurrentPlayCollapsed}>
                    <ArrowDownLeft />
                  </Button>
                </div>
                <div className="flex gap-2 px-4 py-3">
                  <motion.img
                    layoutId="current-playing-poster"
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
                      layoutId="current-playing-title"
                      initial={{
                        opacity: 0,
                        filter: "blur(5px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
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
                    <motion.div
                      layoutId="current-playing-slider"
                      className="flex flex-col gap-2 w-full"
                    >
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
                    </motion.div>
                  </div>
                </div>

                <MusicPlayerControls />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
