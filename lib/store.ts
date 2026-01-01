import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ShiftType = 'off' | 'morning' | 'afternoon';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'needs_review';
export type Difficulty = 'hard' | 'medium' | 'easy';
export type Subject = 'math' | 'turkish' | 'science' | 'social';

export interface Task {
  id: string;
  topic: string;
  subject: Subject;
  type: string; // 'Paragraf', 'Problemler', 'Yeni Konu', etc.
  difficulty: Difficulty;
  status: TaskStatus;
  scheduledFor: string; // YYYY-MM-DD
  completedAt?: string;
  needsReview?: boolean;
  reviewCount?: number;
}

export interface DailyShift {
  date: string; // YYYY-MM-DD
  shift: ShiftType;
}

interface StudyState {
  // Current state
  currentDate: string;
  todayShift: ShiftType;
  tasks: Task[];
  backlog: Task[]; // Incomplete tasks from past days
  
  // Active focus session
  activeTaskId: string | null;
  focusStartTime: number | null;
  
  // Settings
  dailyShiftSchedule: DailyShift[];
  
  // Actions
  setTodayShift: (shift: ShiftType) => void;
  setShiftForDate: (date: string, shift: ShiftType) => void;
  generateTasks: () => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  startFocus: (taskId: string) => void;
  completeTask: (taskId: string, difficulty: 'hard' | 'easy') => void;
  moveToBacklog: (taskId: string) => void;
  exportData: () => string;
  importData: (json: string) => void;
  clearAll: () => void;
}

