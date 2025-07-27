"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MoreHorizontal, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const songs = [
  {
    id: 1,
    trackNumber: 1,
    title: "Havana",
    artist: "Annie Lennox",
    duration: "20:24",
    cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
    color: "bg-gradient-to-b from-pink-400 via-purple-500 to-blue-500",
  },
  {
    id: 2,
    trackNumber: 2,
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    duration: "3:30",
    cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
    color: "bg-gradient-to-b from-green-400 to-blue-500",
  },
  {
    id: 3,
    trackNumber: 3,
    title: "Galway Girl",
    artist: "Ed Sheeran",
    duration: "2:49",
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    color: "bg-gradient-to-b from-orange-400 to-red-500",
  },
  {
    id: 4,
    trackNumber: 4,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    duration: "3:20",
    cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    color: "bg-gradient-to-b from-purple-400 to-pink-500",
  },
  {
    id: 5,
    trackNumber: 5,
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
    cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    color: "bg-gradient-to-b from-yellow-400 to-orange-500",
  },
  {
    id: 6,
    trackNumber: 6,
    title: "Golden Hour",
    artist: "JVKE",
    duration: "3:29",
    cover: "https://i.scdn.co/image/ab67616d0000b273b7e976d2b35c767f9012cb72",
    color: "bg-gradient-to-b from-blue-400 to-purple-500",
  },
  {
    id: 7,
    trackNumber: 7,
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: "3:53",
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    color: "bg-gradient-to-b from-red-400 to-yellow-500",
  },
  {
    id: 8,
    trackNumber: 8,
    title: "bad guy",
    artist: "Billie Eilish",
    duration: "3:14",
    cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
    color: "bg-gradient-to-b from-green-300 to-yellow-400",
  },
  {
    id: 9,
    trackNumber: 9,
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:35",
    cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    color: "bg-gradient-to-b from-blue-400 to-pink-400",
  },
  {
    id: 10,
    trackNumber: 10,
    title: "As It Was",
    artist: "Harry Styles",
    duration: "2:47",
    cover: "https://i.scdn.co/image/ab67616d0000b273b7e976d2b35c767f9012cb72",
    color: "bg-gradient-to-b from-pink-300 to-blue-300",
  },
  {
    id: 11,
    trackNumber: 11,
    title: "Flowers",
    artist: "Miley Cyrus",
    duration: "3:21",
    cover: "https://i.scdn.co/image/ab67616d0000b273b7e976d2b35c767f9012cb72",
    color: "bg-gradient-to-b from-yellow-300 to-pink-400",
  },
  {
    id: 12,
    trackNumber: 12,
    title: "Dance The Night",
    artist: "Dua Lipa",
    duration: "2:56",
    cover: "https://i.scdn.co/image/ab67616d0000b273b7e976d2b35c767f9012cb72",
    color: "bg-gradient-to-b from-purple-300 to-pink-300",
  },
];

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

const SongItem = ({ item }: { item: (typeof songs)[0] }) => (
  <motion.div
    key={item.id}
    className="flex items-center gap-4 py-2  rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
    variants={itemVariants}
    transition={{ type: "tween" }}
  >
    <div className="w-8 text-center text-sm text-muted-foreground font-medium">
      {item.trackNumber}.
    </div>

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
        <span>•</span>
        <span>{item.duration}</span>
      </div>
    </div>

    <div className="flex items-center gap-1">
      <button className="p-1 hover:bg-white/20 rounded-sm">
        <Play className="w-4 h-4 text-muted-foreground" />
      </button>
      <button className="p-1 hover:bg-white/20 rounded-sm">
        <Heart className="w-4 h-4 text-muted-foreground" />
      </button>
      <button className="p-1 hover:bg-white/20 rounded-sm">
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  </motion.div>
);

const ItemList = ({
  items,
  ItemComponent,
}: {
  items: any[];
  ItemComponent: React.ComponentType<{ item: any }>;
}) => (
  <AnimatePresence>
    <motion.div
      className="space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40 transition-colors"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </motion.div>
  </AnimatePresence>
);

export function DashboardSongs() {
  return (
    <Tabs defaultValue="playlists" className="w-full h-full flex flex-col">
      <TabsList className="w-full gap-2 px-2 max-w-xl flex-shrink-0">
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="playlists"
        >
          Playlists
        </TabsTrigger>
        <TabsTrigger
          className="    bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="albums"
        >
          Albums
        </TabsTrigger>
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="artists"
        >
          Artists
        </TabsTrigger>
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="streams"
        >
          Streams
        </TabsTrigger>
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="favorites"
        >
          Favorites
        </TabsTrigger>
      </TabsList>

      <div className="pt-4 flex-1 min-h-0">
        <TabsContent value="playlists" className="h-full">
          <ItemList items={songs} ItemComponent={SongItem} />
        </TabsContent>
        <TabsContent value="albums" className="h-full">
          <ItemList items={songs} ItemComponent={SongItem} />
        </TabsContent>
        <TabsContent value="artists" className="h-full">
          <ItemList items={songs} ItemComponent={SongItem} />
        </TabsContent>
        <TabsContent value="streams" className="h-full">
          <ItemList items={songs} ItemComponent={SongItem} />
        </TabsContent>
        <TabsContent value="favorites" className="h-full">
          <ItemList items={songs} ItemComponent={SongItem} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
