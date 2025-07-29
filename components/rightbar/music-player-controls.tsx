"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  ChevronUp,
} from "lucide-react";

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

const MusicPlayerControls = ({ isMusicPaused, togglePlayPause }) => {
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
    <div className="bg-white/20 flex flex-col gap-2 w-full h-1/3 rounded-2xl">
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
        className="absolute bottom-0 w-full flex gap-1 justify-center items-center text-xs text-accent-foreground/20 hover:text-accent-foreground/80"
      >
        Volume <ChevronUp className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { MusicPlayerControls };
