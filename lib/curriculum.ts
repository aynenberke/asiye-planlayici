export type ShiftType = 'off' | 'morning' | 'afternoon';
export type Subject = 'turkish' | 'math' | 'science' | 'social';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  type: string; // 'Paragraf', 'Dil Bilgisi', 'Problemler', etc.
  difficulty: Difficulty;
  daily?: boolean; // Her gün yapılacak mı?
}

export interface Task {
  id: string;
  topicId: string;
  topicName: string;
  subject: Subject;
  type: string;
  date: string; // YYYY-MM-DD formatında
  completed: boolean;
  needsReview: boolean;
  createdAt: string;
}

export interface DaySchedule {
  date: string;
  shift: ShiftType;
  tasks: Task[];
}

export const CURRICULUM: Topic[] = [
  // Türkçe
  { id: 'tr-1', name: 'Paragraf', subject: 'turkish', type: 'Paragraf', difficulty: 'medium', daily: true },
  { id: 'tr-2', name: 'Dil Bilgisi', subject: 'turkish', type: 'Dil Bilgisi', difficulty: 'medium' },
  
  // Matematik - Problemler (Her gün)
  { id: 'math-1', name: 'Problemler', subject: 'math', type: 'Problemler', difficulty: 'hard', daily: true },
  
  // Matematik - İlk 12 Konu
  { id: 'math-2', name: 'Sayılar ve İşlemler', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-3', name: 'Üslü Sayılar', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-4', name: 'Köklü Sayılar', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-5', name: 'Mutlak Değer', subject: 'math', type: 'Yeni Konu', difficulty: 'medium' },
  { id: 'math-6', name: 'Çarpanlara Ayırma', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-7', name: 'Denklemler', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-8', name: 'Eşitsizlikler', subject: 'math', type: 'Yeni Konu', difficulty: 'medium' },
  { id: 'math-9', name: 'Fonksiyonlar', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-10', name: 'Trigonometri', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-11', name: 'Logaritma', subject: 'math', type: 'Yeni Konu', difficulty: 'hard' },
  { id: 'math-12', name: 'Permütasyon-Kombinasyon', subject: 'math', type: 'Yeni Konu', difficulty: 'medium' },
  { id: 'math-13', name: 'Olasılık', subject: 'math', type: 'Yeni Konu', difficulty: 'medium' },
  
  // Fen Bilimleri
  { id: 'science-1', name: 'Optik (Fizik)', subject: 'science', type: 'Fizik', difficulty: 'hard' },
  { id: 'science-2', name: 'Madde (Kimya)', subject: 'science', type: 'Kimya', difficulty: 'medium' },
  { id: 'science-3', name: 'Hücre (Biyoloji)', subject: 'science', type: 'Biyoloji', difficulty: 'medium' },
  
  // Sosyal Bilimler
  { id: 'social-1', name: 'Osmanlı Tarihi', subject: 'social', type: 'Tarih', difficulty: 'easy' },
  { id: 'social-2', name: 'Cumhuriyet Tarihi', subject: 'social', type: 'Tarih', difficulty: 'easy' },
  { id: 'social-3', name: 'Türkiye Coğrafyası', subject: 'social', type: 'Coğrafya', difficulty: 'easy' },
  { id: 'social-4', name: 'Dünya Coğrafyası', subject: 'social', type: 'Coğrafya', difficulty: 'easy' },
];

export const getSubjectColor = (subject: Subject): string => {
  const colors = {
    turkish: 'bg-pink-100 text-pink-700',
    math: 'bg-blue-100 text-blue-700',
    science: 'bg-purple-100 text-purple-700',
    social: 'bg-green-100 text-green-700',
  };
  return colors[subject];
};

export const getSubjectName = (subject: Subject): string => {
  const names = {
    turkish: 'Türkçe',
    math: 'Matematik',
    science: 'Fen Bilimleri',
    social: 'Sosyal Bilimler',
  };
  return names[subject];
};

