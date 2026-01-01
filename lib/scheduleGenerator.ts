import { CURRICULUM, Topic, Task, DaySchedule, ShiftType } from './curriculum';
import { format, startOfWeek, addDays, parseISO, isSunday } from 'date-fns';

export interface WeekShift {
  monday: ShiftType;
  tuesday: ShiftType;
  wednesday: ShiftType;
  thursday: ShiftType;
  friday: ShiftType;
  saturday: ShiftType;
  sunday: ShiftType;
}

export interface UserPreferences {
  focusMath?: boolean;
  lightWeek?: boolean;
  standard?: boolean;
}

export function generateWeeklySchedule(
  weekStart: Date,
  shifts: WeekShift,
  reviewTopics: string[] = [], // needsReview olan topic ID'leri
  preferences?: UserPreferences
): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  const weekStartDate = startOfWeek(weekStart, { weekStartsOn: 1 }); // Pazartesi başlangıç
  
  // Kullanıcı tercihlerine göre yoğunluk ayarı
  const intensity = preferences?.focusMath ? 1.2 : preferences?.lightWeek ? 0.8 : 1.0;
  
  // Review konularını önce ekle
  const reviewTopicsData = CURRICULUM.filter(t => reviewTopics.includes(t.id));
  const regularTopics = CURRICULUM.filter(t => !reviewTopics.includes(t.id));
  
  // Günlük konuları ayır
  const dailyTopics = CURRICULUM.filter(t => t.daily);
  const nonDailyTopics = CURRICULUM.filter(t => !t.daily);
  
  // Review konularını haftaya dağıt (öncelikli)
  const reviewQueue = [...reviewTopicsData];
  let reviewIndex = 0;
  
  // İzinli günler için hazırlık: Zor matematik konuları + Fen
  const hardMathTopics = nonDailyTopics.filter(t => 
    t.subject === 'math' && t.difficulty === 'hard' && !t.daily
  );
  const scienceTopics = nonDailyTopics.filter(t => t.subject === 'science');
  
  // Sabahçı günler için: Sözel dersler (Tarih, Biyoloji) + Paragraf
  const verbalTopics = nonDailyTopics.filter(t => 
    (t.subject === 'social' || (t.subject === 'science' && t.type === 'Biyoloji'))
  );
  const paragraphTopic = dailyTopics.find(t => t.type === 'Paragraf');
  
  // Öğlenci günler için: Matematik Problem + Türkçe Deneme
  const problemTopic = dailyTopics.find(t => t.type === 'Problemler');
  const grammarTopic = nonDailyTopics.find(t => t.type === 'Dil Bilgisi');
  
  // Normal konular için kuyruk
  const normalQueue = [...nonDailyTopics.filter(t => !reviewTopics.includes(t.id))];
  let normalIndex = 0;
  
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(weekStartDate, i);
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const dayKey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][i] as keyof WeekShift;
    const shift = shifts[dayKey];
    
    const tasks: Task[] = [];
    const taskIds = new Set<string>();
    
    // 1. Günlük konuları ekle
    dailyTopics.forEach(topic => {
      const taskId = `${topic.id}-${dateStr}`;
      tasks.push({
        id: taskId,
        topicId: topic.id,
        topicName: topic.name,
        subject: topic.subject,
        type: topic.type,
        date: dateStr,
        completed: false,
        needsReview: false,
        createdAt: new Date().toISOString(),
      });
      taskIds.add(topic.id);
    });
    
    // 2. Review konularını öncelikli ekle
    if (reviewQueue.length > 0 && reviewIndex < reviewQueue.length) {
      const reviewTopic = reviewQueue[reviewIndex];
      if (!taskIds.has(reviewTopic.id)) {
        const taskId = `${reviewTopic.id}-${dateStr}`;
        tasks.push({
          id: taskId,
          topicId: reviewTopic.id,
          topicName: reviewTopic.name,
          subject: reviewTopic.subject,
          type: reviewTopic.type,
          date: dateStr,
          completed: false,
          needsReview: false,
          createdAt: new Date().toISOString(),
        });
        taskIds.add(reviewTopic.id);
        reviewIndex++;
      }
    }
    
    // 3. Shift tipine göre konu dağıtımı
    if (shift === 'off') {
      // İzinli günler: Zor konular (Matematik Yeni Konu + Fen)
      const availableHardMath = hardMathTopics.filter(t => !taskIds.has(t.id));
      const availableScience = scienceTopics.filter(t => !taskIds.has(t.id));
      
      // Yoğunluğa göre görev sayısı
      const taskCount = Math.floor(2 * intensity);
      
      // Önce Fen ekle
      if (availableScience.length > 0 && tasks.length < taskCount + dailyTopics.length) {
        const science = availableScience[0];
        if (!taskIds.has(science.id)) {
          tasks.push({
            id: `${science.id}-${dateStr}`,
            topicId: science.id,
            topicName: science.name,
            subject: science.subject,
            type: science.type,
            date: dateStr,
            completed: false,
            needsReview: false,
            createdAt: new Date().toISOString(),
          });
          taskIds.add(science.id);
        }
      }
      
      // Sonra zor Matematik ekle
      if (availableHardMath.length > 0 && tasks.length < taskCount + dailyTopics.length + 1) {
        const math = availableHardMath[0];
        if (!taskIds.has(math.id)) {
          tasks.push({
            id: `${math.id}-${dateStr}`,
            topicId: math.id,
            topicName: math.name,
            subject: math.subject,
            type: math.type,
            date: dateStr,
            completed: false,
            needsReview: false,
            createdAt: new Date().toISOString(),
          });
          taskIds.add(math.id);
        }
      }
      
      // Eğer focusMath ise bir matematik daha ekle
      if (preferences?.focusMath && availableHardMath.length > 1 && tasks.length < taskCount + dailyTopics.length + 2) {
        const math2 = availableHardMath[1];
        if (!taskIds.has(math2.id)) {
          tasks.push({
            id: `${math2.id}-${dateStr}`,
            topicId: math2.id,
            topicName: math2.name,
            subject: math2.subject,
            type: math2.type,
            date: dateStr,
            completed: false,
            needsReview: false,
            createdAt: new Date().toISOString(),
          });
          taskIds.add(math2.id);
        }
      }
      
    } else if (shift === 'morning') {
      // Sabahçı (Akşam müsait, yorgun): Sözel dersler + Paragraf
      const availableVerbal = verbalTopics.filter(t => !taskIds.has(t.id));
      
      // Hafif hafta ise sadece bir sözel
      const verbalCount = preferences?.lightWeek ? 1 : 2;
      
      availableVerbal.slice(0, verbalCount).forEach(topic => {
        if (!taskIds.has(topic.id) && tasks.length < dailyTopics.length + verbalCount + 1) {
          tasks.push({
            id: `${topic.id}-${dateStr}`,
            topicId: topic.id,
            topicName: topic.name,
            subject: topic.subject,
            type: topic.type,
            date: dateStr,
            completed: false,
            needsReview: false,
            createdAt: new Date().toISOString(),
          });
          taskIds.add(topic.id);
        }
      });
      
    } else if (shift === 'afternoon') {
      // Öğlenci (Sabah dinç): Matematik Problem (zaten günlük) + Türkçe Deneme/Dil Bilgisi
      if (grammarTopic && !taskIds.has(grammarTopic.id)) {
        tasks.push({
          id: `${grammarTopic.id}-${dateStr}`,
          topicId: grammarTopic.id,
          topicName: grammarTopic.name,
          subject: grammarTopic.subject,
          type: grammarTopic.type,
          date: dateStr,
          completed: false,
          needsReview: false,
          createdAt: new Date().toISOString(),
        });
        taskIds.add(grammarTopic.id);
      }
    }
    
    // 4. Eğer hala boşluk varsa normal konulardan ekle
    const remainingSlots = Math.floor(4 * intensity) - tasks.length;
    if (remainingSlots > 0 && normalIndex < normalQueue.length) {
      const slots = Math.min(remainingSlots, normalQueue.length - normalIndex);
      for (let j = 0; j < slots; j++) {
        const topic = normalQueue[normalIndex % normalQueue.length];
        if (!taskIds.has(topic.id)) {
          tasks.push({
            id: `${topic.id}-${dateStr}`,
            topicId: topic.id,
            topicName: topic.name,
            subject: topic.subject,
            type: topic.type,
            date: dateStr,
            completed: false,
            needsReview: false,
            createdAt: new Date().toISOString(),
          });
          taskIds.add(topic.id);
          normalIndex++;
        } else {
          normalIndex++;
        }
        if (normalIndex >= normalQueue.length) break;
      }
    }
    
    schedule.push({
      date: dateStr,
      shift,
      tasks,
    });
  }
  
  return schedule;
}

