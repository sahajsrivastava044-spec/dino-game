# Dino Runner Academy — High Level Design

## Architecture

The game is a single-page browser application built with vanilla HTML, CSS, and JavaScript. There is no build step, no framework, and no external dependencies beyond a Google Font.

```
┌─────────────────────────────────────────────┐
│                  index.html                  │
│  (DOM structure: header, game-area, HUD,    │
│   start-screen, game-over, meme-popup)      │
├─────────────────────────────────────────────┤
│                style.css                     │
│  (All visual styling, animations, layout)   │
├─────────────────────────────────────────────┤
│                script.js                     │
│  (Game logic, state machine, physics,       │
│   rendering, collision detection)           │
├─────────────────────────────────────────────┤
│              images/                         │
│  (Sprites, backgrounds, memes, obstacles)   │
└─────────────────────────────────────────────┘
```

## Components

### 1. DOM Structure (`index.html`)
- **`<header>`** — Navigation bar with title and links
- **`.game-area`** — The main game canvas (1000×400px div with background image)
  - `.dino` — The player character (positioned absolutely)
  - `.obstacle` — The current obstacle (positioned absolutely)
  - `.ground` — Ground plane at the bottom
  - `.start-screen` — Overlay shown before game starts
  - `.game-over` — Overlay shown on game over
- **`.hud`** — Heads-up display with score, level, high score
- **`.meme-popup`** — Overlay for meme images (shown during gameplay at level >= 5 or on game over)
- **`<footer>`** — Copyright notice

### 2. Styling (`style.css`)
- Dark gradient background theme
- Glassmorphism effects (backdrop-filter blur) on overlays and HUD
- CSS keyframe animations (`floatIn`, `fadeIn`, `shake`)
- Responsive game-area container with border and shadow
- Custom keycap styling for control hints

### 3. Game Logic (`script.js`)
- **State machine** — `gameState` (`START`, `PLAYING`, `GAME_OVER`) and `dinoState` (`IDLE`, `RUNNING`, `JUMPING`, `DEAD`)
- **Game loop** — `requestAnimationFrame`-based with delta time capping
- **Physics** — Gravity, jump force, obstacle movement
- **Collision detection** — Axis-aligned bounding box (AABB) with hitbox insets
- **Animation system** — Sprite frame cycling based on dino state and speed
- **Meme system** — Random meme selection from pools with duration timers
- **Persistence** — High score stored in `localStorage`

## Data Flow

```
User Input (keydown / click)
  │
  ▼
handleAction() ──► startGame() / jump() / restartGame()
  │
  ▼
gameLoop(requestAnimationFrame)
  │
  ├── updatePhysics(deltaTime)
  │     ├── Jump physics (vy, y, gravity)
  │     ├── Obstacle movement (position -= speed)
  │     ├── Parallax background scroll
  │     ├── Score progression (every 100ms)
  │     ├── Level & speed scaling
  │     └── Meme display logic (level >= 5)
  │
  ├── updateAnimations(deltaTime)
  │     └── Sprite frame cycling → dino.style.backgroundImage
  │
  └── checkCollisions()
        └── AABB hitbox comparison → endGame()
```

## Key Design Decisions

1. **No canvas** — The game uses DOM elements with CSS positioning for rendering. This keeps the code simple and accessible but limits visual complexity.
2. **Delta time capping** — `deltaTime` is capped at 100ms to prevent physics explosions on tab-switching.
3. **Frame-based animation** — Sprite frames advance on a timer rather than being tied to the physics step, ensuring consistent animation speed.
4. **localStorage for high score** — No server-side persistence; high score survives page refreshes on the same browser.
5. **Meme pools as arrays of paths** — Easy to add new memes by dropping files into the `images/` directory and adding paths to the array.