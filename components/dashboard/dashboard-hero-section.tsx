import React from "react";

export function HeroSection() {
  return (
    <div className="grid grid-cols-3  row-span-4 w-full gap-4">
      <div className="col-span-1 bg-white/20 rounded-xl p-4 ">Playlist</div>
      <div className="col-span-2 bg-white/20 rounded-xl p-4">Song Playing</div>
    </div>
  );
}
