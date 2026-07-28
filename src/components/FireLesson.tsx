import React, { useState } from 'react';
import {
  passTechniqueSteps,
  raceProtocolSteps,
  extinguisherTypes,
  burnDegreesData,
  chemicalBurnProtocol,
  fireScenarios,
  fireMyths
} from '../data/fireData';
import {
  Flame,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  HelpCircle,
  Layers,
  Wind,
  AlertTriangle,
  Zap,
  Sparkles,
  Compass
} from 'lucide-react';

export const FireLesson: React.FC = () => {
  // PASS Step Active State
  const [activePassIdx, setActivePassIdx] = useState(0);

  // Fire Scenario State
  const [fireScenarioIdx, setFireScenarioIdx] = useState(0);
  const [selectedFireOpt, setSelectedFireOpt] = useState<number | null>(null);

  // Active Extinguisher Matrix filter
  const [activeExtinguisherIdx, setActiveExtinguisherIdx] = useState(0);

  const activeFireScenario = fireScenarios[fireScenarioIdx];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Header - Them حرائق محض */}
      <div className="bg-[#1c110b] p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 animate-pulse text-amber-400" />
            <span>الدرس الثالث الشامل · السيطرة على الحرائق والدخان والسلامة من الحروق</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            حرائق واشتعال: <span className="text-amber-400">القرار السريع والذكي ينقذ الأرواح</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            شرح عملي وموسّع: طفايات الحريق بأنواعها ومحتوياتها، قاعدة PASS لإظهار مهارة الإطفاء، بروتوكول RACE للإخلاء، التسلل السفي للنجاة من الدخان السام، والتعامل الطبي مع الحروق وإصابات المواد الكيميائية.
          </p>
        </div>
      </div>

      {/* SECTION 1: PASS Method Simulator */}
      <div className="bg-[#150d08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg sm:text-xl border-b border-amber-900/40 pb-4">
          <Flame className="w-6 h-6 text-amber-400" />
          <h2>١. قاعدة PASS الأربعة لاستخدام طفاية الحريق المحمولة</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {passTechniqueSteps.map((step, idx) => {
            const isActive = activePassIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePassIdx(idx)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-950 scale-102'
                    : 'bg-[#1d120a] border-amber-900/40 text-slate-300 hover:border-amber-500/40'
                }`}
              >
                <span className="text-2xl font-black block mb-1 font-mono text-amber-300">{step.letter}</span>
                <span className="text-xs font-bold">{step.title.split('-')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Display Active PASS Step Details */}
        <div className="p-6 rounded-2xl bg-[#1d120a] border border-amber-500/30 text-amber-100 space-y-2 animate-fadeIn">
          <div className="text-base font-bold text-amber-400 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-bold">
              {activePassIdx + 1}
            </span>
            <span>{passTechniqueSteps[activePassIdx].title}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
            {passTechniqueSteps[activePassIdx].description}
          </p>
        </div>
      </div>

      {/* SECTION 2: RACE Protocol for Evacuation */}
      <div className="bg-[#150d08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg sm:text-xl border-b border-amber-900/40 pb-4">
          <Compass className="w-6 h-6 text-amber-400" />
          <h2>٢. بروتوكول RACE المعياري لطوارئ إخلاء المباني والمنازل</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {raceProtocolSteps.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#1d120a] border border-amber-900/40 space-y-2">
              <span className="w-9 h-9 rounded-full bg-amber-600 text-white font-mono font-black text-lg flex items-center justify-center shadow-md">
                {step.letter}
              </span>
              <h3 className="font-bold text-sm text-amber-300">{step.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Extinguisher Types & Classes */}
      <div className="bg-[#150d08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg sm:text-xl border-b border-amber-900/40 pb-4">
          <Layers className="w-6 h-6 text-amber-400" />
          <h2>٣. أنواع طفايات الحريق والرموز اللونية واختيار المادة المناسبة</h2>
        </div>

        {/* Matrix Tab Filter */}
        <div className="flex flex-wrap gap-2">
          {extinguisherTypes.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExtinguisherIdx(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeExtinguisherIdx === idx
                  ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-950'
                  : 'bg-[#1d120a] border-amber-900/40 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              {item.type.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Selected Extinguisher Info */}
        {(() => {
          const activeExt = extinguisherTypes[activeExtinguisherIdx];
          return (
            <div className="p-6 rounded-2xl bg-[#1d120a] border border-amber-500/30 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-amber-900/40 pb-3 flex-wrap gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">{activeExt.type}</h3>
                <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-bold">
                  {activeExt.label}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-900/30 space-y-1">
                  <span className="font-bold text-amber-400 block">الاستخدام المعتمد المخصص:</span>
                  <p className="text-slate-200 leading-relaxed">{activeExt.useCases}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-900/40 space-y-1 text-rose-200">
                  <span className="font-bold text-rose-400 block">تحذيرات ومحاذير الخطر:</span>
                  <p className="leading-relaxed opacity-90">{activeExt.warnings}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 4: Burn Degrees & Medical Triage */}
      <div className="bg-[#150d08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg sm:text-xl border-b border-amber-900/40 pb-4">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
          <h2>٤. درجات الحروق الثلاث وكيفية إسعافها بطريقة طبية</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {burnDegreesData.map((burn, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#1d120a] border border-amber-900/40 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-amber-300">{burn.degree}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">العمق الأنسجي:</strong> {burn.depth}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-200">الأعراض والتفحم:</strong> {burn.signs}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-900/30 text-xs text-emerald-300 space-y-1">
                <span className="font-bold block text-emerald-400">الإسعاف الطبي الصحيح:</span>
                <p className="leading-relaxed text-slate-200">{burn.treatment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Chemical Burns & Special Fire Protocols */}
      <div className="bg-[#150d08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg sm:text-xl border-b border-amber-900/40 pb-4">
          <Zap className="w-6 h-6 text-amber-400" />
          <h2>٥. بروتوكول حروق المواد الكيميائية والمساحيق الكاوية</h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#1d120a] border border-amber-900/40 space-y-3 text-xs sm:text-sm">
          <p className="text-amber-300 font-bold">
            عند تعرض الجلد للمواد الكيميائية (أحماض، قلاويات، كلس، منظفات مركزة)، ينبغي اتباع البروتوكول الفوري التالي:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {chemicalBurnProtocol.map((step, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-amber-900/30 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-200 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 6: Fire Survival Scenarios */}
      <div className="bg-[#150d08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg sm:text-xl">
            <Wind className="w-6 h-6 text-amber-400" />
            <h2>٦. محاكاة اتخاذ القرارات وحرائق المنزل والورشات (٥ سيناريوهات)</h2>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
            السيناريو {fireScenarioIdx + 1} من {fireScenarios.length}
          </span>
        </div>

        <div className="space-y-4">
          <div className="text-amber-300 font-bold text-base sm:text-lg">{activeFireScenario.title}</div>
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-900/40 text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            {activeFireScenario.situation}
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {activeFireScenario.options.map((opt, idx) => {
              const isSelected = selectedFireOpt === idx;
              let btnClass = 'bg-[#1d120a] border-amber-900/40 text-slate-200 hover:border-amber-400/50';

              if (isSelected) {
                btnClass = opt.isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-950';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedFireOpt(idx)}
                  className={`p-4 rounded-2xl border text-right text-xs sm:text-sm font-semibold transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <span className="leading-relaxed">{opt.text}</span>
                  {isSelected && (
                    <span className="shrink-0 mt-0.5">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-400" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedFireOpt !== null && (
            <div
              className={`p-5 rounded-2xl border ${
                activeFireScenario.options[selectedFireOpt].isCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
              } space-y-2 animate-fadeIn`}
            >
              <div className="font-extrabold text-sm sm:text-base">
                {activeFireScenario.options[selectedFireOpt].outcome}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {activeFireScenario.options[selectedFireOpt].medicalImpact}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => {
                setFireScenarioIdx(0);
                setSelectedFireOpt(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-900/30 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة المحاكاة</span>
            </button>

            {fireScenarioIdx < fireScenarios.length - 1 ? (
              <button
                disabled={selectedFireOpt === null}
                onClick={() => {
                  setFireScenarioIdx(fireScenarioIdx + 1);
                  setSelectedFireOpt(null);
                }}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedFireOpt !== null
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                السيناريو التالي ←
              </button>
            ) : (
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>أكملت جميع سيناريوهات النجاة من الحرائق!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 7: Fire Safety Myths */}
      <div className="bg-[#150d08] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg sm:text-xl border-b border-amber-900/40 pb-4">
          <HelpCircle className="w-6 h-6 text-amber-400" />
          <h2>٧. أخطاء ومفاهيم شائعة في الحرائق والحروق وتصحيحها</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fireMyths.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-[#1d120a] border border-amber-900/40 space-y-3">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-950/80 border border-rose-500/30 px-2.5 py-0.5 rounded-full inline-block">
                خطر شائع
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-white leading-relaxed">{item.myth}</h3>
              <p className="text-xs text-emerald-300 border-t border-amber-900/40 pt-2 leading-relaxed">
                <span className="font-bold block text-emerald-400">التصحيح العلمي:</span>
                {item.fact}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
