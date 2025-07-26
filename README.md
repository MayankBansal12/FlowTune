# FlowTune

An open source and ad-free music player for streaming online copyright-free music and importing local music.

## Project Structure

- `apps/` – Main Next.js web application
- `apps/components/` – UI and components
- `apps/hooks/` – Custom React hooks
- `apps/lib/` – Utility and API logic
- `apps/stores/` – State management (Zustand)

The project has typescript setup but it has been disabled during dev and build. The idea is to build v0 quickly with js and migrate to ts at a later stage.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18 or later)
- pnpm (v10 or later)

### Setup

- Fork the repository
- Clone your fork locally
- Copy .env.example to .env.local
- Install dependencies: `pnpm install`
- Start the development server: `pnpm run dev`
