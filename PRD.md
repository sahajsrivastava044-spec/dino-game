# Dino Runner Academy — Product Requirements Document

## Overview

Dino Runner Academy is a browser-based endless runner game where a cartoon dinosaur dodges obstacles by jumping. The game features progressive difficulty, score tracking, meme popups for fun engagement, and a polished UI with animations.

## Target Audience

- Casual gamers looking for a quick, fun browser game
- Open source contributors and hobbyists
- Anyone who enjoys retro-style runner games with a modern twist

## Features

### Core Gameplay
- **Running dino** with animated sprite frames (idle, run, jump, dead states)
- **Obstacles** that scroll from right to left at increasing speed
- **Jump mechanic** triggered by Spacebar, Up Arrow, or screen tap/click
- **Collision detection** between dino and obstacles using bounding boxes
- **Game over** when the dino hits an obstacle

### Progression
- **Score** increases over time (1 point per 100ms)
- **Level** increases every 100 points
- **Speed** increases with each level (base speed 10, +1.5 per level)
- **High score** persisted in `localStorage`

### UI / UX
- **Start screen** with animated overlay and instructions
- **HUD** showing score, level, and high score
- **Game over screen** with restart button
- **Meme popups** — random gameplay memes appear when level >= 5
- **Sad memes** — displayed on game over screen
- **Parallax background** scrolling for visual depth
- **Responsive design** with a dark gradient theme

### Controls
| Input | Action |
|---|---|
| Spacebar | Jump / Start / Restart |
| Up Arrow | Jump / Start / Restart |
| Click (game area) | Jump / Start / Restart |
| Click (restart button) | Restart game |

## Technical Constraints

- Pure HTML/CSS/JS — no frameworks or build tools
- Runs in any modern browser
- All assets are local (images in `./images/`)
- Single-page application

## Goals

1. Provide a fun, polished, and replayable endless runner experience
2. Keep the codebase simple and accessible for open source contributions
3. Add personality through meme integration
4. Ensure smooth performance with `requestAnimationFrame`-based game loop