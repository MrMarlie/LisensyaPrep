'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import BossHPBar from './BossHPBar';
import PlayerHPBar from './PlayerHPBar';
import AnswerCard from './AnswerCard';
import AttackEffect from './AttackEffect';
import { processAnswer, calculateScore, QUIZ_CONFIG } from '@/lib/quizEngine';
import { saveStageResult, awardCollectible, saveActiveQuizState, clearActiveQuizState, getUserProfile } from '@/lib/storage';
import PlayerSetupModal from './PlayerSetupModal';
import { useAuth } from '@/context/AuthContext';

export default function QuizEngine({ initialState, moduleInfo }) {
  const router = useRouter();
  const { user, profile: authProfile } = useAuth();
  const [state, setState] = useState(initialState);
  const [effect, setEffect] = useState(null); // { type: 'attack'|'penalty', damage, penalty }
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [playerName, setPlayerName] = useState('You');
  const [showSetupModal, setShowSetupModal] = useState(true);

  useEffect(() => {
    if (user && authProfile?.display_name) {
      setPlayerName(authProfile.display_name);
      setShowSetupModal(false);
      return;
    }
    async function loadProfile() {
      const p = await getUserProfile();
      if (p?.name) {
        setPlayerName(p.name);
        setShowSetupModal(false); // returning user — already gave their details
      }
      // else: showSetupModal stays true, gate remains
    }
    loadProfile();
  }, [user, authProfile]);

  // Prevent leaving the page while a quiz is active
  useEffect(() => {
    if (state.status !== 'active') return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.status]);

  const questionRef = useRef(null);
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const isGameOver = state.status !== 'active';

  // Persist state to session storage on each change
  useEffect(() => {
    if (state.status === 'active') {
      saveActiveQuizState(state);
    }
  }, [state]);

  // Scroll to question card after answering so explanation doesn't push it off screen on mobile
  useEffect(() => {
    if (answered && questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [answered]);

  const handleAnswer = useCallback(
    async (choice) => {
      if (answered || isGameOver) return;

      const newState = processAnswer(state, choice);
      const isCorrect = choice === currentQuestion.answer;

      setSelectedAnswer(choice);
      setAnswered(true);
      setShowExplanation(true);
      setState(newState);

      if (isCorrect) {
        setEffect({ type: 'attack', damage: newState.lastDamage });
      } else {
        setEffect({ type: 'penalty', penalty: QUIZ_CONFIG.WRONG_ANSWER_PENALTY });
      }

      if (newState.status !== 'active') {
        const score = calculateScore(newState);
        await saveStageResult(moduleInfo.examId, moduleInfo.id, score);

        if (newState.status === 'won' && score.percentage === 100) {
          await awardCollectible(moduleInfo.examId, moduleInfo.id, {
            title: `${moduleInfo.title} Badge`,
            icon: moduleInfo.icon,
            moduleId: moduleInfo.id,
          });
        }

        clearActiveQuizState();
      }
    },
    [answered, isGameOver, state, currentQuestion, moduleInfo]
  );

  const handleNext = useCallback(() => {
    if (isGameOver) {
      // Navigate to results
      const score = calculateScore(state);
      const params = new URLSearchParams({
        moduleId: moduleInfo.id,
        passed: String(score.passed),
        correct: String(score.correct),
        total: String(score.total),
        percentage: String(score.percentage),
      });
      router.push(`/results?${params.toString()}`);
      return;
    }
    setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    setAnswered(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setEffect(null);
  }, [isGameOver, state, moduleInfo, router]);

  // Determine answer card states
  const getCardState = (choice) => {
    if (!answered) return 'idle';
    if (choice === currentQuestion.answer) return 'correct';
    if (choice === selectedAnswer) return 'wrong';
    return 'reveal';
  };

  const progressPercent = Math.round(
    (state.currentQuestionIndex / state.questions.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#080d1b] text-white">
      {/* Player setup modal — shown only on first quiz */}
      {showSetupModal && (
        <PlayerSetupModal
          onComplete={(name) => {
            setPlayerName(name);
            setShowSetupModal(false);
          }}
        />
      )}

      {/* Effect overlay */}
      {effect && (
        <AttackEffect
          type={effect.type}
          damage={effect.damage}
          penalty={effect.penalty}
          onComplete={() => setEffect(null)}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* HP Bars */}
        <div className="bg-[#0f1629] rounded-2xl p-4 sm:p-6 border border-white/10 space-y-4">
          <BossHPBar hp={state.bossHP} bossName={`${moduleInfo.title} Boss`} />
          <div className="border-t border-white/10" />
          <PlayerHPBar hp={state.playerHP} playerName={playerName} />
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-gray-400 text-sm whitespace-nowrap">
            {state.currentQuestionIndex + 1} / {state.questions.length}
          </span>
        </div>

        {/* Game Over Banner */}
        {isGameOver && (() => {
          const finalScore = calculateScore(state);
          const isPerfect = finalScore.percentage === 100;
          return (
            <div
              className={`rounded-2xl p-5 border-2 text-center ${
                state.status === 'won'
                  ? 'bg-yellow-400/10 border-yellow-400'
                  : 'bg-red-500/10 border-red-500'
              }`}
            >
              {state.status === 'won' ? (
                <>
                  <p className="text-3xl mb-2">{isPerfect ? '🏅' : '🏆'}</p>
                  <p className="text-yellow-400 font-extrabold text-2xl">VICTORY!</p>
                  {isPerfect ? (
                    <p className="text-gray-300 text-sm mt-1">Perfect score! A PRZ piece has been earned.</p>
                  ) : (
                    <p className="text-gray-300 text-sm mt-1">
                      You scored {finalScore.percentage}%. Get <span className="text-yellow-400 font-bold">100%</span> to earn your PRZ piece!
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-3xl mb-2">💀</p>
                  <p className="text-red-400 font-extrabold text-2xl">DEFEATED!</p>
                  <p className="text-gray-300 text-sm mt-1">Your HP ran out. Review and try again!</p>
                </>
              )}
            </div>
          );
        })()}

        {/* Question Card */}
        <div ref={questionRef} className="bg-[#0f1629] rounded-2xl p-5 sm:p-7 border border-white/10">
          <div className="flex items-start gap-3 mb-6">
            <span className="bg-yellow-400/20 text-yellow-400 font-bold text-xs px-2 py-1 rounded-lg whitespace-nowrap mt-0.5">
              Q{state.currentQuestionIndex + 1}
            </span>
            <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
              {currentQuestion?.question}
            </p>
          </div>

          {/* Answer choices */}
          <div className="space-y-3">
            {currentQuestion?.choices.map((choice, i) => (
              <AnswerCard
                key={i}
                choice={choice}
                index={i}
                onSelect={handleAnswer}
                state={getCardState(choice)}
                disabled={answered}
              />
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && currentQuestion?.explanation && (
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-5">
            <p className="text-blue-300 font-semibold text-sm mb-2">📚 Explanation</p>
            <p className="text-gray-300 text-sm leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Next / Results button */}
        {answered && (
          <button
            onClick={handleNext}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 rounded-xl text-lg transition-colors"
          >
            {isGameOver ? '📊 View Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
