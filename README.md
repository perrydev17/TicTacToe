# TicTacToe

<img width="600" height="848" alt="TicTacToe" src="https://github.com/user-attachments/assets/bb5fbe2e-8a2b-45b9-9c26-71e8098fa058" />

A fully client-side Tic Tac Toe game built with React and TypeScript, featuring a 3D isometric board, cyberpunk aesthetics, and an AI opponent powered by the minimax algorithm.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss) ![Vitest](https://img.shields.io/badge/Vitest-4-6e9f18?logo=vitest)

---

## System Requirements

| Tool    | Minimum Version | Notes                          |
| ------- | --------------- | ------------------------------ |
| Node.js | 18              | Required for ES module support |
| npm     | 9               | Bundled with Node 18+          |
| Git     | any             | For cloning the repository     |

Verify your versions:

```bash
node -v
npm -v
git --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd TicTacToe
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default. The terminal will print the exact URL.

---

## Available Scripts

| Command                 | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `npm run dev`           | Start the development server with hot module replacement  |
| `npm run build`         | Type-check and produce an optimized production bundle     |
| `npm run preview`       | Serve the production build locally for final verification |
| `npm run lint`          | Run ESLint across all source files                        |
| `npm run test`          | Run the full test suite once and exit                     |
| `npm run test:watch`    | Run tests in watch mode (re-runs on file change)          |
| `npm run test:coverage` | Generate a code coverage report                           |
| `npm run test:ui`       | Open the interactive Vitest browser UI                    |

---

## What Is This?

TicTacToe is a single-page application with no backend dependencies. The entire game runs in the browser. Key design decisions:

- **3D isometric board** — rendered purely with CSS 3D transforms (`rotateX(55deg) rotateZ(45deg)`) and `preserve-3d`, no canvas or WebGL required.
- **Cyberpunk visual theme** — dark background with neon cyan (Player X) and neon pink (Player O) accents, using the Inter, Space Grotesk, and JetBrains Mono font stack.
- **Self-contained AI** — the minimax algorithm in `src/utils.ts` plays optimally on Hard difficulty with zero external calls.
- **Spring-physics animations** — powered by the Motion library for piece entry, winning line reveal, and victory overlay transitions.

---

## Features

### Game Modes

- **Player vs CPU (PvC)** — default mode; the CPU takes the `O` side.
- **Player vs Player (PvP)** — two players share the same device. (Future enhancement)

### AI Difficulty

- **Easy** — the CPU picks a random available square.
- **Hard** — the CPU uses the minimax algorithm and plays optimally (unbeatable).

### Avatar Customization

Both players can be customized independently from the Settings panel:

- **Preset icons** — Ghost, Skull, Heart, Star, Zap, Shield, X, Circle (from Lucide React)
- **Custom image upload** — PNG, JPG, WEBP, or GIF; displayed with grayscale + contrast styling to fit the theme

### Animations & Visual Effects

- Winning squares gain a neon glow (`shadow-[0_0_40px_rgba(255,255,255,0.15)]`)
- An animated shimmering line draws through the winning combination (1.1 s delay)
- A full-screen victory overlay fades in after the line completes (2.2 s total)

### Victory & Draw States

- Win screen — displays the winning player's icon and a restart button
- Draw screen — neutral icon, restart button

### Responsive Design

- Mobile: 320 px board
- Tablet and above (`sm:` breakpoint): 380 px board

### Test Suite

- **Unit tests** (`src/__test__/utils.test.ts`) — covers all 8 win patterns, draw detection, minimax (`getBestMove`), and random move selection (`getRandomMove`)
- **Hook integration tests** (`src/__test__/useGameCore.test.ts`) — verifies CPU move timing (800 ms delay), difficulty branching, and turn management using Vitest fake timers

---

## Tech Stack

| Layer             | Library                     | Version |
| ----------------- | --------------------------- | ------- |
| UI framework      | React + React DOM           | 19      |
| Language          | TypeScript                  | ~6      |
| Bundler           | Vite                        | 8       |
| Styling           | Tailwind CSS                | 4       |
| Animation         | Motion (Framer Motion)      | 12      |
| Icons             | Lucide React                | 1       |
| Test runner       | Vitest                      | 4       |
| Component testing | @testing-library/react      | 16      |
| DOM assertions    | @testing-library/jest-dom   | 6       |
| User events       | @testing-library/user-event | 14      |
| DOM environment   | jsdom                       | 29      |
| Linter            | ESLint + typescript-eslint  | 10 / 8  |

---

## Project Structure

```
src/
├── main.tsx               # React root — mounts <App />
├── App.tsx                # Top-level component
├── types.ts               # Shared TypeScript types (Player, GameStatus, etc.)
├── utils.ts               # Pure game logic: checkWinner, isDraw, getBestMove, getRandomMove
├── index.css              # Global styles, Tailwind directives, CSS custom properties
│
├── components/
│   ├── GameBoard.tsx      # Main layout — composes all components, applies 3D transform
│   ├── Square.tsx         # Individual cell with 3D press animation
│   ├── GameHeader.tsx     # Title bar and settings trigger
│   ├── GameFooter.tsx     # Reset / retry button
│   ├── PlayerStatus.tsx   # Active player indicator with avatar
│   ├── Settings.tsx       # Modal: game mode, difficulty, avatar picker
│   ├── VictoryOverlay.tsx # Win / draw full-screen overlay
│   ├── WinningLine.tsx    # Animated line through winning squares
│   └── DynamicIcon.tsx    # Renders a preset icon or uploaded image
│
├── hooks/
│   ├── useTicTacToe.ts    # Master hook — composes all hooks below
│   ├── useGameCore.ts     # Board state, turn logic, CPU move scheduling
│   ├── useAvatars.ts      # Avatar state and image upload handling
│   └── useGameOverlay.ts  # Timing for winning line and victory overlay
│
└── __test__/
    ├── setup.ts           # Vitest global setup (imports jest-dom matchers)
    ├── utils.test.ts      # Unit tests for game logic utilities
    └── useGameCore.test.ts # Integration tests for the game core hook
```

---

## Potential Enhancements

| Enhancement               | Description                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| **Online multiplayer**    | Real-time PvP over WebSocket (e.g. Socket.io)                                  |
| **Score persistence**     | Track wins/losses across sessions with `localStorage` or a lightweight backend |
| **Variable board sizes**  | Support 4×4 or 5×5 grids with adjusted win conditions                          |
| **Sound effects**         | Piece placement clicks, win fanfare, draw buzzer                               |
| **Move history & replay** | Step through the game move by move after it ends                               |
| **Keyboard navigation**   | Arrow keys to move focus, Enter/Space to place a piece                         |
| **Screen reader support** | ARIA live regions to announce moves and game state changes                     |
| **PWA / installable app** | Service worker + web app manifest for offline play and home-screen install     |
| **Leaderboard**           | Persistent rankings with a simple backend or Supabase                          |
| **Theme toggle**          | Light mode variant of the cyberpunk palette                                    |

---

## React Native

Please refer to the **[React Native README](https://github.com/perrydev17/TicTacToe/blob/develop/react-native/README.md)** for full setup, run commands, and deployment guide.

The core idea behind the mobile implementation is to have a single source of truth for all game logic and state. All hooks (`useTicTacToe`, `useGameCore`, `useGameOverlay`) and utilities (`checkWinner`, `getBestMove`, `isDraw`) live in a platform-agnostic `shared/` package. The `web/` and `react-native/` directories each own only their UI layer — components, styles, and platform-specific integrations like haptics or CSS transforms. A bug fixed in `useGameCore` is fixed on both platforms simultaneously, and the AI behaves identically everywhere.

```
TicTacToe/
├── shared/
│   ├── hooks/            # useTicTacToe, useGameCore, useGameOverlay, useAvatars
│   ├── utils.ts          # checkWinner, isDraw, getBestMove, getRandomMove
│   └── types.ts          # Player, AvatarConfig, WinnerInfo, GameMode…
│
├── web/                  # React + Vite — imports from @shared/*
│   └── src/
│
└── react-native/         # Expo — imports from @shared/*
   └── components/
```
