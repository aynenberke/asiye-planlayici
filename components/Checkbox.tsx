'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ checked, onChange, className }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all',
        checked
          ? 'bg-pink-500 border-pink-500'
          : 'bg-white border-gray-300 active:border-pink-400',
        className
      )}
    >
      {checked && <Check size={16} className="text-white" />}
    </button>
  );
}

