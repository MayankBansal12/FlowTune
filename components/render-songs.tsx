"use client";

import { Heart, MoreHorizontal, Pause, Play, Trash } from "lucide-react";
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

export const SongListView = ({ item, isCurrentSong, isPlaying }) => {
  return (
    <>
      <div className="w-8 text-center text-sm text-muted-foreground font-medium">
        {item.trackNumber}.
      </div>

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
          <span>•</span>
          <span>{item.duration}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 pr-2">
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
      </div>
    </>
  );
};

export const SongQueueView = ({ item, isCurrentSong, isPlaying }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <div
          className={`h-12 w-12 rounded-md ${item.color} flex items-center justify-center relative`}
        >
          <img
            src={item.cover}
            alt={item.title}
            className="h-full w-full rounded-md object-cover group-hover/queue:opacity-60 transition-all"
          />

          {isCurrentSong && isPlaying && (
            <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center group-hover/queue:opacity-0">
              <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          )}

          <Button
            size="icon"
            className="opacity-0 absolute p-1 hover:bg-white/20 transition-all rounded-full group-hover/queue:opacity-100"
          >
            {!isPlaying ? (
              <Play className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Pause className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center flex-1 min-w-0">
        <div className="flex flex-col">
          <span
            className={`font-medium truncate ${
              isCurrentSong ? "text-green-400" : "text-foreground"
            }`}
          >
            {item.title}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {item.artist}
          </span>
        </div>

        <Button
          size="icon"
          className="opacity-0 p-1 hover:bg-white/20 transition-all rounded-full group-hover/queue:opacity-100"
        >
          <Trash className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </>
  );
};

export const SongItem = ({ item, isRightBar }) => {
  const { addToQueueAndPlay, currentPlaying, isPlaying } = usePlayerStore();

  const handleSongClick = () => {
    addToQueueAndPlay(item);
  };

  // const handlePlayClick = (e) => {
  //   e.stopPropagation();
  //   addToQueueAndPlay(item);
  // };

  const isCurrentSong = currentPlaying?.id === item.id;

  return (
    <motion.div
      key={item.id}
      className={`flex items-center gap-3 py-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group ${isCurrentSong ? "bg-white/20" : ""} ${isRightBar ? "group/queue mx-2 px-2" : "group/list px-1"}`}
      variants={itemVariants}
      transition={{ type: "tween" }}
      onDoubleClick={handleSongClick}
    >
      {!isRightBar ? (
        <SongListView
          item={item}
          isRightBar={isRightBar}
          isCurrentSong={isCurrentSong}
          isPlaying={isPlaying}
        />
      ) : (
        <SongQueueView
          item={item}
          isRightBar={isRightBar}
          isCurrentSong={isCurrentSong}
          isPlaying={isPlaying}
        />
      )}
    </motion.div>
  );
};

export const ItemList = ({ items, ItemComponent, isRightBar }) => (
  <AnimatePresence>
    <motion.div
      className={`space-y-1 overflow-y-auto transition-colors h-full`}
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
