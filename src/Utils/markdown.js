// src/utils/markdown.js
export function cleanMarkdown(text) {
  if (!text) return '';

  return text
    .replace(/([^\n])\n([^\n-•*])/g, '$1  \n$2')     // force soft line break with two spaces
    .replace(/([^\n])\n\n([^\n])/g, '$1\n\n\n$2')    // enforce extra newline between paragraphs
    .replace(/```(\w+)?\n/g, '```$1\n\n')            // ensure blank line after code fence
    .replace(/\n{4,}/g, '\n\n\n')                    // collapse too many blank lines
    .trim();
}