const CURRICULUM: Omit<Task, 'id' | 'status' | 'scheduledFor'>[] = [
  // Math - Problems (Daily)
  { topic: 'Problemler', subject: 'math', type: 'Problemler', difficulty: 'hard' },
  
  // Math - New Topics
  { topic: 'Sayılar ve İşlemler', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { topic: 'Üslü Sayılar', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { topic: 'Köklü Sayılar', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { topic: 'Mutlak Değer', subject: 'math', type: 'Yeni Konu', difficulty: 'medium' },
  { topic: 'Çarpanlara Ayırma', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { topic: 'Denklemler', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { topic: 'Eşitsizlikler', subject: 'math', type: 'Yeni Konu', difficulty: 'medium' },
  { topic: 'Fonksiyonlar', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { topic: 'Trigonometri', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { topic: 'Logaritma', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  
  // Turkish
  { topic: 'Paragraf', subject: 'turkish', type: 'Paragraf', difficulty: 'medium' },
  { topic: 'Dil Bilgisi', subject: 'turkish', type: 'Dil Bilgisi', difficulty: 'medium' },
  
  // Science
  { topic: 'Optik (Fizik)', subject: 'science', type: 'Fizik', difficulty: 'hard' },
  { topic: 'Madde (Kimya)', subject: 'science', type: 'Kimya', difficulty: 'medium' },
  { topic: 'Hücre (Biyoloji)', subject: 'science', type: 'Biyoloji', difficulty: 'medium' },
  
  // Social
  { topic: 'Osmanlı Tarihi', subject: 'social', type: 'Tarih', difficulty: 'easy' },
  { topic: 'Cumhuriyet Tarihi', subject: 'social', type: 'Tarih', difficulty: 'easy' },
  { topic: 'Türkiye Coğrafyası', subject: 'social', type: 'Coğrafya', difficulty: 'easy' },
  { topic: 'Dünya Coğrafyası', subject: 'social', type: 'Coğrafya', difficulty: 'easy' },
];

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function generateTasksForShift(
  shift: ShiftType,
  date: string,
  backlog: Task[]
): Task[] {
  const tasks: Task[] = [];
  
  if (shift === 'off') {
    // Off Day: 2 Math Blocks + 1 Science + 1 Paragraph
    const mathTopics = CURRICULUM.filter(t => t.subject === 'math' && t.type === 'Yeni Konu');
    const scienceTopics = CURRICULUM.filter(t => t.subject === 'science');
    const paragraphTopic = CURRICULUM.find(t => t.type === 'Paragraf');
    
    // Add backlog items first
    backlog.forEach(task => {
      tasks.push({
        ...task,
        id: `${task.id}-retry-${Date.now()}`,
        scheduledFor: date,
        status: 'pending',
      });
    });
    
    // Add 2 math topics
    mathTopics.slice(0, 2).forEach((topic, idx) => {
      tasks.push({
        ...topic,
        id: `task-${date}-math-${idx}-${Date.now()}`,
        status: 'pending',
        scheduledFor: date,
      });
    });
    
    // Add 1 science
    if (scienceTopics.length > 0) {
      const science = scienceTopics[0];
      tasks.push({
        ...science,
        id: `task-${date}-science-${Date.now()}`,
        status: 'pending',
        scheduledFor: date,
      });
    }
    
    // Add paragraph (daily)
    if (paragraphTopic) {
      tasks.push({
        ...paragraphTopic,
        id: `task-${date}-paragraph-${Date.now()}`,
        status: 'pending',
        scheduledFor: date,
      });
    }
  } else if (shift === 'morning') {
    // Morning Shift (Evening study): 1 Social + 1 Paragraph
    const socialTopics = CURRICULUM.filter(t => t.subject === 'social');
    const paragraphTopic = CURRICULUM.find(t => t.type === 'Paragraf');
    
    if (socialTopics.length > 0) {
      tasks.push({
        ...socialTopics[0],
        id: `task-${date}-social-${Date.now()}`,
        status: 'pending',
        scheduledFor: date,
      });
    }
    
    if (paragraphTopic) {
      tasks.push({
        ...paragraphTopic,
        id: `task-${date}-paragraph-${Date.now()}`,
        status: 'pending',
        scheduledFor: date,
      });
    }
  } else if (shift === 'afternoon') {
    // Afternoon Shift (Morning study): 1 Math Block + 1 Paragraph
    const problemTopic = CURRICULUM.find(t => t.type === 'Problemler');
    const paragraphTopic = CURRICULUM.find(t => t.type === 'Paragraf');
    
    if (problemTopic) {
      tasks.push({
        ...problemTopic,
        id: `task-${date}-problems-${Date.now()}`,
        status: 'pending',
        scheduledFor: date,
      });
    }
    
    if (paragraphTopic) {
      tasks.push({
        ...paragraphTopic,
        id: `task-${date}-paragraph-${Date.now()}`,
        status: 'pending',
        scheduledFor: date,
      });
    }
  }
  
  return tasks;
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      currentDate: getTodayDate(),
      todayShift: 'off',
      tasks: [],
      backlog: [],
      activeTaskId: null,
      focusStartTime: null,
      dailyShiftSchedule: [],

      setTodayShift: (shift) => {
        const today = getTodayDate();
        set((state) => ({
          todayShift: shift,
          dailyShiftSchedule: [
            ...state.dailyShiftSchedule.filter((s) => s.date !== today),
            { date: today, shift },
          ],
        }));
      },

      setShiftForDate: (date, shift) => {
        set((state) => ({
          dailyShiftSchedule: [
            ...state.dailyShiftSchedule.filter((s) => s.date !== date),
            { date, shift },
          ],
        }));
      },

      generateTasks: () => {
        const state = get();
        const today = getTodayDate();
        const shift = state.todayShift;
        
        // Remove old tasks for today
        const existingTasks = state.tasks.filter((t) => t.scheduledFor !== today);
        
        // Move incomplete past tasks to backlog
        const pastIncomplete = state.tasks.filter(
          (t) => t.scheduledFor < today && t.status !== 'completed'
        );
        
        // Generate new tasks
        const newTasks = generateTasksForShift(shift, today, [...state.backlog, ...pastIncomplete]);
        
        set({
          tasks: [...existingTasks, ...newTasks],
          backlog: [],
        });
      },

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}-${Math.random()}`,
          status: 'pending',
          scheduledFor: taskData.scheduledFor || getTodayDate(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      startFocus: (taskId: string | null) => {
        set({
          activeTaskId: taskId,
          focusStartTime: taskId ? Date.now() : null,
        });
      },

      completeTask: (taskId, difficulty) => {
        const task = get().tasks.find((t) => t.id === taskId);
        if (!task) return;

        const updates: Partial<Task> = {
          status: 'completed',
          completedAt: new Date().toISOString(),
        };

        if (difficulty === 'hard') {
          // Schedule for review next week
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          updates.needsReview = true;
          updates.reviewCount = (task.reviewCount || 0) + 1;
        }

        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, ...updates } : t
          ),
          activeTaskId: null,
          focusStartTime: null,
        }));
      },

      moveToBacklog: (taskId) => {
        const task = get().tasks.find((t) => t.id === taskId);
        if (task) {
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== taskId),
            backlog: [...state.backlog, { ...task, status: 'pending' }],
          }));
        }
      },

      exportData: () => {
        const state = get();
        return JSON.stringify(
          {
            tasks: state.tasks,
            backlog: state.backlog,
            dailyShiftSchedule: state.dailyShiftSchedule,
          },
          null,
          2
        );
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json);
          set({
            tasks: data.tasks || [],
            backlog: data.backlog || [],
            dailyShiftSchedule: data.dailyShiftSchedule || [],
          });
        } catch (error) {
          console.error('Import failed:', error);
        }
      },

      clearAll: () => {
        set({
          tasks: [],
          backlog: [],
          activeTaskId: null,
          focusStartTime: null,
        });
      },
    }),
    {
      name: 'asiye-calisma-planlayici-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        backlog: state.backlog,
        dailyShiftSchedule: state.dailyShiftSchedule,
        todayShift: state.todayShift,
      }),
    }
  )
);

