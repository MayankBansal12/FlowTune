"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  //   PauseCircle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  //   MoveUpRight,
  Volume2,
  VolumeOff,
  MonitorSpeaker,
  Airplay,
  //   ChevronDown,
  //   Info,
} from "lucide-react";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const timeStringToSeconds = (str) => {
  const [min, sec] = str.split(":").map(Number);
  return min * 60 + sec;
};

const mockMusicData = [
  {
    cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
    songName: "BIRDS OF A FEATHER",
    singers: "Billie Eilish",
    length: "3:30",
  },
  {
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    songName: "Galway Girl",
    singers: "Ed Sheeran",
    length: "2:49",
  },
];

const MusicPlayer = () => {
  const [playerExpand, setPlayerExpand] = useState(true);
  const [currentSongPlaying] = useState(mockMusicData[1]);
  const [volumeOff, setVolumeOff] = useState(true);
  const [isMusicPaused, setIsMusicPaused] = useState(true);
  const [songProgress, setSongProgress] = useState(0);
  //   const [volumeLevel, setVolumeLevel] = useState(0);
  const songLength = timeStringToSeconds(currentSongPlaying.length) ?? "00.00";

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

  //   const togglePlayPause = () => {
  //     setIsMusicPaused((prev) => !prev);
  //   };

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
        delay: 0.4,
        duration: 0.3,
        layout: { duration: 0.3 },
      }}
      style={{
        position: "absolute",
        width: playerExpand ? 500 : 200,
        height: playerExpand ? 100 : 30,
        backgroundColor: playerExpand ? "#4caf50" : "#9e9e9e",
        borderRadius: playerExpand ? 10 : 100,
        bottom: playerExpand ? "0.5rem" : "2rem",
        cursor: "pointer",
        overflow: "hidden",
      }}
      className="flex justify-center items-center"
    >
      {playerExpand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ padding: 10, color: "white" }}
        >
          {/* <div className="absolute top-0 left-0 ">
          <ChevronDown
            className="text-transparent p-1 w-8 h-8 group-hover:text-accent-foreground hover:text-accent-foreground/80 cursor-pointer transition-all"
            onClick={() => setPlayerExpand(false)}
          />
        </div> */}
          <div className="flex gap-2 items-center w-[25%]">
            <img
              loading="lazy"
              src={currentSongPlaying.cover}
              className="w-16 h-16 rounded-md shadow-md"
              alt={currentSongPlaying.songName}
            />
            <div className="flex flex-col justify-start items-center">
              <span>{currentSongPlaying.songName}</span>
              <span className="text-sm text-accent-foreground/50">
                {currentSongPlaying.singers}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 w-[55%] h-full">
            <div className="flex items-center gap-4">
              {/* <Button size="sm" variant="ghost" className="cursor-pointer">
                                <Shuffle />
                            </Button> */}
              {/* <Button size="sm" variant="ghost" className="cursor-pointer"> */}
              <SkipBack />
              {/* </Button> */}
              {/* <Button
              size="sm"
              onClick={togglePlayPause}
              className="inset-0 rounded-full cursor-pointer"
            > */}
              {isMusicPaused ? <Play /> : <Pause />}
              {/* </Button> */}
              {/* <Button size="sm" variant="ghost" className="cursor-pointer"> */}
              <SkipForward />
              {/* </Button> */}
            </div>
            <div className="flex flex-col gap-1 w-full">
              {/* <Slider
              value={[songProgress]}
              onValueChange={(value) => setSongProgress(value[0])}
              max={songLength}
              step={1}
              onDoubleClick={(e) => e.stopPropagation()}
            /> */}
              <div className="flex justify-between items-center gap-2 text-xs text-accent-foreground/50">
                <span>{formatTime(songProgress)}</span>
                <span>{formatTime(songLength)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 w-[20%]">
            <div className="flex gap-6 justify-center items-center">
              <MonitorSpeaker className="w-6 h-6 text-primary hover:text-accent-foreground/80 cursor-pointer transition-all" />
              <Airplay className="w-5 h-5 hover:text-accent-foreground/80 cursor-pointer transition-all" />
              {/* 
            <HoverCard>
              <HoverCardTrigger asChild> */}
              {/* <Info className="w-5 h-5 hover:text-accent-foreground/80 cursor-pointer transition-all" /> */}
              {/* </HoverCardTrigger>
              <HoverCardContent className="w-full"> */}
              {/* <div className="w-100 text-xs flex flex-col gap-2 text-accent-foreground/80">
              <h2 className="text-md font-semibold text-accent-foreground">
                Connect device with spotify to play the song!
              </h2>
              <span>
                Songs are played on connected device, the player is used to
                control the song on spotify
              </span>
              <span className="inline-flex gap-1 items-center">
                <span>Click on</span>
                <MonitorSpeaker className="w-4 h-4 text-accent-foreground" />
                <span>to connect devices to play songs on!</span>
              </span>
              <span>Double click to collapse</span>
            </div> */}
              {/* </HoverCardContent> */}
              {/* </HoverCard> */}
            </div>

            <div className="flex gap-2 w-full px-2">
              {volumeOff ? (
                <VolumeOff onClick={toggleVolumeLevel} className="w-5 h-5" />
              ) : (
                <Volume2 onClick={toggleVolumeLevel} className="w-5 h-5" />
              )}
              {/* <Slider
              value={[volumeLevel]}
              onValueChange={(value) => {
                setVolumeLevel(value[0]);
                if (value[0] === 0) setVolumeOff(true);
                else setVolumeOff(false);
              }}
              step={1}
              onDoubleClick={(e) => e.stopPropagation()}
            /> */}
            </div>
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
