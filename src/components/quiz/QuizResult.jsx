import React from 'react';
import { FaTrophy, FaRotateLeft, FaListCheck, FaArrowRight, FaBrain } from 'react-icons/fa6';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import TopicIcon from './TopicIcon';

const QuizResult = ({
  score,
  totalQuestions,
  history,
  onViewResults,
  onRetakeQuiz,
  onChangeTopics,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const incorrectCount = totalQuestions - score;

  // Compute category breakdown
  const categoryStats = history.reduce((acc, item) => {
    const catId = item.question.category;
    const catName = item.question.categoryName;
    if (!acc[catId]) {
      acc[catId] = { id: catId, name: catName, correct: 0, total: 0 };
    }
    acc[catId].total += 1;
    if (item.isCorrect) {
      acc[catId].correct += 1;
    }
    return acc;
  }, {});

  // Mastery badge logic
  let masteryTitle = 'Good Effort! Keep Practicing';
  let masteryDesc = 'Review your mistakes below to turn your knowledge gaps into strengths.';
  let badgeColor = 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';

  if (percentage === 100) {
    masteryTitle = 'Perfect Score! Absolute Master';
    masteryDesc = 'You demonstrated complete mastery across all tested developer domains!';
    badgeColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  } else if (percentage >= 80) {
    masteryTitle = 'Excellent Performance!';
    masteryDesc = 'You have a deep and solid understanding of these core technologies.';
    badgeColor = 'text-blue-400 border-blue-500/30 bg-blue-500/10';
  } else if (percentage >= 60) {
    masteryTitle = 'Well Done! On the Path to Mastery';
    masteryDesc = 'Solid foundation. A quick review will make you unstoppable.';
    badgeColor = 'text-purple-400 border-purple-500/30 bg-purple-500/10';
  }

  return (
    <div className="border border-(--border-light) w-full py-8 px-4 sm:px-8 flex flex-col items-center">
      {/* Top Breadcrumb */}
      <div className="w-full flex items-center justify-between text-xs text-(--text-gray) mb-6 pb-2 border-b border-(--border-light)/40">
        <p>
          Kry-Rithisak<span className="text-(--text-gray)"> / </span>DevQuiz
          <span className="text-(--text-gray)"> / Results</span>
        </p>
        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-(--border-light) bg-(--pixel)">
          <FaBrain className="text-(--sucess)" size={12} /> Score Report
        </span>
      </div>

      {/* Main Score Header Card */}
      <div className="max-w-xl w-full text-center flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-(--sucess)/10 border border-(--sucess)/30 flex items-center justify-center text-(--sucess) mb-4">
          <FaTrophy size={28} />
        </div>

        <div className={`px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${badgeColor}`}>
          {masteryTitle}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-(--text-light) mb-2">
          {score} <span className="text-2xl text-(--text-gray) font-normal">/ {totalQuestions}</span>
        </h1>

        <p className="text-lg font-bold text-(--sucess) mb-2">
          {percentage}% Accuracy
        </p>

        <p className="text-xs sm:text-sm text-(--text-gray) max-w-md">
          {masteryDesc}
        </p>
      </div>

      {/* Summary Cards: Right vs Wrong */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
        <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/5 flex items-center gap-3">
          <FaCheckCircle className="text-green-400 shrink-0" size={24} />
          <div>
            <p className="text-xl sm:text-2xl font-bold text-green-400">{score}</p>
            <p className="text-xs text-(--text-gray) font-medium">Correct Answers</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <FaTimesCircle className="text-red-400 shrink-0" size={24} />
          <div>
            <p className="text-xl sm:text-2xl font-bold text-red-400">{incorrectCount}</p>
            <p className="text-xs text-(--text-gray) font-medium">Incorrect Answers</p>
          </div>
        </div>
      </div>

      {/* Breakdown By Category with TopicIcons */}
      <div className="w-full max-w-lg mb-8 border border-(--border-light) rounded-xl p-4 sm:p-5 bg-(--pixel)/40">
        <h3 className="text-xs font-bold text-(--text-gray) uppercase tracking-wider mb-3">
          Topic Breakdown
        </h3>
        <div className="flex flex-col gap-3">
          {Object.values(categoryStats).map((stats) => {
            const catPercent = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={stats.id} className="flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between text-(--text-light)">
                  <div className="flex items-center gap-2">
                    <TopicIcon categoryId={stats.id} size={12} className="w-4 h-4 rounded-xs border-0 bg-transparent" />
                    <span className="font-medium">{stats.name}</span>
                  </div>
                  <span className="font-mono text-(--text-gray)">
                    {stats.correct}/{stats.total} ({catPercent}%)
                  </span>
                </div>
                <div className="w-full bg-(--border-light)/40 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      catPercent >= 80
                        ? 'bg-green-500'
                        : catPercent >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-400'
                    }`}
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prominent Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg justify-center">
        <button
          onClick={onViewResults}
          className="w-full sm:w-auto bg-(--sucess) hover:bg-(--sucess-hover) text-white font-semibold py-2.5 px-6 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 text-sm shadow-sm"
        >
          <FaListCheck size={14} />
          View Results & Explanations
          <FaArrowRight size={12} />
        </button>

        <button
          onClick={onRetakeQuiz}
          className="w-full sm:w-auto border border-(--border-light) bg-(--pixel) hover:bg-(--pixel-hover) text-(--text-light) font-semibold py-2.5 px-5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          <FaRotateLeft size={13} />
          Retake Quiz
        </button>

        <button
          onClick={onChangeTopics}
          className="w-full sm:w-auto text-xs text-(--text-gray) hover:text-(--text-light) py-2 px-3 transition-colors cursor-pointer text-center"
        >
          Change Topics
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
