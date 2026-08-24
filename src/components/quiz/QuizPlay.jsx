import React from 'react';
import { FaCheck, FaXmark, FaArrowRight, FaRotateLeft } from 'react-icons/fa6';
import { FaLightbulb } from 'react-icons/fa';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const QuizPlay = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  onQuitQuiz,
}) => {
  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === question.correctIndex;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const progressPercent = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100);

  return (
    <div className="border border-(--border-light) w-full py-6 px-4 sm:px-6 flex flex-col">
      {/* Header bar: Progress & Topic */}
      <div className="w-full flex items-center justify-between text-xs text-(--text-gray) mb-4 pb-3 border-b border-(--border-light)/50 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-(--text-light)">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-(--text-gray)">•</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-(--pixel) text-(--text-light) border border-(--border-light)">
            {question.categoryName}
          </span>
        </div>

        <button
          onClick={onQuitQuiz}
          className="flex items-center gap-1 text-(--text-gray) hover:text-red-400 transition-colors text-xs cursor-pointer"
        >
          <FaRotateLeft size={11} /> Quit Quiz
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-(--pixel) h-1.5 rounded-full overflow-hidden mb-6">
        <div
          className="bg-(--sucess) h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-(--text-light) leading-relaxed">
          {question.question}
        </h2>

        {/* Code Snippet if applicable */}
        {question.codeSnippet && (
          <div className="mt-3 p-3 bg-(--code-block-bg) rounded-lg border border-(--border-light)/30 overflow-x-auto text-xs sm:text-sm font-mono text-gray-200">
            <pre>{question.codeSnippet}</pre>
          </div>
        )}
      </div>

      {/* Options List (QCM: 4 options) */}
      <div className="flex flex-col gap-2.5 mb-6">
        {question.options.map((optionText, optIndex) => {
          const isSelected = selectedAnswer === optIndex;
          const isOptionCorrect = optIndex === question.correctIndex;

          let optionStyle = 'border-(--border-light) bg-transparent hover:border-(--text-gray) hover:bg-(--pixel)';
          let badgeStyle = 'bg-(--pixel) text-(--text-gray) border-(--border-light)';

          if (isAnswered) {
            if (isOptionCorrect) {
              // Right answer highlight (always green)
              optionStyle = 'border-green-500 bg-green-500/10 text-green-400 font-medium shadow-[0_0_0_1px_rgba(34,197,94,0.3)]';
              badgeStyle = 'bg-green-500 text-white border-green-500';
            } else if (isSelected && !isOptionCorrect) {
              // User's wrong answer highlight (red)
              optionStyle = 'border-red-500 bg-red-500/10 text-red-400 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]';
              badgeStyle = 'bg-red-500 text-white border-red-500';
            } else {
              // Other unselected answers
              optionStyle = 'border-(--border-light)/40 opacity-50 bg-transparent';
              badgeStyle = 'bg-(--pixel) text-(--text-gray) border-(--border-light)/40';
            }
          }

          return (
            <button
              key={optIndex}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelectAnswer(optIndex)}
              className={`w-full text-left p-3 sm:p-3.5 rounded-lg border text-xs sm:text-sm transition-all duration-150 flex items-start gap-3 cursor-pointer disabled:cursor-default ${optionStyle}`}
            >
              {/* Option Letter Pill */}
              <div
                className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-xs font-bold border transition-colors ${badgeStyle}`}
              >
                {isAnswered && isOptionCorrect ? (
                  <FaCheck size={12} />
                ) : isAnswered && isSelected && !isOptionCorrect ? (
                  <FaXmark size={12} />
                ) : (
                  OPTION_LABELS[optIndex]
                )}
              </div>

              {/* Option Text */}
              <span className="flex-1 pt-0.5 leading-relaxed text-(--text-light)">
                {optionText}
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation Container (Appears immediately after selecting an answer) */}
      {isAnswered && (
        <div
          className={`p-4 rounded-lg border mb-6 transition-all duration-200 ${
            isCorrect
              ? 'bg-green-500/5 border-green-500/30'
              : 'bg-orange-500/5 border-orange-500/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className={isCorrect ? 'text-green-400' : 'text-orange-400'} size={15} />
            <h3 className="font-bold text-sm text-(--text-light)">
              Explanation
            </h3>
            <span
              className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                isCorrect
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {isCorrect ? 'Correct! 🎉' : `Incorrect (Correct: Option ${OPTION_LABELS[question.correctIndex]})`}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-(--text-light) leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next Question / Finish Button */}
      {isAnswered && (
        <div className="flex justify-end pt-3 border-t border-(--border-light)">
          <button
            onClick={onNextQuestion}
            className="bg-(--sucess) hover:bg-(--sucess-hover) text-white font-semibold py-2 px-6 rounded-md transition-all cursor-pointer flex items-center gap-2 text-sm shadow-sm"
          >
            {isLastQuestion ? 'Finish Quiz & View Score' : 'Next Question'}
            <FaArrowRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPlay;
