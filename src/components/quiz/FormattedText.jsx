import React from 'react';

/**
 * Helper component that renders text with backticks (`code`) formatted as sleek GitHub-style inline code badges.
 */
const FormattedText = ({ text, className = '' }) => {
  if (!text) return null;

  // Split by backticks `...`
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          const codeContent = part.slice(1, -1);
          return (
            <code
              key={index}
              className="mx-0.5 px-1.5 py-0.5 rounded-md font-mono text-[0.9em] font-medium bg-(--pixel) text-(--code-inline-text) border border-(--border-light) inline-block align-baseline tracking-tight"
            >
              {codeContent}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

export default FormattedText;
