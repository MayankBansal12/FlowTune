"use client";

import { Heart, MoreHorizontal, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./ui/button";
import usePlayerStore from "@/app/stores/usePlayerStore";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const SongItem = ({
  item,
  isRightBar,
}: {
  item: (typeof songs)[0];
  isRightBar: boolean;
}) => {
  const { addToQueueAndPlay, currentPlaying, isPlaying } = usePlayerStore();

  const handleSongClick = () => {
    addToQueueAndPlay(item);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    addToQueueAndPlay(item);
  };

  const isCurrentSong = currentPlaying?.id === item.id;

  return (
    <motion.div
      key={item.id}
      className={`flex items-center gap-4 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group ${
        isCurrentSong ? "bg-white/20" : ""
      }`}
      variants={itemVariants}
      transition={{ type: "tween" }}
      onClick={handleSongClick}
    >
      {!isRightBar && (
        <div className="w-8 text-center text-sm text-muted-foreground font-medium">
          {item.trackNumber}.
        </div>
      )}

      <div className="flex-shrink-0">
        <div
          className={`h-12 w-12 rounded-md ${item.color} flex items-center justify-center relative`}
        >
          <img
            src={item.cover}
            alt={item.title}
            className="h-full w-full rounded-md object-cover"
          />
          {isCurrentSong && isPlaying && (
            <div className="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center">
              <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`font-medium text-sm truncate ${
              isCurrentSong ? "text-green-400" : "text-foreground"
            }`}
          >
            {item.title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{item.artist}</span>
          {!isRightBar && <span>•</span>}
          {!isRightBar && <span>{item.duration}</span>}
        </div>
      </div>

      <div className="flex items-center gap-1 pr-2">
        <Button
          size="icon"
          className="p-1 hover:bg-white/20 transition-all rounded-full"
          onClick={handlePlayClick}
        >
          <Play className="w-4 h-4 text-muted-foreground" />
        </Button>
        {!isRightBar && (
          <>
            <Button
              size="icon"
              className="p-1 hover:bg-white/20 transition-all rounded-full"
            >
              <Heart className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button
              size="icon"
              className="p-1 hover:bg-white/20 transition-all rounded-full"
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const ItemList = ({
  items,
  ItemComponent,
  isRightBar,
}: {
  items: any[];
  ItemComponent: React.ComponentType<{ item: any }>;
  isRightBar?: boolean;
}) => (
  <AnimatePresence>
    <motion.div
      className={`space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40 transition-colors h-full`}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} isRightBar={isRightBar} />
      ))}
    </motion.div>
  </AnimatePresence>
);
