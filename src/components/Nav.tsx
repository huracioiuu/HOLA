import React from 'react';
import { PageId } from '../types';
import { Home, HeartPulse, Ambulance, Flame, Trophy } from 'lucide-react';

interface NavProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
}

export const Nav: React.FC<NavProps> = ({ currentPage, onSelectPage }) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'intro', label: 'المقدمة', icon: <Home className="w-4 h-4" />, color: 'from-amber-500 to-rose-500' },
    { id: 'faint', label: 'الإغماء والغريب', icon: <HeartPulse className="w-4 h-4" />, color: 'from-rose-500 to-pink-500' },
    { id: 'medical', label: 'الجروح والكسور', icon: <Ambulance className="w-4 h-4" />, color: 'from-cyan-500 to-emerald-500' },
    { id: 'fire', label: 'الحرائق والدخان', icon: <Flame className="w-4 h-4" />, color: 'from-orange-500 to-amber-500' },
    { id: 'arena', label: 'ساحة الاختبار', icon: <Trophy className="w-4 h-4" />, color: 'from-yellow-400 to-amber-600' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 sm:p-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 p-1.5 bg-[#0d0b0f]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl overflow-x-auto max-w-full">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} -z-10 shadow-md transition-all duration-300`}
                />
              )}
              <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
