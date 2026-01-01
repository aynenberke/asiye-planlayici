'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'completed' | 'pending' | 'review';
}

export function Card({ children, variant = 'default', className, ...props }: CardProps) {
  const variants = {
    default: 'bg-white border-gray-200',
    completed: 'bg-success-50 border-success-200',
    pending: 'bg-danger-50 border-danger-200',
    review: 'bg-warning-50 border-warning-200',
  };

  return (
    <div
      className={cn(
        'rounded-ios-lg border p-4 shadow-ios transition-all',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

