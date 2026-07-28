import React from 'react';
import { PageId } from '../types';
import { HeartPulse, Ambulance, Flame, ArrowLeft, ShieldAlert, Sparkles, Activity } from 'lucide-react';

interface IntroPageProps {
  onSelectPage: (page: PageId) => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onSelectPage }) => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs sm:text-sm font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>أكاديمية الإسعافات الأولية الشاملة والمحاكاة التفاعلية</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          المقدمات التخصصية <span className="text-amber-400">والدروس الشاملة</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          تمنحك كل مقدمة انطباعاً وتصميماً تخصصياً حقيقياً. اضغط فقط على زر <span className="text-amber-300 font-bold">"ابدأ الدرس"</span> لبدء المحاكاة.
        </p>
      </div>

      {/* 3 Dedicated Themed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Card 1: Fainting & Pulsating Heart Theme (Them اغماء محض) */}
        <div className="relative bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          
          {/* Pulsating Heart Background Glow & SVG Wave */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/10 via-rose-500/5 to-transparent pointer-events-none" />
          
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 shadow-inner">
                <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>طابع الإغماء والوعي المحض</span>
              </span>
              <span className="text-slate-500 text-xs font-mono">01/03</span>
            </div>

            {/* Pulsating Heart Icon Display */}
            <div className="py-3 flex items-center gap-4 border-y border-cyan-900/40">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-950/80 animate-pulse">
                  <HeartPulse className="w-8 h-8 text-rose-400" />
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-rose-500/20 blur-md -z-10 animate-ping" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  مؤشر نبض القلب والتروية
                </h3>
                <p className="text-xs text-slate-300">
                  انخفاض ضغط الدم المفاجئ وتروية الدماغ
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">
              غريب مغمى عليه
            </h2>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              شرح موسع وشامل للتعامل مع العثور على غريب فاقد للوعي: تقييم أمان المكان، الاستجابة والتنفس، وإجراءات الإفاقة والسلامة.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2 border-t border-cyan-900/30">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>تقييم أمان المكان وشخصية الغريب</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>اختبار الاستجابةShake & Shout</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>فعاليات تفاعلية وتطبيق عملي خطوة بخطوة</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-cyan-900/40 relative z-10">
            <button
              onClick={() => onSelectPage('faint')}
              className="w-full py-4 px-6 rounded-2xl bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-950 transition-all cursor-pointer border border-cyan-400/30"
            >
              <span>إبدأ الدرس</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card 2: Medical First Aid (Them اسعافي محض) */}
        <div className="relative bg-[#0d171d] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-inner">
                <Ambulance className="w-4 h-4 text-emerald-400" />
                <span>طابع إسعافي وطبي محض</span>
              </span>
              <span className="text-slate-500 text-xs font-mono">02/03</span>
            </div>

            {/* Ambulance Strobe Bar */}
            <div className="py-3 flex items-center gap-4 border-y border-emerald-900/40">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950">
                <Ambulance className="w-8 h-8 text-emerald-400 animate-bounce" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  الإسعاف الأولي المتقدم (123)
                </h3>
                <p className="text-xs text-slate-300">
                  الجروح والنزيف الشرياني والكسور
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">
              الجروح والنزيف والكسور
            </h2>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              درس غني بالتفاصيل الطبية: التفريق بين الجرح السطحي والعميق، النزيف البطين والشرياني الاندفاعي، وحظر تعديل الكسر ميدانياً.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2 border-t border-emerald-900/30">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>النزيف الشرياني واستخدام رباط التورنيك</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>الأجسام المغروزة وحظر نزعها</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>علامات الكسور والتثبيت بالجبيرة</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-emerald-900/40 relative z-10">
            <button
              onClick={() => onSelectPage('medical')}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-950 transition-all cursor-pointer border border-emerald-400/30"
            >
              <span>إبدأ الدرس</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card 3: Fire & Safety (Them حرائق محض) */}
        <div className="relative bg-[#1a120b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-inner">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>طابع السلامة والحرائق المحض</span>
              </span>
              <span className="text-slate-500 text-xs font-mono">03/03</span>
            </div>

            {/* Fire Flame Icon Display */}
            <div className="py-3 flex items-center gap-4 border-y border-amber-900/40">
              <div className="w-14 h-14 rounded-2xl bg-amber-950 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-950">
                <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  مكافحة الحرائق والدخان
                </h3>
                <p className="text-xs text-slate-300">
                  قاعدة PASS، الإخلاء، وحروق النار
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">
              الحرائق والإخلاء والسلامة
            </h2>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              درس شامل ومفصل: أنواع الطفايات، تطبيق خطة PASS الأربعة، تفادي غازات الدخان السام، والتعامل مع درجات الحروق الثلاث.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2 border-t border-amber-900/30">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>طريقة PASS لإيقاف الاشتعال</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>الزحف السفي للنجاة من اختناق الدخان</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>درجات الحروق وتبريد ماء الصنبور</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-amber-900/40 relative z-10">
            <button
              onClick={() => onSelectPage('fire')}
              className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-950 transition-all cursor-pointer border border-amber-400/30"
            >
              <span>إبدأ الدرس</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Disclaimer */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs sm:text-sm">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span>تطبيق تعليمي تفاعلي مصمم وفق التوصيات المعتمدة للإسعافات الأولية والسلامة</span>
        </div>
      </div>

    </div>
  );
};
