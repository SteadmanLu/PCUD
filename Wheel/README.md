# Steadzy's Wheel - Interactive Decision Spinner


## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Customizable Wheel](#customizable-wheel)
  - [Interactive Spinning](#interactive-spinning)
  - [Visual Effects](#visual-effects)
  - [Statistics Tracking](#statistics-tracking)
  - [Settings & Controls](#settings--controls)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
  - [Core Architecture](#core-architecture)
  - [Key Methods](#key-methods)
  - [Animation System](#animation-system)
- [Visual Design](#visual-design)
  - [Color Palette](#color-palette)
  - [Layout Components](#layout-components)
- [Getting Started](#getting-started)
  - [Quick Start](#quick-start)
  - [Adding Custom Choices](#adding-custom-choices)
  - [Customizing Settings](#customizing-settings)
- [Usage Examples](#usage-examples)
  - [Example 1: Team Picker](#example-1:-team-picker)
  - [Example 2: Restaurant Decider](#example-2:-restaurant-decider)
  - [Example 3: Raffle Winner](#example-3:-raffle-winner)
- [Statistics Features](#statistics-features)
  - [What's Tracked](#whats-tracked)
  - [Data Persistence](#data-persistence)
- [Advanced Features](#advanced-features)
  - [Weighted Probability System](#weighted-probability-system)
  - [Physics Simulation](#physics-simulation)
- [Learning Objectives](#learning-objectives)
- [Future Enhancements](#future-enhancements)
  - [Planned Features](#planned-features)
  - [Advanced Ideas](#advanced-ideas)
- [Known Issues & Limitations](#known-issues--limitations)
- [C++ Implementation](#c++-implementation)
- [Browser Compatibility](#browser-compatibility)
- [Customization Guide](#customization-guide)
  - [Change Colors](#change-colors)
  - [Adjust Wheel Size](#adjust-wheel-size)
  - [Customize Spin Physics](#customize-spin-physics)
- [Notes](#notes)

A feature-rich spinning wheel application with customizable options, weighted probabilities, confetti effects, and detailed statistics tracking. Perfect for making random selections, team assignments, or just having fun with friends!

##  Overview

Steadzy's Wheel is a browser-based spinning wheel that goes beyond simple random selection. With weighted probabilities, win tracking, beautiful animations, and persistent statistics, it's the ultimate decision-making tool wrapped in an engaging visual package.

##  Key Features

### Customizable Wheel
- **Default Choices:** Pre-loaded with 6 participants (Arran, Jaiden, Colin, Lucas, Max, Anton)
- **Add Custom Choices:** Create your own options with custom names
- **Weighted Probabilities:** Assign different weights to make some outcomes more likely
- **Dynamic Colors:** 8 vibrant colors cycle through choices
- **Smooth Animations:** Professional spin animations with easing

### Interactive Spinning
- **Realistic Physics:** Spin duration configurable (default 5 seconds)
- **Smooth Rotation:** CSS transitions for fluid motion
- **Random Outcomes:** Weighted random selection algorithm
- **Spin Lock:** Prevents multiple simultaneous spins

### Visual Effects
- **Confetti Explosion:** Celebration animation when wheel lands (toggleable)
- **Color Coding:** Each choice has a distinct color
- **Center Circle:** Clean design with white center hub
- **Pointer Indicator:** Fixed arrow shows winning selection

### Statistics Tracking
- **Win Counter:** Tracks how many times each option has won
- **Total Spins:** Monitors overall usage
- **Last Winner:** Displays most recent result
- **Persistent Storage:** Statistics saved across sessions

### Settings & Controls
- **Confetti Toggle:** Enable/disable celebration effects
- **Spin Duration:** Adjust animation length
- **Reset Statistics:** Clear all win counts
- **Responsive Controls:** Clean, intuitive interface

##  Technologies

- **HTML5** - Canvas element for wheel rendering
- **CSS3** - Modern animations and responsive design
- **JavaScript (ES6+)** - Object-oriented wheel logic
- **Canvas API** - Custom graphics rendering
- **CSS Animations** - Smooth spin transitions

##  Project Structure

```
Wheel/
 wheel.html          # Main application page
 wheel.js            # Core wheel logic (522 lines)
 wheel.css           # Styling and animations
 wheel.cpp           # C++ implementation (bonus)
 wheel               # Compiled C++ binary
 wheel.out           # Output file
 gmon.out           # Profiling data
```

##  How It Works

### Core Architecture

**Class Structure:**
```javascript
class SteadzysWheel {
    constructor() {
        this.choices = [];        // Array of choice names
        this.weights = [];        // Corresponding weights
        this.wins = {};          // Win count per choice
        this.currentRotation = 0; // Track wheel rotation
        this.isSpinning = false; // Prevent double-spins
    }
}
```

### Key Methods

**Drawing the Wheel:**
```javascript
drawWheel(canvas, rotation = 0) {
    // Calculate slice angles based on weights
    const sliceAngle = (weight / totalWeight) * 2 * Math.PI;
    
    // Draw each slice with color and label
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillText(choiceName, radius - 20, 5);
}
```

**Spin Algorithm:**
```javascript
spin() {
    // Generate weighted random winner
    const winner = this.weightedRandom();
    
    // Calculate rotation to land on winner
    const targetRotation = this.calculateRotation(winner);
    
    // Animate spin with easing
    this.animateSpin(targetRotation);
    
    // Update statistics
    this.recordWin(winner);
}
```

**Weighted Selection:**
```javascript
weightedRandom() {
    const totalWeight = this.weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < this.choices.length; i++) {
        random -= this.weights[i];
        if (random <= 0) return this.choices[i];
    }
}
```

### Animation System

**Spin Animation:**
- Uses CSS transitions for smooth rotation
- Applies easing function for realistic deceleration
- Adds extra full rotations for dramatic effect
- Locks wheel during animation
- Triggers confetti on completion

**Confetti Effect:**
- Canvas-based particle system
- Randomized colors and trajectories
- Gravity and velocity physics
- Auto-cleanup after animation

##  Visual Design

### Color Palette
```javascript
colors = [
    '#ff6b6b',  // Coral Red
    '#4ecdc4',  // Turquoise
    '#45b7d1',  // Sky Blue
    '#96ceb4',  // Mint Green
    '#feca57',  // Sunny Yellow
    '#ff9ff3',  // Pink
    '#54a0ff',  // Bright Blue
    '#5f27cd'   // Purple
]
```

### Layout Components
- **Canvas Wheel:** 500x500px spinning graphic
- **Control Panel:** Settings and statistics
- **Button Bar:** Spin, Add Choice, Reset
- **Info Display:** Last winner and total spins

##  Getting Started

### Quick Start

1. **Open in Browser:**
   ```bash
   # Simply open wheel.html in any modern browser
   # Or serve locally:
   python -m http.server 8000
   # Navigate to http://localhost:8000/wheel.html
   ```

2. **Start Spinning:**
   - Click "SPIN THE WHEEL" to make a selection
   - View the winner in the results display
   - Check statistics to see win counts

### Adding Custom Choices

1. Click "Add Choice" button
2. Enter choice name (e.g., "Pizza")
3. Enter weight (1-10, higher = more likely)
4. Click confirm
5. Wheel automatically updates

### Customizing Settings

**Adjust Spin Duration:**
```javascript
// In settings panel or code
this.settings.spinDuration = 5; // seconds
```

**Toggle Confetti:**
```javascript
// Use checkbox in settings
this.settings.confettiEnabled = true/false;
```

##  Usage Examples

### Example 1: Team Picker
```
Choices: ["Team A", "Team B", "Team C", "Team D"]
Weights: [1, 1, 1, 1]  // Equal probability
Use Case: Fair team assignment
```

### Example 2: Restaurant Decider
```
Choices: ["Pizza", "Sushi", "Burgers", "Thai"]
Weights: [2, 3, 1, 2]  // Sushi slightly more likely
Use Case: Group dinner decision
```

### Example 3: Raffle Winner
```
Choices: ["Alice", "Bob", "Carol", "Dave"]
Weights: [1, 1, 1, 1]  // Fair raffle
Track: Win counts prevent repeats
```

##  Statistics Features

### What's Tracked
- **Individual Wins:** Count per choice
- **Total Spins:** Lifetime usage
- **Last Winner:** Most recent result
- **Win Percentages:** Can be calculated from data

### Data Persistence
```javascript
// Statistics stored in memory during session
// Can be exported or saved to localStorage
saveStatistics() {
    localStorage.setItem('wheelStats', JSON.stringify(this.wins));
}
```

##  Advanced Features

### Weighted Probability System

Weights affect selection probability:
- **Weight 1:** Standard probability
- **Weight 2:** 2x more likely
- **Weight 5:** 5x more likely

**Example:**
```
Choice A: Weight 1 (11% chance)
Choice B: Weight 2 (22% chance)
Choice C: Weight 3 (33% chance)
Choice D: Weight 3 (33% chance)
Total Weight: 9
```

### Physics Simulation

The wheel uses realistic physics:
- **Acceleration:** Initial spin speed
- **Deceleration:** Gradual slowdown
- **Easing Function:** Cubic ease-out
- **Rotation:** Cumulative angle tracking

##  Learning Objectives

This project demonstrates:
- **Canvas API:** Custom graphics rendering
- **Animation:** CSS transitions and JavaScript timing
- **Object-Oriented Programming:** Class-based architecture
- **Event Handling:** User interaction management
- **State Management:** Tracking wheel state and statistics
- **Algorithm Design:** Weighted random selection
- **UI/UX Design:** Intuitive controls and feedback

##  Future Enhancements

### Planned Features
- [ ] Save/load wheel configurations
- [ ] Export statistics as CSV
- [ ] Multiple wheel presets
- [ ] Sound effects
- [ ] Mobile touch controls
- [ ] Full-screen mode
- [ ] Custom color schemes
- [ ] History of all spins
- [ ] Undo last spin
- [ ] Multiple winner selection

### Advanced Ideas
- [ ] API for programmatic control
- [ ] Share wheel configurations
- [ ] Embed in other websites
- [ ] Tournament bracket mode
- [ ] Timer-based spins
- [ ] Voice announcements

##  Known Issues & Limitations

- Statistics reset on page reload (no localStorage yet)
- Canvas size fixed at 500x500px
- Maximum ~20 choices for readable labels
- No mobile gesture controls
- Confetti performance may vary on older devices

##  C++ Implementation

Bonus C++ version included:
```bash
# Compile
g++ wheel.cpp -o wheel

# Run
./wheel

# Profile
gprof wheel gmon.out
```

The C++ version provides:
- Command-line interface
- Same weighted selection algorithm
- Text-based output
- Performance profiling

##  Browser Compatibility

Tested and working on:
-  Chrome 90+
-  Firefox 88+
-  Safari 14+
-  Edge 90+

Requires:
- Canvas API support
- ES6+ JavaScript
- CSS transitions

##  Customization Guide

### Change Colors
Edit the `colors` array in wheel.js:
```javascript
this.colors = ['#yourColor1', '#yourColor2', ...];
```

### Adjust Wheel Size
Modify canvas dimensions in HTML:
```html
<canvas id="wheel-canvas" width="600" height="600"></canvas>
```

### Customize Spin Physics
Edit animation parameters:
```javascript
const spinDuration = 5000; // milliseconds
const extraSpins = 3;      // full rotations
const easing = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
```

##  Notes

Created as a fun project to explore Canvas API and animation techniques. Perfect for game nights, team activities, or whenever you need to make a decision but want to add some excitement!

The weighted probability system makes it versatile for scenarios where some outcomes should be more likely than others, while the statistics tracking adds a competitive element.

---

**Steadzy's Wheel** - Let fate decide! 

*A personal project by Lucas Steadman*