'use client';

import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { TrendingUp, Moon, ArrowRight } from 'lucide-react';

interface PreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: {
    focusMath?: boolean;
    lightWeek?: boolean;
    standard?: boolean;
  }) => void;
}

export function PreferenceModal({ isOpen, onClose, onSave }: PreferenceModalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    {
      id: 'focusMath',
      title: 'Matematiğe Yüklen',
      description: 'Bu hafta matematik konularına daha fazla odaklan',
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      id: 'lightWeek',
      title: 'Hafif Hafta',
      description: 'Yorgunum, biraz daha hafif bir program olsun',
      icon: Moon,
      color: 'text-purple-600',
    },
    {
      id: 'standard',
      title: 'Standart Devam Et',
      description: 'Normal tempoda devam edelim',
      icon: ArrowRight,
      color: 'text-gray-600',
    },
  ];

  const handleSave = () => {
    if (selected) {
      const preferences: any = {};
      if (selected === 'focusMath') preferences.focusMath = true;
      else if (selected === 'lightWeek') preferences.lightWeek = true;
      else if (selected === 'standard') preferences.standard = true;

      onSave(preferences);
    } else {
      onSave({ standard: true });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gelecek Hafta İçin Özel Bir İsteğin Var mı?"
    >
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`w-full p-4 rounded-ios-lg border-2 text-left transition-all ${
                isSelected
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`${option.color} mt-0.5`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          İptal
        </Button>
        <Button variant="primary" className="flex-1" onClick={handleSave}>
          Kaydet
        </Button>
      </div>
    </Modal>
  );
}

