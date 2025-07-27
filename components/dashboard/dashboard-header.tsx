"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Music4, SearchIcon } from "lucide-react";
import { MusicSearch } from "./dashboard-search";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogTrigger asChild className="col-span-1">
          <div className="flex items-center justify-between max-w-2xl min-w-96 bg-white/20 border border-white/10 rounded-xl py-1 px-4 cursor-pointer hover:bg-white/30 transition-colors">
            <SearchIcon size={20} />
            <Input
              placeholder="Search by artist, songs, or albums"
              className="rounded-xl border-none bg-transparent cursor-pointer"
              readOnly
            />
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none">
          <div className="w-full max-w-2xl mx-auto">
            <MusicSearch />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-2 col-span-2 justify-end">
        <Music4 size={28} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
