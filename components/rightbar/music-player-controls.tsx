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
  ChevronUp,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const volumeSliderVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const MusicPlayerControls = ({ isMusicPaused, togglePlayPause }) => {
  const [volumeOff, setVolumeOff] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const toggleVolumeLevel = () => {
    if (!volumeOff) {
      setVolumeLevel(0);
    } else {
      setVolumeLevel(50);
    }
    setVolumeOff((prev) => !prev);
  };

  const buttons = [
    {
      icon: <Shuffle className="!w-5 !h-5" />,
      variant: "ghost",
      onClick: undefined,
    },
    {
      icon: <SkipBack className="!w-5 !h-5" />,
      variant: "ghost",
      onClick: undefined,
    },
    {
      icon: isMusicPaused ? (
        <Play className="!w-12 !h-12 p-3" />
      ) : (
        <Pause className="!w-12 !h-12 p-3" />
      ),
      variant: "secondary",
      onClick: togglePlayPause,
      className: "inset-0 bg-white/10 size-12",
    },
    {
      icon: <SkipForward className="!w-5 !h-5" />,
      variant: "ghost",
      onClick: undefined,
    },
    {
      icon: <Repeat className="!w-5 !h-5" />,
      variant: "ghost",
      onClick: undefined,
    },
  ];

  return (
    <div className="bg-white/20 flex flex-col gap-2 w-full h-1/3 rounded-2xl relative">
      <div className="h-[85%] flex justify-center items-center gap-4">
        {buttons.map((btn, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Button
              size="icon"
              variant={btn.variant}
              onClick={btn.onClick}
              className={`rounded-full shadow-xl ${btn.className ?? "p-1"}`}
            >
              {btn.icon}
            </Button>
          </motion.div>
        ))}
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1 items-center text-xs text-accent-foreground/20 hover:text-accent-foreground/80 transition-colors"
        onMouseEnter={() => setShowVolumeSlider(true)}
      >
        Volume <ChevronUp className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {showVolumeSlider && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setShowVolumeSlider(false)}
            />
            <motion.div
              variants={volumeSliderVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 mb-2 z-50"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl">
                <div className="w-48 flex items-center gap-3">
                  {/* <span className="text-xs text-white/80 font-medium">
                                        {volumeLevel}%
                                    </span> */}

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={toggleVolumeLevel}
                    className="rounded-full p-2 hover:bg-white/10 transition-colors"
                  >
                    {volumeOff ? (
                      <VolumeOff className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </Button>

                  <Slider
                    value={[volumeLevel]}
                    onValueChange={(value) => {
                      setVolumeLevel(value[0]);
                      if (value[0] === 0) setVolumeOff(true);
                      else setVolumeOff(false);
                    }}
                    max={100}
                    step={1}
                    orientation="horizontal"
                    className="w-2/3"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export { MusicPlayerControls };
