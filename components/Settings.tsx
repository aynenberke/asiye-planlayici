'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Download, Upload, Trash2, Check } from 'lucide-react';
import { useStudyStore, ShiftType } from '@/lib/store';

export function Settings() {
  const {
    todayShift,
    setTodayShift,
    generateTasks,
    exportData,
    importData,
    clearAll,
  } = useStudyStore();
  
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asiye-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      importData(importText);
      setShowImport(false);
      setImportText('');
      alert('Veriler başarıyla yüklendi!');
    } catch (error) {
      alert('İçe aktarma başarısız. Lütfen geçerli bir JSON dosyası olduğundan emin olun.');
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setImportText(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="px-6 py-8 safe-top">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon size={24} className="text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
      </div>

      {/* Daily Shift Selector */}
      <div className="glass rounded-glass p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Bugünün Vardiyası</h2>
        <div className="space-y-2">
          {(['off', 'morning', 'afternoon'] as ShiftType[]).map((shift) => (
            <motion.button
              key={shift}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTodayShift(shift)}
              className={`w-full p-4 rounded-ios text-left transition-all ${
                todayShift === shift
                  ? 'bg-pink-500 text-white'
                  : 'glass text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    {shift === 'off' && 'İzinli (Tam Gün Boş)'}
                    {shift === 'morning' && 'Sabahçı (08:30 - 16:00)'}
                    {shift === 'afternoon' && 'Öğlenci (14:00 - 21:00)'}
                  </div>
                  <div className={`text-sm mt-1 ${
                    todayShift === shift ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    {shift === 'off' && 'Zor konular ve yeni müfredat'}
                    {shift === 'morning' && 'Akşam: Sözel dersler + Paragraf'}
                    {shift === 'afternoon' && 'Sabah: Matematik + Türkçe'}
                  </div>
                </div>
                {todayShift === shift && (
                  <Check size={20} className="text-white" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={generateTasks}
          className="w-full mt-4 bg-pink-500 text-white py-3 rounded-ios font-semibold"
        >
          Programı Oluştur
        </motion.button>
      </div>

      {/* Data Management */}
      <div className="glass rounded-glass p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Veri Yönetimi</h2>
        
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="w-full glass rounded-ios p-4 flex items-center gap-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <span className="font-medium">Verilerimi Yedekle</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowImport(!showImport)}
            className="w-full glass rounded-ios p-4 flex items-center gap-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Upload size={20} />
            <span className="font-medium">Yedekten Yükle</span>
          </motion.button>

          {showImport && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3 pt-3"
            >
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="text-sm"
              />
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Ya da JSON verisini buraya yapıştır..."
                className="w-full glass rounded-ios p-3 text-sm min-h-[100px] resize-none"
              />
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleImport}
                  className="flex-1 bg-pink-500 text-white py-2 rounded-ios font-medium text-sm"
                >
                  Yükle
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowImport(false);
                    setImportText('');
                  }}
                  className="flex-1 glass py-2 rounded-ios font-medium text-sm text-gray-900"
                >
                  İptal
                </motion.button>
              </div>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowClearConfirm(true)}
            className="w-full glass rounded-ios p-4 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={20} />
            <span className="font-medium">Tümünü Temizle</span>
          </motion.button>
        </div>
      </div>

      {/* Clear Confirmation */}
      {showClearConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowClearConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass rounded-glass p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Emin misin?
            </h3>
            <p className="text-gray-600 mb-6">
              Tüm görevler ve veriler kalıcı olarak silinecek. Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  clearAll();
                  setShowClearConfirm(false);
                }}
                className="flex-1 bg-red-500 text-white py-3 rounded-ios font-semibold"
              >
                Sil
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 glass py-3 rounded-ios font-semibold text-gray-900"
              >
                İptal
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

