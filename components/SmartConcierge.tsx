'use client';

import { useStudyStore, Task } from '@/lib/store';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale/tr';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

export function SmartConcierge() {
  const todayDate = new Date();
  const hour = todayDate.getHours();
  const { todayShift, tasks, generateTasks, setTodayShift } = useStudyStore();
  
  const today = todayDate.toISOString().split('T')[0];
  const todayTasks = tasks.filter((t) => 
    t.scheduledFor === today && t.status !== 'completed'
  );

  // Context-aware greeting
  const getGreeting = () => {
    if (hour >= 5 && hour < 12) {
      if (todayShift === 'off') {
        return {
          main: "Günaydın Asiye.",
          sub: "Bugün tüm gün senin. En zor konuları şimdi halledelim.",
        };
      } else if (todayShift === 'afternoon') {
        return {
          main: "Sabahın erken saatleri.",
          sub: "İş öncesi odaklanmak için mükemmel bir zaman.",
        };
      }
    } else if (hour >= 12 && hour < 18) {
      if (todayShift === 'afternoon') {
        return {
          main: "İş öncesi harika çalıştın.",
          sub: "Şimdi gitme vakti. Bugün yaptıklarınla gurur duyabilirsin.",
        };
      }
    } else if (hour >= 18 && hour < 23) {
      if (todayShift === 'morning') {
        return {
          main: "Yorucu bir gündü.",
          sub: "Sadece hafif bir tekrar yapıp kapatalım.",
        };
      } else if (todayShift === 'off') {
        return {
          main: "Akşamın derinliklerinde.",
          sub: "Belki yarın için hazırlık yapmak? Ya da dinlenmek?",
        };
      }
    }
    return {
      main: "Merhaba Asiye.",
      sub: "Hadi bugünün hedeflerine odaklanalım.",
    };
  };

  const greeting = getGreeting();
  const activeTask = todayTasks[0];

  return (
    <div className="px-6 pt-8 pb-4 safe-top">
      {/* Time & Shift Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span className="text-sm font-medium">
            {format(today, "EEEE, d MMMM", { locale: tr })}
          </span>
        </div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="glass px-3 py-1.5 rounded-full text-xs font-medium"
        >
          {todayShift === 'off' && 'İzinli'}
          {todayShift === 'morning' && 'Sabahçı'}
          {todayShift === 'afternoon' && 'Öğlenci'}
        </motion.div>
      </motion.div>

      {/* Context-Aware Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold mb-3 text-gray-900 leading-tight">
          {greeting.main}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {greeting.sub}
        </p>
      </motion.div>

      {/* The "One Thing" Focus */}
      {activeTask ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-pink-500" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Şimdi Odaklan
            </span>
          </div>
          
          <TaskCard task={activeTask} isActive />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-glass p-8 text-center mb-8"
        >
          <p className="text-gray-600 mb-4">
            Bugün için görev yok.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={generateTasks}
            className="px-6 py-3 bg-pink-500 text-white rounded-ios font-medium"
          >
            Programı Oluştur
          </motion.button>
        </motion.div>
      )}

      {/* Other Tasks (Smaller) */}
      {todayTasks.length > 1 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Sonraki Görevler
          </h3>
          {todayTasks.slice(1).map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, isActive = false }: { task: Task; isActive?: boolean }) {
  const { startFocus } = useStudyStore();
  
  const subjectColors = {
    math: 'from-pink-400 to-pink-500',
    turkish: 'from-pink-500 to-pink-600',
    science: 'from-pink-300 to-pink-400',
    social: 'from-pink-400 to-pink-500',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => startFocus(task.id)}
      className={`w-full glass rounded-glass p-6 text-left ${
        isActive ? 'ring-2 ring-pink-300' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${
            subjectColors[task.subject]
          }`}
        >
          {task.subject === 'math' && 'Matematik'}
          {task.subject === 'turkish' && 'Türkçe'}
          {task.subject === 'science' && 'Fen'}
          {task.subject === 'social' && 'Sosyal'}
        </span>
        {task.difficulty === 'hard' && (
          <span className="text-xs text-gray-500">Zor</span>
        )}
      </div>
      
      <h3 className={`font-bold mb-1 ${isActive ? 'text-2xl' : 'text-lg'} text-gray-900`}>
        {task.topic}
      </h3>
      <p className="text-sm text-gray-600">{task.type}</p>
    </motion.button>
  );
}

