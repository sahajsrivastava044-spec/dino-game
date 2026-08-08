# 🦖 Dino Runner Academy

An upgraded, high-performance HTML5 arcade runner game featuring modern **physics-based jumping kinetics**, a **state-driven sprite animation engine**, **pixel-accurate hitbox insets**, and a **dynamic meme popup manager** that feeds you motivational and hilarious memes as you rack up high scores!

---

## 🚀 Tech Stack

The project is built entirely on a lightweight, modern, native web tech stack with zero compile steps, making it incredibly fast and easy to run locally:

*   **Structure:** HTML5 (Semantic elements & clear DOM hooks).
*   **Aesthetics (CSS3):** 
    *   Geometric typography using *Outfit* via Google Fonts.
    *   Sleek linear gradients and neon indicator glows.
    *   Modern **Glassmorphism** overlays (`backdrop-filter` blur backdrops) for HUD and menu interfaces.
    *   Horizontal scrolling parallax backgrounds.
    *   Transparent blending mechanics (`mix-blend-mode: multiply`) to seamlessly embed obstacle GIF borders.
*   **Game Engine (JavaScript ES6+):** 
    *   **Unified Loop:** Driven by `requestAnimationFrame` for super-smooth 60+ FPS renders.
    *   **Kinetics Engine:** Kinematic parabolic jumping physics using mathematical gravity acceleration and jump-velocity equations.
    *   **Animation State Machine:** Manages cycles for `IDLE`, `RUNNING`, `JUMPING`, and `DEAD` states, dynamically accelerating leg speeds to sync with the ground movement as velocity scales.
    *   **Data Persistence:** Uses the browser's `localStorage` API to save and display your all-time **High Score** across sessions.

---

## 📂 Project Structure

Here is an overview of the files and folders included in this repository:

```bash
dino-game/
├── index.html          # Web page structure, HUD overlays, and canvas sections
├── style.css           # Custom stylesheets, glassmorphic themes, keycaps, and keyframes
├── script.js          # Physics engine, loops, collision detection, and meme controls
└── images/             # Visual resources & graphic assets
    ├── background.png  # Parallax horizontal landscape image
    ├── obstacle.gif    # Animated purple dinosaur obstacle sprite
    ├── png/            # Subfolder of Dino sprite frame sequences
    │   ├── Idle (1-10).png
    │   ├── Run (1-8).png
    │   ├── Jump (1-12).png
    │   └── Dead (1-8).png
    ├── meme/           # 8 unique gameplay GIFs displayed after Level 5
    └── sad-meme/       # 4 custom failure GIFs displayed on crash
```

---

## 🎮 Gameplay Features

*   **Parabolic Jumps:** Snappy, physics-based jumping following a true parabolic curve.
*   **Clean Hitboxes:** The collision engine shrinks the bounding boxes around sprites, filtering out transparent space so close-call jumps feel satisfyingly fair.
*   **Parallax Environment:** The background scrolls continuously in real-time proportional to the run speed and stops instantly on impact.
*   **Level Difficulties:** Speed scales up by `+1.5` every 100 points, boosting the obstacle pace and the Dino's leg animation rate.
*   **Continuous Memes (Level >= 5):** Once you hit Level 5, the game continuously rotates funny memes in the popup tray with random durations (between 3.5 and 8 seconds) and non-repeating random order.
*   **Reactionary Death Meme:** Shows a random sad failure meme immediately upon crashing.

---

## 💻 How to Run the Game Locally

Since the game is not yet deployed to a web server, you can launch and play it locally on your computer. Here are three simple, step-by-step methods to open the project:

### Method 1: Double-Click (Easiest & Fastest)
1.  Open the `dino-game` folder on your computer's Desktop/File Explorer.
2.  Locate the [index.html](index.html) file.
3.  Double-click [index.html](index.html) (or right-click -> Open With) and select any web browser (Chrome, Edge, Firefox, or Safari).
4.  The game will load instantly. Press **Spacebar** to play!

---

### Method 2: VS Code "Live Server" (Recommended for Developers)
If you have **Visual Studio Code** installed:
1.  Open the `dino-game` directory inside VS Code.
2.  Install the **Live Server** extension (by Ritwick Dey) from the extensions tab (`Ctrl+Shift+X`).
3.  Open [index.html](index.html) in the editor.
4.  Click the **"Go Live"** button in the status bar at the bottom-right of the window, or right-click [index.html](index.html) and select **Open with Live Server**.
5.  A new browser tab will launch automatically pointing to `http://127.0.0.1:5500/index.html`.

---

### Method 3: Command Line Node.js Server (Professional & Lightweight)
If you have **Node.js** installed on your computer, you can spin up a lightweight local server in seconds:

1.  Open your Terminal (macOS/Linux) or PowerShell/Command Prompt (Windows).
2.  Navigate to your folder:
    ```bash
    cd "C:\Users\<file_location>\dino-game"
    ```
3.  Run either of these command tools (no installation required!):
    ```bash
    # Option A (using http-server)
    npx http-server ./
    
    # Option B (using serve)
    npx serve ./
    ```
4.  Copy the URL printed in the terminal (usually `http://localhost:8080` or `http://localhost:3000`) and paste it into your browser's address bar.

---

## 🕹️ Controls

*   **Jump / Start / Restart:** Press <kbd>Spacebar</kbd>, <kbd>▲ Up Arrow</kbd>, or click/tap anywhere inside the **Game Window**.
*   **Pause:** Simply click outside the game window or hit the browser tab settings.
