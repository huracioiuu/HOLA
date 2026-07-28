import React, { useState, useEffect } from 'react';
import { generateDynamicQuizForLevel } from '../data/quizBank';
import { QuizQuestion } from '../types';
import { Trophy, CheckCircle2, AlertOctagon, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

export const ArenaPage: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [levelCompleted, setLevelCompleted] = useState<boolean>(false);
  const [sessionSeed, setSessionSeed] = useState<number>(Date.now());

  // Generate fresh questions whenever currentLevel or sessionSeed changes
  useEffect(() => {
    const freshQuestions = generateDynamicQuizForLevel(currentLevel, 3);
    setQuestions(freshQuestions);
    setUserAnswers({});
    setLevelCompleted(false);
  }, [currentLevel, sessionSeed]);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (userAnswers[questionIndex] !== undefined) return; // prevent changing

    const newAnswers = { ...userAnswers, [questionIndex]: optionIndex };
    setUserAnswers(newAnswers);

    // Check if all questions answered in this level
    if (Object.keys(newAnswers).length === questions.length) {
      setLevelCompleted(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  };

  const handleNextLevel = () => {
    if (currentLevel < 5) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handleRestartSession = () => {
    setCurrentLevel(1);
    setSessionSeed(Date.now()); // force new question pull from bank
  };

  const scoreData = calculateScore();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1b1509] via-[#131118] to-[#0d0b0f] p-8 rounded-3xl border border-amber-500/30 text-center space-y-3 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>ساحة الاختبارات المتجددة والديناميكية</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white">
          اختبار الفهم والقرارات <span className="text-amber-400">تحت الضغط</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          تتولد الأسئلة وترتيب الخيارات عشوائياً عند كل دخول أو إعادة، لتضمن لك تجربة متجددة دوماً واختبار الفهم الحقيقي دون حفظ شكلي.
        </p>

        {/* Level Pills */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isActive = lvl === currentLevel;
            const isPassed = lvl < currentLevel;

            return (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={`w-9 h-9 rounded-full font-bold text-xs transition-all flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/40 ring-4 ring-amber-500/20 scale-110'
                    : isPassed
                    ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Questions Box */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedOption = userAnswers[qIdx];
          const isAnswered = selectedOption !== undefined;

          return (
            <div
              key={q.id || qIdx}
              className={`p-6 rounded-3xl border transition-all duration-300 space-y-4 shadow-xl ${
                isAnswered
                  ? selectedOption === q.correctIndex
                    ? 'bg-[#0f1f18] border-emerald-500/40'
                    : 'bg-[#261218] border-rose-500/40'
                  : 'bg-[#131118] border-white/10 hover:border-amber-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white leading-relaxed flex-grow">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {q.options.map((optText, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isCorrectOption = optIdx === q.correctIndex;

                  let optClass = 'bg-[#1a1720] border-white/10 text-slate-200 hover:border-amber-500/40';

                  if (isAnswered) {
                    if (isCorrectOption) {
                      optClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isThisSelected) {
                      optClass = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                    } else {
                      optClass = 'bg-slate-900/40 border-white/5 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`p-3.5 rounded-2xl border text-right text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer ${optClass}`}
                    >
                      <span className="leading-relaxed">{optText}</span>
                      {isAnswered && (
                        <span>
                          {isCorrectOption ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isThisSelected ? (
                            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Explanation */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1 animate-fadeIn ${
                    selectedOption === q.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <span className="font-bold block">
                    {selectedOption === q.correctIndex ? '✓ الأثر الطبي الصحيح:' : '⚠️ الأثر الطبي للخطأ:'}
                  </span>
                  <p>
                    {selectedOption === q.correctIndex ? q.effectCorrect : q.effectWrong}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Level Completed Summary Card */}
      {levelCompleted && (
        <div className="p-8 rounded-3xl bg-[#131118] border border-amber-500/40 text-center space-y-4 shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-1 flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0b0f] rounded-full flex items-center justify-center font-black text-2xl text-amber-400">
              {scoreData.percentage}%
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-white">
              {scoreData.percentage >= 66 ? '🎉 أداء متميز ومتقن!' : '📚 بحاجة لمراجعة بعض المفاهيم'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              أجبت بشكل صحيح عن {scoreData.correct} من أصل {scoreData.total} أسئلة في المستوى {currentLevel}.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartSession}
              className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>توليد أسئلة جديدة للمستوى</span>
            </button>

            {currentLevel < 5 && (
              <button
                onClick={handleNextLevel}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/30 cursor-pointer"
              >
                <span>المستوى التالي ({currentLevel + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Global Reset Button */}
      <div className="text-center pt-4">
        <button
          onClick={handleRestartSession}
          className="text-xs text-slate-400 hover:text-amber-400 font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>إعادة تعيين وبناء ساحة أسئلة متجددة بالكامل</span>
        </button>
      </div>

    </div>
  );
};
