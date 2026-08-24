import React, { useState, useMemo, useCallback } from 'react';
import MainLayout from './MainLayout';
import QuizWelcome from '../components/quiz/QuizWelcome';
import QuizTopicSelect from '../components/quiz/QuizTopicSelect';
import QuizPlay from '../components/quiz/QuizPlay';
import QuizResult from '../components/quiz/QuizResult';
import QuizReview from '../components/quiz/QuizReview';
import ConfirmQuitModal from '../components/quiz/ConfirmQuitModal';
import { QUIZ_CATEGORIES, QUIZ_QUESTIONS } from '../Data/quizData';

// Utility to shuffle an array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const DevQuiz = () => {
  // Step state: 'welcome' | 'select' | 'quiz' | 'result' | 'review'
  const [step, setStep] = useState('welcome');

  // Quit confirmation modal state
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);

  // Selected categories (all checked by default as requested)
  const [selectedCategories, setSelectedCategories] = useState(() =>
    QUIZ_CATEGORIES.map((c) => c.id)
  );

  // Question count: 5 | 10 | 15 | 20 | 'All'
  const [questionCount, setQuestionCount] = useState(10);

  // Active quiz state
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [history, setHistory] = useState([]); // [{ question, selectedAnswer, isCorrect }]
  const [score, setScore] = useState(0);

  // Filtered available questions based on selected categories
  const availableQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => selectedCategories.includes(q.category));
  }, [selectedCategories]);

  // Start new quiz session
  const handleStartQuiz = useCallback(() => {
    if (availableQuestions.length === 0) return;

    // Shuffle available questions
    const shuffled = shuffleArray(availableQuestions);

    // Slice according to selected count
    const count =
      questionCount === 'All'
        ? shuffled.length
        : Math.min(Number(questionCount), shuffled.length);

    const quizBatch = shuffled.slice(0, count);

    setActiveQuestions(quizBatch);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHistory([]);
    setScore(0);
    setStep('quiz');
  }, [availableQuestions, questionCount]);

  // When user picks an option in active quiz
  const handleSelectAnswer = (optionIndex) => {
    if (selectedAnswer !== null) return; // already answered

    const currentQ = activeQuestions[currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    setSelectedAnswer(optionIndex);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        selectedAnswer: optionIndex,
        isCorrect,
      },
    ]);
  };

  // Next Question / Finish Quiz
  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setStep('result');
    }
  };

  // Reset quiz with same settings
  const handleRetakeQuiz = () => {
    handleStartQuiz();
  };

  // Change topics
  const handleChangeTopics = () => {
    setStep('select');
  };

  // Quit modal triggers
  const handleOpenQuitModal = () => {
    setIsQuitModalOpen(true);
  };

  const handleConfirmQuit = () => {
    setIsQuitModalOpen(false);
    setStep('welcome');
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {step === 'welcome' && (
          <QuizWelcome onStart={() => setStep('select')} />
        )}

        {step === 'select' && (
          <QuizTopicSelect
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            totalAvailableQuestions={QUIZ_QUESTIONS.length}
            onStartQuiz={handleStartQuiz}
            onBack={() => setStep('welcome')}
          />
        )}

        {step === 'quiz' && activeQuestions.length > 0 && (
          <QuizPlay
            question={activeQuestions[currentIndex]}
            currentIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            onNextQuestion={handleNextQuestion}
            onQuitQuiz={handleOpenQuitModal}
          />
        )}

        {step === 'result' && (
          <QuizResult
            score={score}
            totalQuestions={activeQuestions.length}
            history={history}
            onViewResults={() => setStep('review')}
            onRetakeQuiz={handleRetakeQuiz}
            onChangeTopics={handleChangeTopics}
          />
        )}

        {step === 'review' && (
          <QuizReview
            history={history}
            onBackToScore={() => setStep('result')}
            onRetakeQuiz={handleRetakeQuiz}
            onChangeTopics={handleChangeTopics}
          />
        )}
      </div>

      {/* Modern Custom Quit Confirmation Modal */}
      <ConfirmQuitModal
        isOpen={isQuitModalOpen}
        onCancel={() => setIsQuitModalOpen(false)}
        onConfirm={handleConfirmQuit}
        currentQuestion={currentIndex + 1}
        totalQuestions={activeQuestions.length}
      />
    </MainLayout>
  );
};

export default DevQuiz;
