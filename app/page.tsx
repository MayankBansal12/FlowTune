"use client"

import { motion } from "motion/react"
import { RenderLogo } from "@/components/render-logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-4 px-2 flex flex-col gap-2">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
        }}
        className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <RenderLogo />
          <h2 className="font-bold text-3xl">
            <span className="text-foreground">Flow</span>
            <span className="text-primary">Tune</span>
          </h2>
        </div>
        <ThemeToggle />
      </motion.header>

      <div>
        <span className="text-foreground">hello, it&apos;s FlowTune</span>
        <span>a nice and ad-free music player</span>
      </div>
    </div>
  );
}
