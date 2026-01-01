# Asiye'nin Çalışma Planlayıcısı 🎯

**Premium iOS PWA for Deep Work** - A specialized, minimalist study application designed for focused learning sessions.

## Core Philosophy

**Minimalism over complexity. Action over analysis.**

This app has ONE goal: To get Asiye into "Deep Work" mode immediately, based on her shifting schedule. No complex dashboards, no overwhelming analytics—just pure focus.

## Features

### 🎯 Smart Concierge Home Screen
- **Context-aware greetings** that adapt to time of day and shift schedule
- **"One Thing" Focus** - Large, prominent display of the current active task
- Other tasks shown smaller below for context
- Automatic task generation based on shift type

### ⚡ Intelligent Shift Logic
- **Off Day**: 2 Math Blocks + 1 Science + 1 Paragraph Routine
- **Morning Shift (Evening Study)**: 1 Social Study + 1 Paragraph Routine
- **Afternoon Shift (Morning Study)**: 1 Math Block + 1 Paragraph Routine
- **Auto-Repair**: Incomplete tasks automatically move to backlog (no red error marks)

### 🧘 Focus Sanctuary
- **Full-screen study mode** - Distraction-free environment
- **Pomodoro Timer** - 25-minute focused sessions
- **Ambient Sound Mixer** - Rain, Cafe Noise, White Noise
- **Satisfying Completion** - Checkmark animations + haptic feedback

### 🧠 Smart Feedback Loop (SRS)
After completing a task:
- **"Zorlandım"** - Flags topic for review, automatically adds to next week
- **"Rahattı"** - Marks as mastered, moves to next curriculum topic

### 💾 Data Management
- **JSON Backup/Restore** - Export and import all data
- **LocalStorage Persistence** - All data saved locally
- **Auto-sync** - Seamless state management with Zustand

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Glassmorphism effects
- **State**: Zustand + LocalStorage persistence
- **Motion**: Framer Motion (satisfying micro-interactions)
- **Audio**: Howler.js (ambient focus sounds)

## Design System

- **Theme**: "Calm Focus" - Off-white backgrounds, large typography, soft shadows
- **Glassmorphism**: Frosted glass effects for cards
- **Micro-interactions**: Buttons scale on press, satisfying animations
- **iOS Native Feel**: Disabled user-select, hidden scrollbars, Safe Area support

## Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Sound Files Setup

The app expects ambient sound files in `/public/sounds/`:
- `rain.mp3` - Rain sounds
- `cafe.mp3` - Cafe ambiance
- `white-noise.mp3` - White noise

If these files don't exist, the app will work without sounds (gracefully handles missing files).

## Usage

1. **Set Your Shift**: Go to Settings and select today's shift type
2. **Generate Schedule**: Click "Programı Oluştur" to create tasks
3. **Start Focus**: Tap on a task to enter Focus Sanctuary
4. **Complete & Feedback**: After completion, provide feedback (Hard/Easy)
5. **Backup Data**: Export your data regularly from Settings

## License

Personal use only.
