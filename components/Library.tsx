"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const playlists = [
  {
    id: "liked-songs",
    name: "Liked Songs",
    type: "Playlist",
    songCount: 2,
    color: "bg-pink-500",
    icon: HeartIcon,
  },
  {
    id: "top-songs-global",
    name: "Top Songs - Global",
    type: "Playlist",
    songCount: 49,
    color: "bg-purple-500",
    icon: null,
  },
  {
    id: "i-yah-album",
    name: "I Yah! - The 4th Album",
    type: "Album",
    artist: "H.O.T.",
    songCount: 12,
    color: "bg-yellow-500",
    icon: null,
  },
  {
    id: "first-playlist",
    name: "The First Playlist",
    type: "Playlist",
    songCount: 24,
    color: "bg-gradient-to-br from-orange-400 to-purple-600",
    icon: null,
  },
];

const albums = [
  {
    id: "album-1",
    name: "Midnight Dreams",
    artist: "Luna Echo",
    songCount: 15,
    color: "bg-blue-500",
  },
  {
    id: "album-2",
    name: "Electric Nights",
    artist: "Neon Pulse",
    songCount: 18,
    color: "bg-green-500",
  },
  {
    id: "album-3",
    name: "Ocean Waves",
    artist: "Crystal Clear",
    songCount: 22,
    color: "bg-cyan-500",
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PlaylistList = ({ items }: { items: typeof playlists }) => (
  <AnimatePresence>
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="flex items-center gap-3 justify-between"
          variants={itemVariants}
          transition={{ type: "tween" }}
        >
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-md ${item.color} flex items-center justify-center text-white font-bold text-xs`}
            >
              {item.icon ? (
                <item.icon className="h-6 w-6" />
              ) : item.type === "Album" ? (
                <span className="text-center leading-tight">A</span>
              ) : (
                <span className="text-center leading-tight">P</span>
              )}
            </div>
            <div>
              <span className="block text-sm leading-none font-semibold">
                {item.name}
              </span>
              <span className="text-xs leading-none text-muted-foreground">
                {item.type}{" "}
                {item.artist ? `• ${item.artist}` : `• ${item.songCount} songs`}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
);

export function Library() {
  return (
    <Tabs defaultValue="playlists" className="max-w-xs w-full">
      <TabsList className="w-full grid grid-cols-3 gap-2 px-2">
        <TabsTrigger
          className="text-xs bg-white/40 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="playlists"
        >
          Playlists
        </TabsTrigger>
        <TabsTrigger
          className="text-xs bg-white/40 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="albums"
        >
          Albums
        </TabsTrigger>
        <TabsTrigger
          className="text-xs bg-white/40 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="podcasts"
        >
          Podcasts
        </TabsTrigger>
      </TabsList>

      <div className=" py-4 px-3">
        <TabsContent value="playlists">
          <PlaylistList items={playlists} />
        </TabsContent>
        <TabsContent value="albums">
          <PlaylistList items={albums} />
        </TabsContent>
        <TabsContent value="podcasts">
          <PlaylistList items={albums} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
