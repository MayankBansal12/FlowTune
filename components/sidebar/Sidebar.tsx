"use client";
import { Home, Search, Compass, LibraryIcon, Plus } from "lucide-react";
import { Library } from "@/components/sidebar/Library";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Compass, label: "Explore" },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function TopSidebar() {
  return (
    <div className="py-2 px-2">
      <AnimatePresence>
        <motion.ul
          className="flex flex-col gap-2"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={listVariants}
        >
          {navItems.map(({ icon: Icon, label }) => (
            <motion.li
              key={label}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white/10 transition-all duration-300 rounded-xl"
              variants={itemVariants}
              transition={{ type: "tween" }}
            >
              <Icon size={20} />
              {label}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

export function BottomSidebar() {
  return (
    <div className=" grid grid-rows-12 py-4 px-2 gap-2 bg-white/20 rounded-2xl h-full">
      <div className="flex items-center justify-between pb-4 px-4 gap-2 row-span-1">
        <div className="flex items-center gap-2">
          <LibraryIcon size={20} />
          <p>Your Library</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/30 transition-all duration-300 rounded-3xl p-1">
          <Search size={18} />
        </div>
      </div>
      <div className="row-span-10">
        <Library />
      </div>

      <div className="row-span-1 mx-2 cursor-pointer mb-1 hover:bg-white/30 transition-all duration-300 flex items-center gap-2 justify-center bg-white/20 rounded-3xl">
        <Plus size={24} />
        <p className="">New Playlist</p>
      </div>
    </div>
  );
}
