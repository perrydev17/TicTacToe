# Tic Tac Toe — React Native

Mobile implementation of the Tic Tac Toe game, built with Expo and React Native. Shares all game logic with the web version via the `../shared` package.

<img width="478" height="842" alt="tictactoe-react-native" src="https://github.com/user-attachments/assets/58caa528-491b-486e-b124-8a655e8bf2a8" />
<img width="488" height="847" alt="tictactoe-react-native2" src="https://github.com/user-attachments/assets/daad892f-c6fb-48af-876f-fc67afd340e1" />

---

## Requirements

| Tool             | Version                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js          | 18+                                                                                                                                         |
| Expo CLI         | `npx expo` (no global install needed)                                                                                                       |
| Expo Go (phone)  | SDK 53 — [iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) |
| iOS Simulator    | Xcode 15+ (Mac only)                                                                                                                        |
| Android Emulator | Android Studio (optional)                                                                                                                   |

---

## Setup

```bash
git clone <repo-url>
git checkout react-native-version
cd react-native
npm install
```

---

## Run Commands

| Command                    | What it does                                            |
| -------------------------- | ------------------------------------------------------- |
| `npx expo start`           | Start dev server, scan QR to open in Expo Go            |
| `npx expo start --clear`   | Start with cache cleared (use after dependency changes) |
| `npx expo start --tunnel`  | Use tunnel mode (for restricted/corporate networks)     |
| `npx expo start --android` | Open directly in Android emulator                       |
| `npx expo start --ios`     | Open directly in iOS simulator (Mac only)               |
| `npx expo start --web`     | Run in browser via React Native Web                     |

---

## Tech Stack

| Package                           | Purpose                                        |
| --------------------------------- | ---------------------------------------------- |
| `expo ~53.0.0`                    | Managed workflow, build tooling, native APIs   |
| `react-native 0.79.2`             | Core mobile framework                          |
| `react-native-reanimated ~3.17.4` | 60fps animations, spring physics               |
| `moti ^0.30.0`                    | Declarative animation API on top of Reanimated |
| `expo-haptics ~14.1.4`            | Tactile feedback on moves and game end         |
| `expo-image-picker ~16.1.4`       | Custom avatar photo upload from gallery        |
| `expo-linear-gradient ~14.1.0`    | Gradient effects                               |
| `lucide-react-native ^0.511.0`    | Icon set for avatars and UI                    |
| `react-native-svg 15.11.1`        | SVG support for Lucide icons                   |
| `react-native-web ~0.20.0`        | Browser target via `expo start --web`          |
| `typescript ~5.8.0`               | Type safety throughout                         |

---

## Project Structure

```
react-native/
├── App.tsx                        # Entry point — registers root component
├── app.json                       # Expo config (icon, splash, permissions, plugins)
├── assets/
│   └── cheddr-icon.png            # App icon + splash image (1024×1024)
├── components/
│   ├── GameBoard.tsx              # Main screen — layout, state wiring
│   ├── ErrorBoundary.tsx          # Crash-safe wrapper with "Try Again" screen
│   ├── NativeSquare.tsx           # Individual board cell with 3D slab effect
│   ├── NativePlayerStatus.tsx     # Active player indicator pill
│   ├── NativeVictoryOverlay.tsx   # Win/draw modal with haptic feedback
│   ├── NativeSettingsModal.tsx    # Bottom sheet — game mode, difficulty, avatars
│   ├── SegmentControl.tsx         # Reusable segmented button control
│   └── IconPicker.tsx             # Avatar icon grid + photo upload
├── constants/
│   └── theme.ts                   # Colour tokens — single source of truth
├── babel.config.js                # Expo preset + module resolver for @shared
├── metro.config.js                # Monorepo config — watches ../shared
└── tsconfig.json                  # Strict mode + @shared path alias
```

Shared game logic lives in `../shared/`:

```
shared/
├── hooks/
│   ├── useTicTacToe.ts            # Root hook — composes all game state
│   ├── useGameCore.ts             # Board state, move handling, AI timer
│   ├── useGameOverlay.ts          # Victory/winner line timing
│   ├── useAvatars.native.ts       # Avatar state (native platform)
│   └── useAvatars.web.ts          # Avatar state (web platform)
├── types.ts                       # Shared TypeScript types
└── utils.ts                       # Win detection, minimax AI, move helpers
```

---

## What's Included

- Game board with perspective transform
- Player vs AI with Easy (random) and Hard (minimax) difficulty
- Custom avatars — 8 preset icons or photo from gallery
- AI thinking indicator — status pill updates during the 800ms AI delay
- Victory overlay with spring animation
- Settings bottom sheet with segmented controls
- Error boundary — unhandled errors show a recoverable screen
- Full TypeScript with strict mode
- Shared logic with the web version — same AI, same win detection

---

## What's Not Included

- **Haptic feedback on every move, heavy impact on win**
- **Player vs Player** — UI exists but is disabled (marked "soon")
- **Settings persistence** — avatar choices reset on app restart
- **Sound effects** — no audio feedback
- **Analytics / crash reporting** — no Sentry or similar
- **Push notifications** — not applicable to this game type
- **Offline AI** — AI runs on-device (no internet needed, but no ML model)

---

## Future Enhancements

| Feature              | Notes                                                        |
| -------------------- | ------------------------------------------------------------ |
| Settings persistence | Save avatar + difficulty to AsyncStorage                     |
| Player vs Player     | Local multiplayer on same device                             |
| Sound effects        | Move clicks, win fanfare via `expo-av`                       |
| Confetti on win      | Particle burst using Reanimated — no extra dependency        |
| Win statistics       | Track wins/losses/draws across sessions                      |
| Animated AI thinking | Pulse animation on status pill (needs correct Moti loop API) |
| SDK 54 upgrade       | `npx expo install expo@^54 && npx expo install --fix`        |
| EAS build setup      | Required for App Store / Play Store submission               |
| App Store assets     | Screenshots, description, keywords                           |
