'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useStudyStore } from '@/lib/store';
import { Howl } from 'howler';
import { FeedbackModal } from './FeedbackModal';

const POMODORO_TIME = 25 * 60; // 25 minutes in seconds

const AMBIENT_SOUNDS = {
  rain: '/sounds/rain.mp3', // Placeholder - you'll need to add actual sound files
  cafe: '/sounds/cafe.mp3',
  white: '/sounds/white-noise.mp3',
};

export function FocusSanctuary() {
  const { activeTaskId, tasks, completeTask, startFocus } = useStudyStore();
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const task = tasks.find((t) => t.id === activeTaskId);

  // Reset state when task changes
  useEffect(() => {
    if (activeTaskId) {
      setTimeLeft(POMODORO_TIME);
      setIsRunning(false);
      setShowFeedback(false);
      setHasCompleted(false);
    }
  }, [activeTaskId]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (!hasCompleted) {
              setHasCompleted(true);
              handleTimerComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, hasCompleted]);

  // Sound management
  useEffect(() => {
    if (currentSound && soundPlaying) {
      // In a real app, you'd load actual sound files
      // For now, we'll just simulate with a placeholder
      soundRef.current = new Howl({
        src: [AMBIENT_SOUNDS[currentSound as keyof typeof AMBIENT_SOUNDS] || '/sounds/white-noise.mp3'],
        loop: true,
        volume: 0.3,
        html5: true,
      });
      
      soundRef.current.play().catch(() => {
        // Sound file might not exist, that's okay
        console.log('Sound file not found, skipping ambient sound');
      });
    } else {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current = null;
      }
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, [currentSound, soundPlaying]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    setShowFeedback(true);
  };

  const handleComplete = () => {
    setIsRunning(false);
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
    if (!hasCompleted) {
      setHasCompleted(true);
      setShowFeedback(true);
    }
  };

  const handleFeedbackComplete = (difficulty: 'hard' | 'easy') => {
    if (task) {
      completeTask(task.id, difficulty);
    }
    setShowFeedback(false);
    startFocus(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!activeTaskId || !task) return null;

  return (
    <AnimatePresence>
      {activeTaskId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 safe-top safe-bottom"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 glass-dark">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsRunning(false);
                  startFocus(null);
                }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <X size={20} className="text-white" />
              </motion.button>
              
              <div className="text-center">
                <h3 className="text-white font-semibold">{task.topic}</h3>
                <p className="text-xs text-gray-300">{task.type}</p>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleComplete}
                className="w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <Check size={20} className="text-green-400" />
              </motion.button>
            </div>

            {/* Timer */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    scale: isRunning ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    repeat: isRunning ? Infinity : 0,
                    duration: 2,
                  }}
                  className="text-8xl font-bold text-white mb-6 tracking-tight"
                >
                  {formatTime(timeLeft)}
                </motion.div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRunning(!isRunning)}
                  className="glass px-8 py-4 rounded-full text-white font-semibold flex items-center gap-3 mx-auto"
                >
                  {isRunning ? (
                    <>
                      <Pause size={24} />
                      <span>Duraklat</span>
                    </>
                  ) : (
                    <>
                      <Play size={24} />
                      <span>Başlat</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Ambient Sound Controls */}
            <div className="p-6 glass-dark">
              <div className="flex items-center justify-center gap-4">
                {Object.keys(AMBIENT_SOUNDS).map((sound) => (
                  <motion.button
                    key={sound}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (currentSound === sound && soundPlaying) {
                        setSoundPlaying(false);
                      } else {
                        setCurrentSound(sound);
                        setSoundPlaying(true);
                      }
                    }}
                    className={`glass px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 ${
                      currentSound === sound && soundPlaying
                        ? 'ring-2 ring-white'
                        : ''
                    }`}
                  >
                    {currentSound === sound && soundPlaying ? (
                      <Volume2 size={16} />
                    ) : (
                      <VolumeX size={16} />
                    )}
                    <span className="capitalize">{sound}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Completion Animation */}
          <AnimatePresence>
            {showFeedback && (
              <FeedbackModal
                task={task}
                onComplete={handleFeedbackComplete}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

