import React, { useState } from 'react';
import { QUIZ_CATEGORIES } from '../../Data/quizData';
import { FaCheck, FaArrowLeft, FaPlay } from 'react-icons/fa6';
import { LuCheckCheck, LuX } from 'react-icons/lu';
import TopicIcon from './TopicIcon';

const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 'All'];

const QuizTopicSelect = ({
  selectedCategories,
  setSelectedCategories,
  questionCount,
  setQuestionCount,
  totalAvailableQuestions,
  onStartQuiz,
  onBack,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const toggleCategory = (catId) => {
    setErrorMsg('');
    setSelectedCategories((prev) => {
      if (prev.includes(catId)) {
        return prev.filter((id) => id !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const handleSelectAll = () => {
    setErrorMsg('');
    setSelectedCategories(QUIZ_CATEGORIES.map((c) => c.id));
  };

  const handleDeselectAll = () => {
    setSelectedCategories([]);
    setErrorMsg('Please select at least one topic to start.');
  };

  const handleStart = () => {
    if (selectedCategories.length === 0) {
      setErrorMsg('Please select at least one topic to continue.');
      return;
    }
    onStartQuiz();
  };

  return (
    <div className="border border-(--border-light) w-full py-6 px-4 sm:px-6 flex flex-col">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between text-xs text-(--text-gray) mb-6 pb-2 border-b border-(--border-light)/40">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-(--text-light) hover:text-(--sucess) transition-colors cursor-pointer"
        >
          <FaArrowLeft size={12} /> Back to Welcome
        </button>
        <span className="text-[11px] text-(--text-gray)">
          {selectedCategories.length} of {QUIZ_CATEGORIES.length} topics selected
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-(--text-light) mb-1">
          Select Your Quiz Topics
        </h2>
        <p className="text-xs sm:text-sm text-(--text-gray)">
          Choose the technologies you want to test. Master every core area from HTML to Cloud architecture.
        </p>
      </div>

      {/* Select / Deselect All Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-md border border-(--border-light) bg-(--pixel) hover:bg-(--pixel-hover) text-(--text-light) transition-colors cursor-pointer"
          >
            <LuCheckCheck size={14} className="text-(--sucess)" /> Select All
          </button>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-md border border-(--border-light) bg-(--pixel) hover:bg-(--pixel-hover) text-(--text-light) transition-colors cursor-pointer"
          >
            <LuX size={14} className="text-red-400" /> Deselect All
          </button>
        </div>

        <span className="text-xs text-(--text-gray)">
          {totalAvailableQuestions} questions available in bank
        </span>
      </div>

      {errorMsg && (
        <div className="mb-4 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Topic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {QUIZ_CATEGORIES.map((cat) => {
          const isChecked = selectedCategories.includes(cat.id);
          return (
            <label
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-150 cursor-pointer select-none ${
                isChecked
                  ? 'border-(--sucess) bg-(--sucess)/5 shadow-[0_0_0_1px_rgba(9,105,218,0.1)]'
                  : 'border-(--border-light) hover:border-(--text-gray) bg-transparent'
              }`}
            >
              {/* Checkbox Icon */}
              <div
                className={`mt-1 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                  isChecked
                    ? 'bg-(--sucess) border-(--sucess) text-white'
                    : 'border-(--border-light) bg-(--pixel)'
                }`}
              >
                {isChecked && <FaCheck size={10} />}
              </div>

              {/* Authentic Topic Icon */}
              <TopicIcon categoryId={cat.id} size={16} className="mt-0.5" />

              {/* Topic Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-(--text-light)">
                    {cat.name}
                  </span>
                </div>
                <p className="text-xs text-(--text-gray) mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Question Count Selection */}
      <div className="border-t border-(--border-light) pt-5 mb-6">
        <label className="block text-sm font-semibold text-(--text-light) mb-2">
          Number of Questions
        </label>
        <div className="flex flex-wrap gap-2">
          {QUESTION_COUNT_OPTIONS.map((count) => {
            const isSelected = questionCount === count;
            return (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`py-1.5 px-4 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-(--sucess) border-(--sucess) text-white shadow-sm'
                    : 'border-(--border-light) bg-(--pixel) text-(--text-light) hover:border-(--text-gray)'
                }`}
              >
                {count === 'All' ? `All Available (${totalAvailableQuestions})` : `${count} Questions`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-(--border-light) flex-wrap gap-3">
        <button
          onClick={onBack}
          className="text-xs sm:text-sm text-(--text-gray) hover:text-(--text-light) py-2 px-3 rounded-md hover:bg-(--pixel) transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={handleStart}
          disabled={selectedCategories.length === 0}
          className="bg-(--sucess) hover:bg-(--sucess-hover) text-white font-semibold py-2 px-6 rounded-md transition-all cursor-pointer flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <FaPlay size={12} />
          Start Quiz ({selectedCategories.length} Topics)
        </button>
      </div>
    </div>
  );
};

export default QuizTopicSelect;
