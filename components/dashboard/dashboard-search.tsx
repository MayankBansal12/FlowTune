"use client";

import { useState } from "react";
import {
  Music,
  Disc,
  User,
  Search,
  Play,
  Clock,
  Heart,
  MoreHorizontal,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

// Dummy data for songs, albums, and artists
const dummySongs = [
  {
    id: 1,
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    duration: "3:30",
    cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
  },
  {
    id: 2,
    title: "Galway Girl",
    artist: "Ed Sheeran",
    duration: "2:49",
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
  },
  {
    id: 3,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    duration: "3:20",
    cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
  },
  {
    id: 4,
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
    cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
  },
  {
    id: 5,
    title: "Golden Hour",
    artist: "JVKE",
    duration: "3:29",
    cover: "https://i.scdn.co/image/ab67616d0000b273b7e976d2b35c767f9012cb72",
  },
];

const dummyAlbums = [
  {
    id: 1,
    title: "HIT ME HARD AND SOFT",
    artist: "Billie Eilish",
    year: "2024",
    cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
  },
  {
    id: 2,
    title: "÷ (Divide)",
    artist: "Ed Sheeran",
    year: "2017",
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
  },
  {
    id: 3,
    title: "Midnights",
    artist: "Taylor Swift",
    year: "2022",
    cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
  },
  {
    id: 4,
    title: "After Hours",
    artist: "The Weeknd",
    year: "2020",
    cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
  },
  {
    id: 5,
    title: "this is what __ feels like",
    artist: "JVKE",
    year: "2023",
    cover: "https://i.scdn.co/image/ab67616d0000b273b7e976d2b35c767f9012cb72",
  },
];

const dummyArtists = [
  {
    id: 1,
    name: "Billie Eilish",
    genre: "Pop",
    followers: "85.2M",
    cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
  },
  {
    id: 2,
    name: "Ed Sheeran",
    genre: "Pop",
    followers: "52.1M",
    cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
  },
  {
    id: 3,
    name: "Taylor Swift",
    genre: "Pop",
    followers: "98.7M",
    cover: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
  },
  {
    id: 4,
    name: "The Weeknd",
    genre: "R&B",
    followers: "76.3M",
    cover: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
  },
  {
    id: 5,
    name: "JVKE",
    genre: "Pop",
    followers: "12.8M",
    cover: "https://i.scdn.co/image/ab67616d0000b273b7e976d2b35c767f9012cb72",
  },
];

export function MusicSearch() {
  const [searchValue, setSearchValue] = useState("");

  const filteredSongs = dummySongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const filteredAlbums = dummyAlbums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const filteredArtists = dummyArtists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Command className="rounded-lg bg-white/30 p-4 shadow-md shadow-white/10 text-[#eee8df] md:min-w-[450px] backdrop-blur-md max-h-[500px] flex flex-col">
      <CommandInput
        placeholder="Search for songs, albums, or artists..."
        value={searchValue}
        onValueChange={setSearchValue}
        className="flex-shrink-0"
      />
      <CommandList className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40 transition-colors">
        <CommandEmpty>No results found.</CommandEmpty>

        {filteredSongs.length > 0 && (
          <>
            <CommandGroup heading="Songs">
              {filteredSongs.map((song) => (
                <CommandItem
                  key={song.id}
                  className="flex items-center gap-3 p-2 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">
                        {song.title}
                      </span>
                      <Music className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{song.artist}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {song.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-accent rounded-sm">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-accent rounded-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-accent rounded-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="bg-white/20" />
          </>
        )}

        {filteredAlbums.length > 0 && (
          <>
            <CommandGroup heading="Albums">
              {filteredAlbums.map((album) => (
                <CommandItem
                  key={album.id}
                  className="flex items-center gap-3 p-2 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">
                        {album.title}
                      </span>
                      <Disc className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{album.artist}</span>
                      <span>•</span>
                      <span>{album.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-accent rounded-sm">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-accent rounded-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-accent rounded-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="bg-white/20" />
          </>
        )}

        {filteredArtists.length > 0 && (
          <CommandGroup heading="Artists">
            {filteredArtists.map((artist) => (
              <CommandItem
                key={artist.id}
                className="flex items-center gap-3 p-2 cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <img
                    src={artist.cover}
                    alt={artist.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {artist.name}
                    </span>
                    <User className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{artist.genre}</span>
                    <span>•</span>
                    <span>{artist.followers} followers</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-accent rounded-sm">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-accent rounded-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-accent rounded-sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {searchValue && (
          <>
            <CommandSeparator className="bg-white/20" />
            <CommandGroup heading="Quick Actions">
              <CommandItem>
                <Search className="w-4 h-4" />
                <span>Search &ldquo;{searchValue}&ldquo; on Spotify</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Music className="w-4 h-4" />
                <span>Add to playlist</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Heart className="w-4 h-4" />
                <span>Add to favorites</span>
                <CommandShortcut>⌘L</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}
