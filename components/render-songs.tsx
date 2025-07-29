"use client";

import { Heart, MoreHorizontal, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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
}) => (
  <motion.div
    key={item.id}
    className="flex items-center gap-4 py-2  rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
    variants={itemVariants}
    transition={{ type: "tween" }}
  >
    {!isRightBar && (
      <div className="w-8 text-center text-sm text-muted-foreground font-medium">
        {item.trackNumber}.
      </div>
    )}

    <div className="flex-shrink-0">
      <div
        className={`h-12 w-12 rounded-md ${item.color} flex items-center justify-center`}
      >
        <img
          src={item.cover}
          alt={item.title}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm truncate text-foreground">
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
      <button className="p-1 hover:bg-white/20 rounded-sm">
        <Play className="w-4 h-4 text-muted-foreground" />
      </button>
      {!isRightBar && (
        <>
          <button className="p-1 hover:bg-white/20 rounded-sm">
            <Heart className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-white/20 rounded-sm">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </>
      )}
    </div>
  </motion.div>
);

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
