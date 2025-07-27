import React from "react";
import { Header } from "./dashboard-header";
import { HeroSection } from "./dashboard-hero-section";
import { DashboardSongs } from "./dashboard-songs";

export function Dashboard() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Header />
      <HeroSection />
      <DashboardSongs />
    </div>
  );
}
