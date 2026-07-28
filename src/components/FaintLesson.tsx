import React, { useState } from 'react';
import {
  faintingSigns,
  faintingTypesData,
  cprQuickGuide,
  strangerEthicsChecklist,
  strangerDecisionTree,
  correctStrangerSteps,
  faintingMyths
} from '../data/faintingData';
import {
  HeartPulse,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  Activity,
  Layers,
  Sparkles,
  Heart,
  Stethoscope,
  Info
} from 'lucide-react';

export const FaintLesson: React.FC = () => {
  // Scenario Simulator state
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  // Sequence game state
  const [sequencePool, setSequencePool] = useState<string[]>(
    [...correctStrangerSteps].sort(() => Math.random() - 0.5)
  );
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [seqFeedback, setSeqFeedback] = useState<{ isOk: boolean; text: string } | null>(null);

  // Tab State for Fainting Types
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0);

  // Ethics Checklist state
  const [checkedEthics, setCheckedEthics] = useState<Record<number, boolean>>({});

  // Myth card toggles
  const [openMyths, setOpenMyths] = useState<Record<string, boolean>>({});

  // CPR pulse counter
  const [cprBeat, setCprBeat] = useState(0);

  const handleSelectScenarioOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const step = strangerDecisionTree[currentScenarioIndex];
    const isCorrect = step.options[optionIndex].isCorrect;

    if (isCorrect && !completedScenarios.includes(currentScenarioIndex)) {
      setCompletedScenarios([...completedScenarios, currentScenarioIndex]);
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < strangerDecisionTree.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleResetScenario = () => {
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setCompletedScenarios([]);
  };

  const handlePickStep = (stepText: string) => {
    if (userSequence.includes(stepText)) return;

    const nextCorrectStep = correctStrangerSteps[userSequence.length];

    if (stepText === nextCorrectStep) {
      const updated = [...userSequence, stepText];
      setUserSequence(updated);
      setSeqFeedback({ isOk: true, text: '✓ خطوة دقيقة ومتسلسلة طبياً!' });

      if (updated.length === correctStrangerSteps.length) {
        setSeqFeedback({ isOk: true, text: '🎉 رائع! أكملت ترتيب خطوات إنقاذ الغريب المغمى عليه بنجاح تام!' });
      }
    } else {
      setSeqFeedback({
        isOk: false,
        text: '✗ ليست الخطوة التالية حسب أولوية الإسعاف الطبية! حاول اختيار الخطوة الأسبق زمنيًا.'
      });
    }
  };

  const handleResetSequence = () => {
    setUserSequence([]);
    setSequencePool([...correctStrangerSteps].sort(() => Math.random() - 0.5));
    setSeqFeedback(null);
  };

  const toggleEthicItem = (idx: number) => {
    setCheckedEthics((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleMyth = (id: string) => {
    setOpenMyths((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeStepData = strangerDecisionTree[currentScenarioIndex];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Header - Them اغماء محض */}
      <div className="bg-[#091322] p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-sm">
            <HeartPulse className="w-4 h-4 animate-pulse text-rose-400" />
            <span>الدرس الأول الشامل · محاكاة إنقاذ الغريب وبروتوكول الإغماء التخصصي</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            ماذا تفعل عندما تجد <span className="text-cyan-400">غريباً مغمى عليه؟</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            شرح عملي وتفصيلي موسّع يشمل كافة بروتوكولات الإسعاف: التمييز الفسيولوجي بين أنواع الإغماء، السيطرة على المحيط، الإنعاش الرئوي (CPR)، وضعية الإفاقة، وأخلاقيات التعامل مع المصاب الغريب.
          </p>
        </div>
      </div>

      {/* SECTION 1: Interactive Decision Tree Simulator */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg sm:text-xl">
            <UserCheck className="w-6 h-6 text-rose-400" />
            <h2>١. المحاكي التفاعلي: اتخاذ القرار عند العثور على الغريب (٧ مراحل)</h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 border border-cyan-500/30 px-3.5 py-1.5 rounded-full">
            المرحلة {currentScenarioIndex + 1} من {strangerDecisionTree.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-cyan-900/40">
          <div
            className="bg-cyan-500 h-full transition-all duration-500"
            style={{
              width: `${((currentScenarioIndex + (selectedOption !== null ? 1 : 0)) / strangerDecisionTree.length) * 100}%`
            }}
          />
        </div>

        {/* Scenario Card */}
        <div className="space-y-4">
          <div className="text-cyan-300 font-bold text-base sm:text-lg">{activeStepData.title}</div>
          <div className="p-5 rounded-2xl bg-[#080e1a] border border-cyan-900/50 text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            {activeStepData.situation}
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {activeStepData.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'bg-[#0f192b] border-cyan-900/50 text-slate-200 hover:border-cyan-400/50';

              if (isSelected) {
                btnClass = option.isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-950';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectScenarioOption(idx)}
                  className={`p-4 rounded-2xl border text-right text-xs sm:text-sm font-semibold transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <span className="leading-relaxed">{option.text}</span>
                  {isSelected && (
                    <span className="shrink-0 mt-0.5">
                      {option.isCorrect ? (
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

          {/* Result Feedback Box */}
          {selectedOption !== null && (
            <div
              className={`p-5 rounded-2xl border ${
                activeStepData.options[selectedOption].isCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
              } space-y-2 animate-fadeIn`}
            >
              <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                <span>{activeStepData.options[selectedOption].outcome}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {activeStepData.options[selectedOption].medicalImpact}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleResetScenario}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-cyan-900/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>البدء من جديد</span>
            </button>

            {currentScenarioIndex < strangerDecisionTree.length - 1 ? (
              <button
                disabled={selectedOption === null}
                onClick={handleNextScenario}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedOption !== null
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                المرحلة التالية ←
              </button>
            ) : (
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>أكملت جميع مراحل محاكاة إنقاذ الغريب المغمى عليه!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: Types of Fainting (Vasovagal vs Cardiac vs Orthostatic vs Hypoglycemic) */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg sm:text-xl border-b border-cyan-900/40 pb-4">
          <Stethoscope className="w-6 h-6 text-cyan-400" />
          <h2>٢. التشخيص الفسيولوجي والفرق بين أنواع الإغماء الأربعة</h2>
        </div>

        {/* Tabs for Types */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {faintingTypesData.map((typeObj, idx) => {
            const isActive = selectedTypeIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedTypeIdx(idx)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-600 border-cyan-400 text-white font-bold shadow-lg shadow-cyan-950 scale-102'
                    : 'bg-[#0f192b] border-cyan-900/40 text-slate-300 hover:border-cyan-500/40'
                }`}
              >
                <span className="text-xs sm:text-sm block font-bold">{typeObj.type.split('(')[0]}</span>
                <span className="text-[10px] text-cyan-200/80 block mt-1">{typeObj.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Type Details */}
        {(() => {
          const typeInfo = faintingTypesData[selectedTypeIdx];
          return (
            <div className="p-6 rounded-2xl bg-[#080e1a] border border-cyan-500/30 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-cyan-900/40 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>{typeInfo.type}</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                  {typeInfo.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#0f192b] border border-cyan-900/30 space-y-1">
                  <span className="font-bold text-cyan-400 block">الآلية الفسيولوجية:</span>
                  <p className="text-slate-300 leading-relaxed">{typeInfo.mechanism}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f192b] border border-cyan-900/30 space-y-1">
                  <span className="font-bold text-amber-400 block">المحفزات والأسباب:</span>
                  <p className="text-slate-300 leading-relaxed">{typeInfo.triggers}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f192b] border border-cyan-900/30 space-y-1">
                  <span className="font-bold text-emerald-400 block">بروتوكول الإسعاف:</span>
                  <p className="text-slate-300 leading-relaxed">{typeInfo.firstAid}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 3: Emergency CPR & AED Protocol Guide (When No Breathing) */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-lg sm:text-xl">
            <Heart className="w-6 h-6 text-rose-500 animate-pulse" />
            <h2>٣. طوارئ توقف التنفس: بروتوكول الإنعاش القلبي الرئوي (CPR & AED)</h2>
          </div>

          <button
            onClick={() => setCprBeat((prev) => (prev + 1) % 30)}
            className="px-3.5 py-1.5 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2 hover:bg-rose-900 cursor-pointer active:scale-95 transition-all"
          >
            <Activity className="w-4 h-4 animate-ping" />
            <span>محاكي ضغطات الصدر ({cprBeat + 1}/30)</span>
          </button>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          إذا كشف فحص التنفس أن الغريب المغمى عليه لا يتنفس إطلاقاً أو يصدر شهيقاً احتضارياً عابراً، فإن القلب قد توقف وينبغي بدء الإنعاش فوراً:
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cprQuickGuide.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0f192b] border border-rose-900/40 hover:border-rose-500/40 transition-all space-y-2"
            >
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-rose-900 text-white flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </span>
                <span>{item.step}</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Sequence Ordering Game */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg sm:text-xl">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <h2>٤. ترتيب خطوات الإسعاف التسلسلي بالترتيب الصحيح (٨ خطوات)</h2>
          </div>
          <button
            onClick={handleResetSequence}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-900/30 text-xs text-slate-300 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الترتيب</span>
          </button>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          انقر على البطاقات أدناه لبناء التسلسل الزمني المعتمد لإنقاذ الغريب المغمى عليه خطوة بخطوة.
        </p>

        {/* Selected Sequence List */}
        <div className="space-y-2 min-h-[120px] p-4 rounded-2xl bg-[#080d19] border border-dashed border-cyan-500/30">
          {userSequence.length === 0 ? (
            <span className="text-slate-500 text-xs block text-center py-8">
              انقر البطاقات بالأسفل لبناء التسلسل المعتمد هنا...
            </span>
          ) : (
            userSequence.map((stepText, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-md animate-fadeIn"
              >
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {idx + 1}
                </span>
                <span>{stepText}</span>
              </div>
            ))
          )}
        </div>

        {/* Feedback text */}
        {seqFeedback && (
          <div
            className={`text-xs sm:text-sm font-bold ${
              seqFeedback.isOk ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {seqFeedback.text}
          </div>
        )}

        {/* Tiles Pool */}
        <div className="flex flex-wrap gap-2 pt-2">
          {sequencePool.map((stepText, idx) => {
            const isUsed = userSequence.includes(stepText);
            return (
              <button
                key={idx}
                disabled={isUsed}
                onClick={() => handlePickStep(stepText)}
                className={`p-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-right cursor-pointer ${
                  isUsed
                    ? 'opacity-30 border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed'
                    : 'bg-[#0f192b] border-cyan-900/50 text-slate-200 hover:border-cyan-400/50 hover:bg-slate-800 active:scale-95'
                }`}
              >
                {stepText}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 5: Signs & Pre-fainting Signals */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg sm:text-xl border-b border-cyan-900/40 pb-4">
          <Activity className="w-6 h-6 text-rose-400" />
          <h2>٥. علامات الإنذار المبكرة (١٠ أعراض تسبق فقدان الوعي)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {faintingSigns.map((sign) => (
            <div
              key={sign.id}
              className="p-4 rounded-2xl bg-[#0f192b] border border-cyan-900/40 hover:border-cyan-400/40 transition-all space-y-1.5"
            >
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {sign.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">{sign.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: Recovery Position Detailed Text Explanation */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg sm:text-xl border-b border-cyan-900/40 pb-4">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <h2>٦. وضعية الإفاقة الجانبية (Recovery Position) - الشرح الطبي المعتمد</h2>
        </div>

        <div className="space-y-4 text-slate-200 text-xs sm:text-sm leading-relaxed bg-[#080d19] p-6 rounded-2xl border border-cyan-900/30">
          <p className="text-cyan-300 font-bold">
            تُستخدم وضعية الإفاقة الجانبية إذا كان المصاب الغريب يتنفس بانتظام ولكنه فاقد للوعي ولم يستعد وعيه خلال 60 ثانية، بهدف الحفاظ على القصبة الهوائية مفتوحة تلقائياً ومنع الاختناق باللسان أو السوائل:
          </p>
          <ul className="space-y-3 font-medium text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>فتح المجرى الهوائي:</strong> إمالة الرأس للخلف مع رفع الذقن قليلاً لضمان بقاء لسان المصاب بعيداً عن مجرى التنفس.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>تثبيت الجسم الجانبي:</strong> ثني الركبة العلوية للمصاب بزاوية قائمة (90 درجة) لوضع ركيزية تمنع تدحرج جسمه للأمام أو الخلف.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>دعم الرأس والوجه:</strong> وضع ظهر يد المصاب العلوية تحت خده الخارجي لدعم الجمجمة ومنع انثناء الرقبة.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>التفريغ التلقائي للسوائل:</strong> انحدار الوجه نحو الأسفل قليلاً يضمن خروج اللعاب أو التقيؤ بفعل الجاذبية دون أن ينزل للقصبة الهوائية.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 7: Stranger Ethics & Legal Checklist */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg sm:text-xl border-b border-cyan-900/40 pb-4">
          <Layers className="w-6 h-6 text-amber-400" />
          <h2>٧. قائمة التحقق الأخلاقية والمهنية عند التعامل مع الغريب</h2>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          انقر على البنود لتأكيد استيعاب القواعد الأخلاقية والمهنية لحماية المصاب الغريب ونفسك:
        </p>

        <div className="grid grid-cols-1 gap-3">
          {strangerEthicsChecklist.map((item, idx) => {
            const isChecked = checkedEthics[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleEthicItem(idx)}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isChecked
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                    : 'bg-[#0f192b] border-cyan-900/40 text-slate-300 hover:border-cyan-400/40'
                }`}
              >
                <span>{item}</span>
                <span className="shrink-0">
                  <CheckCircle2 className={`w-5 h-5 ${isChecked ? 'text-emerald-400' : 'text-slate-600'}`} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 8: Myths and Truths */}
      <div className="bg-[#0a1120] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg sm:text-xl border-b border-cyan-900/40 pb-4">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          <h2>٨. خرافات شائعة عند التعامل مع المغمى عليه وتصحيحها</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faintingMyths.map((item) => {
            const isOpen = openMyths[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleMyth(item.id)}
                className="p-5 rounded-2xl bg-[#0f192b] border border-cyan-900/40 hover:border-cyan-400/40 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                    اعتقاد خاطئ
                  </span>
                  <span className="text-xs text-cyan-400">{isOpen ? '▲ إغلاق' : '▼ انقر للتصحيح الطبي'}</span>
                </div>
                <h3 className="font-bold text-sm text-white leading-relaxed">{item.myth}</h3>

                {isOpen && (
                  <div className="pt-3 border-t border-cyan-900/40 text-xs text-emerald-300 space-y-1 animate-fadeIn">
                    <span className="font-bold block text-emerald-400">الحقيقة الطبية:</span>
                    <p className="leading-relaxed text-slate-300">{item.fact}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
