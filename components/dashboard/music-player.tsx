"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
  ChevronDown,
  Shuffle,
  Repeat,
  Repeat1,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import usePlayerStore from "@/app/stores/usePlayerStore";

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs?.toString()?.padStart(2, "0")}`;
};

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const {
    currentPlaying,
    isPlaying,
    isShuffle,
    isRepeat,
    isMuted,
    volumeLevel,
    currentTime,
    duration,
    playerQueue,

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

  const [playerExpand, setPlayerExpand] = useState(true);

  useEffect(() => {
    console.log(
      "audioRef.current",
      audioRef.current,
      " current volume level: ",
      volumeLevel,
    );
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

  if (!currentPlaying) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <track kind="captions" />
      </audio>

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
                src={currentPlaying.cover}
                className="w-20 h-20 rounded-2xl shadow-lg"
                alt={currentPlaying.title}
              />
              <div className="flex flex-col justify-start items-center">
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {currentPlaying.title}
                </span>
                <span className="text-xs text-accent-foreground/50 truncate max-w-[120px]">
                  {currentPlaying.artist}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 w-1/3 h-full">
              <div className="flex items-center gap-2">
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
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Slider
                  value={[currentTime]}
                  onValueChange={handleSeek}
                  max={duration || 100}
                  step={1}
                  onDoubleClick={(e) => e.stopPropagation()}
                  className="w-full"
                />
                <div className="flex justify-between items-center gap-2 text-xs text-accent-foreground/50">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-1/4 px-2 items-center">
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
                className="w-full"
              />
            </div>
          </motion.div>
        )}

        {!playerExpand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full h-full flex items-center justify-center text-white text-sm font-medium"
            onClick={() => setPlayerExpand(true)}
          >
            {currentPlaying.title}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export { MusicPlayer };
