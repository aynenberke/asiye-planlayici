import { DaySchedule, Task } from './curriculum';
import { WeekShift } from './scheduleGenerator';

const STORAGE_KEYS = {
  SCHEDULES: 'asiye_schedules',
  REVIEW_TOPICS: 'asiye_review_topics',
  WEEK_SHIFTS: 'asiye_week_shifts',
  LAST_PREFERENCE_CHECK: 'asiye_last_preference_check',
  USER_PREFERENCES: 'asiye_user_preferences',
};

export function saveSchedules(schedules: DaySchedule[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
  }
}

export function loadSchedules(): DaySchedule[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveReviewTopics(topicIds: string[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.REVIEW_TOPICS, JSON.stringify(topicIds));
  }
}

export function loadReviewTopics(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEW_TOPICS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveWeekShifts(shifts: WeekShift): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.WEEK_SHIFTS, JSON.stringify(shifts));
  }
}

export function loadWeekShifts(): WeekShift | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WEEK_SHIFTS);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function updateTask(taskId: string, updates: Partial<Task>): void {
  const schedules = loadSchedules();
  let updated = false;
  
  for (const schedule of schedules) {
    const taskIndex = schedule.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      schedule.tasks[taskIndex] = { ...schedule.tasks[taskIndex], ...updates };
      updated = true;
      break;
    }
  }
  
  if (updated) {
    saveSchedules(schedules);
  }
}

export function markTaskForReview(taskId: string): void {
  const schedules = loadSchedules();
  let topicId: string | null = null;
  
  for (const schedule of schedules) {
    const task = schedule.tasks.find(t => t.id === taskId);
    if (task) {
      topicId = task.topicId;
      task.needsReview = true;
      break;
    }
  }
  
  if (topicId) {
    const reviewTopics = loadReviewTopics();
    if (!reviewTopics.includes(topicId)) {
      reviewTopics.push(topicId);
      saveReviewTopics(reviewTopics);
    }
  }
  
  saveSchedules(schedules);
}

export function saveLastPreferenceCheck(date: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LAST_PREFERENCE_CHECK, date);
  }
}

export function loadLastPreferenceCheck(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_PREFERENCE_CHECK);
  } catch {
    return null;
  }
}

export function saveUserPreferences(preferences: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  }
}

export function loadUserPreferences(): any {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

