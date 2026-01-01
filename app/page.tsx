'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Settings as SettingsIcon } from 'lucide-react';
import { SmartConcierge } from '@/components/SmartConcierge';
import { FocusSanctuary } from '@/components/FocusSanctuary';
import { Settings } from '@/components/Settings';
import { useStudyStore } from '@/lib/store';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'settings'>('home');
  const { activeTaskId, generateTasks, todayShift } = useStudyStore();

  // Auto-generate tasks on mount if shift is set but no tasks exist
  useEffect(() => {
    const tasks = useStudyStore.getState().tasks;
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter((t) => t.scheduledFor === today);
    
    if (todayShift && todayTasks.length === 0) {
      generateTasks();
    }
  }, [todayShift, generateTasks]);

  return (
    <div className="min-h-screen bg-white safe-bottom">
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <SmartConcierge />
          </motion.div>
        )}
        
        {currentView === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Settings />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus Sanctuary (Full-screen overlay) */}
      <FocusSanctuary />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-pink-200/50 safe-bottom z-40">
        <div className="flex items-center justify-around h-16 px-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === 'home' ? 'text-pink-600' : 'text-gray-400'
            }`}
          >
            <Home size={24} className={currentView === 'home' ? 'stroke-[2.5]' : ''} />
            <span className="text-xs mt-1 font-medium">Ana Sayfa</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentView('settings')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === 'settings' ? 'text-pink-600' : 'text-gray-400'
            }`}
          >
            <SettingsIcon size={24} className={currentView === 'settings' ? 'stroke-[2.5]' : ''} />
            <span className="text-xs mt-1 font-medium">Ayarlar</span>
          </motion.button>
        </div>
      </nav>
    </div>
  );
}
