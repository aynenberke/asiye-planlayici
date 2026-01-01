'use client';

import React from 'react';
import { Home, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  currentView: 'today' | 'calendar' | 'settings';
  onViewChange: (view: 'today' | 'calendar' | 'settings') => void;
}

export function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const items = [
    { id: 'today' as const, label: 'Bugün', icon: Home },
    { id: 'calendar' as const, label: 'Hafta', icon: Calendar },
    { id: 'settings' as const, label: 'Ayarlar', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-40">
      <div className="flex items-center justify-around h-16 px-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                isActive ? 'text-pink-600' : 'text-gray-400'
              )}
            >
              <Icon size={22} className={cn(isActive && 'stroke-[2.5]')} />
              <span
                className={cn(
                  'text-xs mt-1 font-medium',
                  isActive ? 'text-pink-600' : 'text-gray-400'
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

