import React, { useState } from 'react';
import { FaArrowLeft, FaCheck, FaXmark, FaRotateLeft } from 'react-icons/fa6';
import { FaLightbulb, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import CodeSnippet from './CodeSnippet';
import FormattedText from './FormattedText';
import TopicIcon from './TopicIcon';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const QuizReview = ({ history, onBackToScore, onRetakeQuiz, onChangeTopics }) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'correct' | 'incorrect'

  const filteredHistory = history.filter((item) => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'incorrect') return !item.isCorrect;
    return true;
  });

  const correctCount = history.filter((h) => h.isCorrect).length;
  const incorrectCount = history.length - correctCount;

  return (
    <div className="border border-(--border-light) w-full py-6 px-4 sm:px-6 flex flex-col">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs text-(--text-gray) mb-6 pb-2 border-b border-(--border-light)/40 flex-wrap gap-2">
        <button
          onClick={onBackToScore}
          className="flex items-center gap-1.5 text-(--text-light) hover:text-(--sucess) transition-colors cursor-pointer"
        >
          <FaArrowLeft size={12} /> Back to Score Summary
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetakeQuiz}
            className="flex items-center gap-1 text-xs text-(--text-gray) hover:text-(--sucess) transition-colors cursor-pointer"
          >
            <FaRotateLeft size={11} /> Retake
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-(--text-light) mb-1">
          Detailed Answer History & Explanations
        </h2>
        <p className="text-xs sm:text-sm text-(--text-gray)">
          Review each question to understand why the correct answer is right and master these core concepts.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-(--border-light) pb-3 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-(--sucess) text-white'
              : 'border border-(--border-light) bg-(--pixel) text-(--text-light) hover:bg-(--pixel-hover)'
          }`}
        >
          All Questions ({history.length})
        </button>

        <button
          onClick={() => setFilter('correct')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            filter === 'correct'
              ? 'bg-green-600 text-white'
              : 'border border-(--border-light) bg-(--pixel) text-green-500 hover:bg-(--pixel-hover)'
          }`}
        >
          <FaCheckCircle size={12} /> Correct ({correctCount})
        </button>

        <button
          onClick={() => setFilter('incorrect')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
            filter === 'incorrect'
              ? 'bg-red-600 text-white'
              : 'border border-(--border-light) bg-(--pixel) text-red-400 hover:bg-(--pixel-hover)'
          }`}
        >
          <FaTimesCircle size={12} /> Incorrect ({incorrectCount})
        </button>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-6">
        {filteredHistory.map((item, index) => {
          const { question, selectedAnswer, isCorrect } = item;

          return (
            <div
              key={question.id || index}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                isCorrect
                  ? 'border-green-500/30 bg-green-500/[0.02]'
                  : 'border-red-500/30 bg-red-500/[0.02]'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-(--text-gray)">
                    #{index + 1}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-(--pixel) text-(--text-light) border border-(--border-light)">
                    <TopicIcon categoryId={question.category} size={12} className="w-4 h-4 rounded-sm border-0 bg-transparent" />
                    <span>{question.categoryName}</span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    isCorrect
                      ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                      : 'bg-red-500/15 text-red-400 border border-red-500/30'
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <FaCheck size={10} /> Correct
                    </>
                  ) : (
                    <>
                      <FaXmark size={10} /> Incorrect
                    </>
                  )}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="font-semibold text-sm sm:text-base text-(--text-light) mb-3 leading-relaxed">
                <FormattedText text={question.question} />
              </h3>

              {/* Formatted Code Snippet */}
              {question.codeSnippet && (
                <CodeSnippet code={question.codeSnippet} language={question.language || question.category} />
              )}

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 mb-4">
                {question.options.map((optText, optIdx) => {
                  const isUserPick = selectedAnswer === optIdx;
                  const isRightAnswer = optIdx === question.correctIndex;

                  let optCardStyle = 'border-(--border-light)/40 bg-transparent text-(--text-gray) opacity-60';
                  let pillStyle = 'border-(--border-light) bg-(--pixel) text-(--text-gray)';

                  if (isRightAnswer) {
                    optCardStyle = 'border-green-500/60 bg-green-500/10 text-green-300 font-medium opacity-100 shadow-[0_0_0_1px_rgba(34,197,94,0.2)]';
                    pillStyle = 'bg-green-500 border-green-500 text-white';
                  } else if (isUserPick && !isRightAnswer) {
                    optCardStyle = 'border-red-500/60 bg-red-500/10 text-red-300 opacity-100 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]';
                    pillStyle = 'bg-red-500 border-red-500 text-white';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 transition-colors ${optCardStyle}`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 text-[11px] font-bold border ${pillStyle}`}
                      >
                        {OPTION_LABELS[optIdx]}
                      </div>
                      <span className="flex-1 pt-0.5 leading-relaxed text-(--text-light)">
                        <FormattedText text={optText} />
                      </span>
                      {isUserPick && !isRightAnswer && (
                        <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider shrink-0 mt-0.5">
                          Your Choice
                        </span>
                      )}
                      {isRightAnswer && (
                        <span className="text-[10px] uppercase font-bold text-green-400 tracking-wider shrink-0 mt-0.5">
                          Correct Answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <div className="p-3.5 rounded-lg border border-(--border-light) bg-(--pixel)/60">
                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-(--text-light)">
                  <FaLightbulb className="text-yellow-400" size={13} />
                  <span>Explanation:</span>
                </div>
                <p className="text-xs sm:text-sm text-(--text-light)/90 leading-relaxed">
                  <FormattedText text={question.explanation} />
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-(--border-light) flex-wrap gap-3">
        <button
          onClick={onBackToScore}
          className="text-xs sm:text-sm text-(--text-gray) hover:text-(--text-light) py-2 px-3 rounded-md hover:bg-(--pixel) transition-colors cursor-pointer"
        >
          &larr; Back to Score Report
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onChangeTopics}
            className="text-xs sm:text-sm text-(--text-gray) hover:text-(--text-light) py-2 px-3 rounded-md hover:bg-(--pixel) transition-colors cursor-pointer"
          >
            Change Topics
          </button>
          <button
            onClick={onRetakeQuiz}
            className="bg-(--sucess) hover:bg-(--sucess-hover) text-white font-semibold py-2 px-5 rounded-md transition-all cursor-pointer text-xs sm:text-sm shadow-sm"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizReview;
