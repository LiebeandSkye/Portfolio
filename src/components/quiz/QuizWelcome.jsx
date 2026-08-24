import React from 'react';
import { FaBrain } from 'react-icons/fa6';

const QuizWelcome = ({ onStart }) => {
  return (
    <div className="border border-(--border-light) w-full py-6 px-4 sm:px-8 flex flex-col items-center justify-center min-h-[460px] text-center">
      <div className="w-full flex items-center justify-between text-xs text-(--text-gray) mb-6 pb-2 border-b border-(--border-light)/40">
        <p>
          Kry-Rithisak<span className="text-(--text-gray)"> / </span>DevQuiz
          <span className="text-(--text-gray)">.jsx</span>
        </p>
        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-(--border-light) bg-(--pixel)">
          <FaBrain className="text-(--sucess)" size={12} /> Interactive
        </span>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center my-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-light) mb-4">
          Welcome to Dev Quiz
        </h1>

        <div className="w-full h-[1px] bg-(--border-light) mb-8" />

        <div className="flex flex-col gap-5 text-sm sm:text-base text-(--text-gray) leading-relaxed">
          <p>
            As developers, there's always a ton to keep in mind. Like any skill, memory needs regular practice.
            I've always enjoyed using quizzes and flashcards to sharpen my brain for those tricky concepts, so
            I went ahead and built my own.
          </p>

          <p>
            No difficulty levels here! questions are pulled at random, mixing everything from beginner to advanced.
          </p>

          <p className="text-base sm:text-lg font-semibold text-(--text-light) pt-2">
            Have Fun 💪
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-(--text-gray) my-8 tracking-wide font-medium">
          <span>Pick a topic</span>
          <span className="text-(--sucess) font-bold">&gt;</span>
          <span>Set the number of questions</span>
          <span className="text-(--sucess) font-bold">&gt;</span>
          <span className="text-(--text-light) font-semibold">START</span>
        </div>

        <button
          onClick={onStart}
          className="bg-(--sucess) hover:bg-(--sucess-hover) text-white font-semibold py-2.5 px-8 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base flex items-center gap-2"
        >
          <FaBrain size={16} />
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizWelcome;
