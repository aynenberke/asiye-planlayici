'use client';

import { motion } from 'framer-motion';
import { Task } from '@/lib/store';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  task: Task;
  onComplete: (difficulty: 'hard' | 'easy') => void;
}

export function FeedbackModal({ task, onComplete }: FeedbackModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onComplete('easy'); // Default to easy if dismissed
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass rounded-glass p-8 max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} className="text-pink-600" />
        </motion.div>

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Harika İş!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          <strong>{task.topic}</strong> konusunu tamamladın. Nasıl hissettin?
        </p>

        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete('hard')}
            className="w-full glass rounded-ios p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle className="text-orange-600" size={24} />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Zorlandım</div>
              <div className="text-sm text-gray-600">
                Bu konuyu tekrar gözden geçirmek istiyorum
              </div>
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete('easy')}
            className="w-full glass rounded-ios p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Rahattı</div>
              <div className="text-sm text-gray-600">
                Anladım, bir sonraki konuya geçebilirim
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

