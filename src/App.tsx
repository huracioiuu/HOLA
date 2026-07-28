import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Nav } from './components/Nav';
import { IntroPage } from './components/IntroPage';
import { FaintLesson } from './components/FaintLesson';
import { MedicalLesson } from './components/MedicalLesson';
import { FireLesson } from './components/FireLesson';
import { ArenaPage } from './components/ArenaPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('intro');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#070608] text-[#EDE8F7] font-['Cairo',sans-serif] selection:bg-rose-500/30 selection:text-white relative">
      
      {/* Top Glassmorphic Navigation Bar */}
      <Nav currentPage={currentPage} onSelectPage={setCurrentPage} />

      {/* Main Page View Content */}
      <main className="relative z-10 transition-all duration-300">
        {currentPage === 'intro' && <IntroPage onSelectPage={setCurrentPage} />}
        {currentPage === 'faint' && <FaintLesson />}
        {currentPage === 'medical' && <MedicalLesson />}
        {currentPage === 'fire' && <FireLesson />}
        {currentPage === 'arena' && <ArenaPage />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-400">أكاديمية الإسعافات الأولية الشاملة والمحاكاة التفاعلية</p>
          <p>تطبيق إسعافي متكامل: التعامل مع الغريب المغمى عليه · الجروح والكسور · الحرائق والإخلاء</p>
        </div>
      </footer>
    </div>
  );
}
