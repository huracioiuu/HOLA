import React, { useState } from 'react';
import {
  woundComparisonData,
  bleedingComparisonData,
  fractureDetectionData,
  chokingProtocolData,
  headAndSpineTraumaData,
  riceProtocolData,
  medicalScenarios,
  medicalMyths
} from '../data/medicalData';
import {
  Ambulance,
  ShieldAlert,
  Activity,
  AlertOctagon,
  CheckCircle2,
  Crosshair,
  HelpCircle,
  RotateCcw,
  Zap,
  ShieldCheck,
  Stethoscope,
  HeartPulse
} from 'lucide-react';

export const MedicalLesson: React.FC = () => {
  // Scenario Simulator State
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedScenarioOpt, setSelectedScenarioOpt] = useState<number | null>(null);

  // Siren effect state
  const [sirenActive, setSirenActive] = useState(true);

  // Choking tab state
  const [selectedChokingTab, setSelectedChokingTab] = useState(0);

  const activeScenario = medicalScenarios[activeScenarioIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedScenarioOpt(optIdx);
  };

  const handleNextScenario = () => {
    if (activeScenarioIdx < medicalScenarios.length - 1) {
      setActiveScenarioIdx(activeScenarioIdx + 1);
      setSelectedScenarioOpt(null);
    }
  };

  const handleResetScenario = () => {
    setActiveScenarioIdx(0);
    setSelectedScenarioOpt(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Ambulance Beacon Header - Them اسعافي محض */}
      <div className={`relative bg-[#0b171c] p-8 sm:p-12 rounded-3xl border transition-all duration-500 overflow-hidden shadow-2xl ${
        sirenActive ? 'border-emerald-500/50 shadow-emerald-950/50' : 'border-slate-800'
      }`}>
        
        {/* Flashing Siren Lights Overlay */}
        {sirenActive && (
          <div className="absolute inset-0 pointer-events-none opacity-25 flex justify-between">
            <div className="w-1/2 h-full bg-emerald-600/20 blur-3xl siren-red" />
            <div className="w-1/2 h-full bg-cyan-500/20 blur-3xl siren-blue" />
          </div>
        )}

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Ambulance className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>الدرس الثاني الشامل · الإسعافات الطبية والجروح والكسور والغصة</span>
            </div>

            <button
              onClick={() => setSirenActive(!sirenActive)}
              className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 transition-all"
            >
              <Zap className={`w-3.5 h-3.5 ${sirenActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{sirenActive ? 'إطفاء فلاش الإسعاف' : 'تشغيل فلاش الإسعاف'}</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            الإسعاف الطبي: <span className="text-emerald-400">الجروح والنزيف والكسور والإصابات</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            دليل ميداني متقدم وشامل: التفريق بين الجروح السطحية والعميقة، إيقاف النزيف الشرياني الاندفاعي، التورنيك، مناورة هيمليك للغصة، وإصابات الرأس والعظام وتثبيت الجبيرة.
          </p>
        </div>
      </div>

      {/* SECTION 1: Superficial vs Deep Wounds */}
      <div className="bg-[#0a1419] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl border-b border-emerald-900/40 pb-4">
          <Crosshair className="w-6 h-6 text-emerald-400" />
          <h2>١. الفرق بين الجرح السطحي البسيط والجرح العميق والغائر</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {woundComparisonData.map((wound, idx) => {
            const isDeep = idx === 1;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isDeep
                    ? 'bg-rose-950/30 border-rose-500/50 text-rose-100'
                    : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base sm:text-lg text-white">{wound.type}</h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        isDeep ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {wound.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-slate-400 block">علامات الخطر والجرح:</span>
                    <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
                      {wound.characteristics.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-slate-500">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-emerald-900/40">
                  <span className="text-xs font-bold text-emerald-300 block">بروتوكول التعامل الطبي:</span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {wound.actionSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isDeep ? 'text-rose-400' : 'text-emerald-400'}`} />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Venous vs Profuse Arterial Bleeding */}
      <div className="bg-[#0a1419] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl border-b border-emerald-900/40 pb-4">
          <Activity className="w-6 h-6 text-rose-400 animate-pulse" />
          <h2>٢. سيلان الدم الوريدي مقابل النزيف الشرياني الاندفاعي والتورنيك</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bleedingComparisonData.map((item, idx) => {
            const isArterial = idx === 1;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-4 ${
                  isArterial
                    ? 'bg-rose-950/40 border-rose-500/60 text-rose-100 shadow-lg shadow-rose-950/50'
                    : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base sm:text-lg text-white">{item.type}</h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      isArterial ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-emerald-900/40">
                  <span className="text-xs font-bold text-emerald-300 block">بروتوكول السيطرة والإسعاف:</span>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {item.treatment.map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isArterial ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tourniquet Alert Note */}
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertOctagon className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300 block text-sm">تحذير طبي هام بخصوص "عصابة التورنيك" (Tourniquet):</span>
            <p className="leading-relaxed text-amber-200/90">
              التورنيك يُستخدم حصراً في حالات النزيف الشرياني الغزير الاندفاعي بالطرف الذي يهدد الحياة ولم يتوقف بالضغط المباشر. توضع فوق الجرح بـ 5 سم، وتدوّر حتى يتوقف الاندفاع تماماً، مع تدوين وقت وضعها بدقة على جبهة المصاب (مثلاً T-10:15) لنقل البيانات لفريق الطوارئ.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Choking & Airway Obstruction Protocol */}
      <div className="bg-[#0a1419] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl border-b border-emerald-900/40 pb-4">
          <HeartPulse className="w-6 h-6 text-amber-400" />
          <h2>٣. طوارئ انسداد مجرى الهواء والغصّة (مناورة هيمليك)</h2>
        </div>

        {/* Choking Tabs */}
        <div className="flex gap-2">
          {chokingProtocolData.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedChokingTab(idx)}
              className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedChokingTab === idx
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-950'
                  : 'bg-[#0e1c22] border-emerald-900/40 text-slate-300 hover:border-emerald-500/40'
              }`}
            >
              {tab.target.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Choking Active Step Content */}
        {(() => {
          const chData = chokingProtocolData[selectedChokingTab];
          return (
            <div className="p-6 rounded-2xl bg-[#0e1c22] border border-emerald-500/30 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3 flex-wrap gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">{chData.target}</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  {chData.method}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">خطوات التنفيذ التطبيقي:</span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {chData.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 4: Fractures & Spine Trauma */}
      <div className="bg-[#0a1419] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl border-b border-emerald-900/40 pb-4">
          <ShieldAlert className="w-6 h-6 text-amber-400" />
          <h2>٤. الكسور وإصابات الرأس والعنق والعمود الفقري</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fracture signs */}
          <div className="p-5 rounded-2xl bg-[#0e1c22] border border-emerald-900/40 space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-emerald-300">
              علامات وأعراض الكسر المؤكدة:
            </h3>

            <div className="space-y-3">
              {fractureDetectionData.signsOfFracture.map((sign, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30 space-y-1">
                  <span className="text-xs font-bold text-white block">{sign.title}</span>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">{sign.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Rules */}
          <div className="p-5 rounded-2xl bg-[#0e1c22] border border-emerald-900/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-sm sm:text-base text-emerald-400">
                القواعد الذهبية للإسعاف عند وجود كسر:
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                {fractureDetectionData.fractureActionRules.map((rule, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border leading-relaxed font-semibold ${
                      rule.startsWith('❌')
                        ? 'bg-rose-950/50 border-rose-500/50 text-rose-200 font-bold'
                        : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    }`}
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </div>

            {/* Head and Spine trauma warning */}
            <div className="space-y-2 pt-2">
              {headAndSpineTraumaData.map((trauma, i) => (
                <div key={i} className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 space-y-1">
                  <span className="font-bold block text-rose-300">{trauma.title}:</span>
                  <p className="leading-relaxed opacity-90">{trauma.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: PRICE Protocol for Soft Tissue Injuries */}
      <div className="bg-[#0a1419] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl border-b border-emerald-900/40 pb-4">
          <Stethoscope className="w-6 h-6 text-emerald-400" />
          <h2>٥. بروتوكول PRICE لإصابات التواء المفاصل والأوتار</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {riceProtocolData.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#0e1c22] border border-emerald-900/40 text-center space-y-2">
              <span className="w-10 h-10 rounded-full bg-emerald-600 text-white font-mono font-black text-lg flex items-center justify-center mx-auto shadow-md">
                {item.letter}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-emerald-300">{item.name}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: Interactive Medical Scenario Simulator */}
      <div className="bg-[#0a1419] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl">
            <Ambulance className="w-6 h-6 text-emerald-400" />
            <h2>٦. محاكاة السيناريوهات الإسعافية التفاعلية (٥ سيناريوهات)</h2>
          </div>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
            السيناريو {activeScenarioIdx + 1} من {medicalScenarios.length}
          </span>
        </div>

        <div className="space-y-4">
          <div className="text-emerald-300 font-bold text-base sm:text-lg">{activeScenario.title}</div>
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-900/40 text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            {activeScenario.situation}
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {activeScenario.options.map((opt, idx) => {
              const isSelected = selectedScenarioOpt === idx;
              let btnClass = 'bg-[#0e1c22] border-emerald-900/40 text-slate-200 hover:border-emerald-400/50';

              if (isSelected) {
                btnClass = opt.isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-950';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border text-right text-xs sm:text-sm font-semibold transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <span className="leading-relaxed">{opt.text}</span>
                  {isSelected && (
                    <span className="shrink-0 mt-0.5">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertOctagon className="w-5 h-5 text-rose-400" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedScenarioOpt !== null && (
            <div
              className={`p-5 rounded-2xl border ${
                activeScenario.options[selectedScenarioOpt].isCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
              } space-y-2 animate-fadeIn`}
            >
              <div className="font-extrabold text-sm sm:text-base">
                {activeScenario.options[selectedScenarioOpt].outcome}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {activeScenario.options[selectedScenarioOpt].medicalImpact}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleResetScenario}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-900/30 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة المحاكاة</span>
            </button>

            {activeScenarioIdx < medicalScenarios.length - 1 ? (
              <button
                disabled={selectedScenarioOpt === null}
                onClick={handleNextScenario}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedScenarioOpt !== null
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                السيناريو التالي ←
              </button>
            ) : (
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>أكملت جميع سيناريوهات الإسعاف الطبي!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 7: Medical Myths */}
      <div className="bg-[#0a1419] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl border-b border-emerald-900/40 pb-4">
          <HelpCircle className="w-6 h-6 text-emerald-400" />
          <h2>٧. أخطاء شائعة في التعامل مع الجروح والكسور وتصحيحها</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {medicalMyths.map((myth) => (
            <div key={myth.id} className="p-5 rounded-2xl bg-[#0e1c22] border border-emerald-900/40 space-y-3">
              <span className="text-[11px] font-bold text-rose-400 bg-rose-950/80 border border-rose-500/30 px-2.5 py-0.5 rounded-full inline-block">
                مفهوم خطير
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-white leading-relaxed">{myth.myth}</h3>
              <p className="text-xs text-emerald-300 border-t border-emerald-900/40 pt-2 leading-relaxed">
                <span className="font-bold block text-emerald-400">التصحيح الطبي:</span>
                {myth.fact}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
