# Dino Runner Academy — Low Level Design

## File: `script.js` — Module Breakdown

### 1. DOM References (lines 1–11)

All game elements are cached as `const` at module scope:

| Variable | Element |
|---|---|
| `obstacle` | `.obstacle` |
| `dino` | `.dino` |
| `gameArea` | `.game-area` |
| `startScreen` | `.start-screen` |
| `gameOverScreen` | `.game-over` |
| `restartBtn` | `#restart-btn` |
| `scoreDisplay` | `#score` |
| `levelDisplay` | `#level` |
| `highScoreDisplay` | `#high-score` |
| `memePopup` | `.meme-popup` |
| `memeDiv` | `.meme-popup div` |

### 2. Sprite Frame Arrays

Four arrays of image paths define the animation frames:

- `runFrames` — 8 frames, `./images/png/Run (1).png` … `Run (8).png`
- `jumpFrames` — 12 frames, `./images/png/Jump (1).png` … `Jump (12).png`
- `deadFrames` — 8 frames, `./images/png/Dead (1).png` … `Dead (8).png`
- `idleFrames` — 10 frames, `./images/png/Idle (1).png` … `Idle (10).png`

### 3. Meme Pools

- `memes` — 8 gameplay meme GIFs/PNGs (shown at level >= 5)
- `sadMemes` — 4 sad meme images (shown on game over)

### 4. Game State Variables

| Variable | Type | Initial | Purpose |
|---|---|---|---|
| `gameState` | string | `'START'` | Global game state (`START`, `PLAYING`, `GAME_OVER`) |
| `dinoState` | string | `'IDLE'` | Dino animation state (`IDLE`, `RUNNING`, `JUMPING`, `DEAD`) |
| `groundY` | number | `35` | Y position of the ground (dino standing height) |
| `y` | number | `groundY` | Current dino Y position |
| `vy` | number | `0` | Vertical velocity |
| `gravity` | number | `0.65` | Gravity acceleration per frame |
| `jumpForce` | number | `15` | Initial upward velocity on jump |
| `position` | number | `1000` | Obstacle X position (left edge) |
| `speed` | number | `10` | Horizontal scroll speed (increases with level) |
| `bgPosition` | number | `0` | Background parallax offset |
| `score` | number | `0` | Current score |
| `level` | number | `1` | Current level |
| `highScore` | number | `localStorage` value or `0` | Persistent high score |
| `currentFrameIndex` | number | `0` | Index into current sprite array |
| `animTime` | number | `0` | Accumulated time for frame advancement |
| `scoreTimer` | number | `0` | Accumulated time for score increment |
| `lastTime` | number | `0` | Timestamp from last frame |
| `memeTimer` | number | `0` | Accumulated time for meme cycling |
| `nextMemeDuration` | number | `0` | Random duration (3500–8000ms) before next meme |
| `lastMemeIndex` | number | `-1` | Index of last shown meme (avoid repeats) |

### 5. Functions

#### `handleAction()`
Dispatches based on `gameState`:
- `START` → `startGame()`
- `PLAYING` + dino not jumping → `jump()`
- `GAME_OVER` → `restartGame()`

#### `startGame()`
Resets all game parameters to initial values, hides overlays, resets score/level/speed, clears meme state, updates displays.

#### `jump()`
Sets `dinoState = 'JUMPING'`, applies `vy = jumpForce`, resets `currentFrameIndex = 0`.

#### `endGame()`
Sets `gameState = 'GAME_OVER'`, `dinoState = 'DEAD'`, shows game-over overlay, triggers a sad meme.

#### `restartGame()`
Calls `startGame()` (full reset).

#### `triggerNextGameplayMeme()`
Selects a random meme from `memes` (avoiding last shown), injects an `<img>` into `memeDiv`, shows `memePopup`, sets `nextMemeDuration` to a random value between 3500–8000ms.

#### `showSadMeme()`
Selects a random meme from `sadMemes`, injects an `<img>` into `memeDiv`, shows `memePopup`.

#### `hideMeme()`
Hides `memePopup` and clears `memeDiv` inner HTML.

#### `gameLoop(time)`
The main loop called via `requestAnimationFrame`:
1. Computes `deltaTime` and caps it at 100ms
2. If `gameState === 'PLAYING'`: calls `updatePhysics(cappedDelta)` and `checkCollisions()`
3. Always calls `updateAnimations(cappedDelta)`
4. Schedules next frame with `requestAnimationFrame(gameLoop)`

#### `updatePhysics(deltaTime)`
Uses a `frameRatio = deltaTime / (1000/60)` to normalize to 60 FPS:
- **Jump physics**: If `dinoState === 'JUMPING'`, applies `vy -= gravity * frameRatio`, `y += vy * frameRatio`. When `y <= groundY`, snaps to ground and sets `dinoState = 'RUNNING'`.
- **Obstacle movement**: `position -= speed * frameRatio`. When obstacle passes off-screen (`position < -obstacleWidth`), respawns at `1000 + random(0, 200)`.
- **Parallax**: `bgPosition -= (speed * 0.4) * frameRatio`, applied to `gameArea.style.backgroundPositionX`.
- **Score**: `scoreTimer += deltaTime`. Every 100ms, increments `score` and updates display. On every 100-point milestone, increments `level` and `speed += 1.5`.
- **Meme logic**: If `level >= 5`, accumulates `memeTimer` and triggers next meme when duration elapsed. Otherwise hides meme if visible.

#### `updateAnimations(deltaTime)`
Advances `animTime` by `deltaTime`. Based on `dinoState`:
- `IDLE` — `idleFrames`, 100ms delay, loops
- `RUNNING` — `runFrames`, `max(35, 80 - (speed - 10) * 3)` delay, loops (faster at higher speed)
- `JUMPING` — `jumpFrames`, 50ms delay, loops
- `DEAD` — `deadFrames`, 120ms delay, does not loop (stops on last frame)

Sets `dino.style.backgroundImage` to the current frame URL.

#### `checkCollisions()`
Uses `getBoundingClientRect()` on both `dino` and `obstacle` to compute hitboxes with insets:
- Dino hitbox: +22 left, -22 right, +15 top, -5 bottom
- Obstacle hitbox: +22 left, -22 right, +15 top, 0 bottom

Performs standard AABB overlap check. If overlapping, calls `endGame()`.

### 6. Event Listeners

| Event | Target | Handler |
|---|---|---|
| `keydown` | `document` | `handleAction()` on Space or ArrowUp |
| `click` | `gameArea` | `handleAction()` |
| `click` | `restartBtn` | `restartGame()` (with `stopPropagation`) |

### 7. CSS Keyframes (used by script via class toggling)

- `floatIn` — Slides up + fades in (used by start-content and meme-popup)
- `fadeIn` — Fades opacity 0→1 (used by game-over)
- `shake` — Horizontal oscillation (used by game-over h2)