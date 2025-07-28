import React from "react";
import { Header } from "./dashboard-header";
import { HeroSection } from "./dashboard-hero-section";
import { DashboardSongs } from "./dashboard-songs";

export function Dashboard() {
  return (
    <div className="p-4 grid grid-rows-12 gap-4 h-full">
      <Header />
      <HeroSection />
      <DashboardSongs />
    </div>
  );
}
