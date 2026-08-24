import React, { useState } from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa6';

// Helper to tokenize and highlight code with VS Code / GitHub inspired themes
function highlightCode(code) {
  if (!code) return '';

  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    // Token replacement using regex
    // 1. Comments
    if (/^\s*(\/\/|#|\/\*|--|<!--)/.test(line)) {
      return (
        <span key={lineIndex} className="text-[#6e7781] dark:text-[#8b949e] italic">
          {line}
        </span>
      );
    }

    // Split line by tokens
    const tokens = line.split(/(".*?"|'.*?'|`.*?`|\b(?:const|let|var|function|return|if|else|elif|for|while|import|export|from|default|class|extends|implements|new|this|super|typeof|instanceof|async|await|try|catch|finally|throw|throws|switch|case|break|continue|interface|type|enum|public|private|protected|static|final|abstract|synchronized|volatile|void|int|double|float|long|short|byte|char|boolean|def|self|lambda|with|as|yield|pass|raise|except|in|is|not|and|or|readonly|keyof|never|any|unknown|SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|GROUP|BY|ORDER|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|ALTER|DROP|LIMIT|OFFSET|UNION|ON|DISTINCT|CASE|WHEN|THEN|END)\b|\b(?:true|false|null|undefined|None|True|False|NULL)\b|\b\d+(?:\.\d+)?\b|\b(?:console|Promise|setTimeout|setInterval|clearTimeout|clearInterval|Math|Object|Array|JSON|String|Number|Boolean|Map|Set|WeakMap|WeakSet|Symbol|BigInt|process|window|document|System|out|println|print|len|range|enumerate|zip|List|ArrayList|LinkedList|HashMap|HashSet|Optional|Stream|CompletableFuture|Thread|React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|useActionState|useOptimistic|useId|NextResponse|NextRequest|COUNT|SUM|AVG|MIN|MAX|ROW_NUMBER|PARTITION|OVER|COALESCE)\b|[{}()[\].,;:+\-*/%=<>!&|^~?])/g);

    return (
      <span key={lineIndex} className="block">
        {tokens.map((token, tokIdx) => {
          if (!token) return null;

          // Strings
          if (/^(".*?"|'.*?'|`.*?`)$/.test(token)) {
            return (
              <span key={tokIdx} className="text-[#0a3069] dark:text-[#a5d6ff]">
                {token}
              </span>
            );
          }

          // Keywords
          if (/^(const|let|var|function|return|if|else|elif|for|while|import|export|from|default|class|extends|implements|new|this|super|typeof|instanceof|async|await|try|catch|finally|throw|throws|switch|case|break|continue|interface|type|enum|public|private|protected|static|final|abstract|synchronized|volatile|void|int|double|float|long|short|byte|char|boolean|def|self|lambda|with|as|yield|pass|raise|except|in|is|not|and|or|readonly|keyof|never|any|unknown|SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|GROUP|BY|ORDER|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|ALTER|DROP|LIMIT|OFFSET|UNION|ON|DISTINCT|CASE|WHEN|THEN|END)$/.test(token)) {
            return (
              <span key={tokIdx} className="text-[#cf222e] dark:text-[#ff7b72] font-semibold">
                {token}
              </span>
            );
          }

          // Built-ins
          if (/^(console|Promise|setTimeout|setInterval|clearTimeout|clearInterval|Math|Object|Array|JSON|String|Number|Boolean|Map|Set|WeakMap|WeakSet|Symbol|BigInt|process|window|document|System|out|println|print|len|range|enumerate|zip|List|ArrayList|LinkedList|HashMap|HashSet|Optional|Stream|CompletableFuture|Thread|React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|useActionState|useOptimistic|useId|NextResponse|NextRequest|COUNT|SUM|AVG|MIN|MAX|ROW_NUMBER|PARTITION|OVER|COALESCE)$/.test(token)) {
            return (
              <span key={tokIdx} className="text-[#953800] dark:text-[#ffa657] font-medium">
                {token}
              </span>
            );
          }

          // Booleans & Null
          if (/^(true|false|null|undefined|None|True|False|NULL)$/.test(token)) {
            return (
              <span key={tokIdx} className="text-[#0550ae] dark:text-[#79c0ff] font-medium">
                {token}
              </span>
            );
          }

          // Numbers
          if (/^\d+(\.\d+)?$/.test(token)) {
            return (
              <span key={tokIdx} className="text-[#116329] dark:text-[#7ee787]">
                {token}
              </span>
            );
          }

          // Operators & Punctuation
          if (/^[{}()[\].,;:+\-*/%=<>!&|^~?]$/.test(token)) {
            return (
              <span key={tokIdx} className="text-[#24292f] dark:text-[#c9d1d9] opacity-80">
                {token}
              </span>
            );
          }

          // Identifiers & standard text
          return (
            <span key={tokIdx} className="text-[#24292f] dark:text-[#e6edf3]">
              {token}
            </span>
          );
        })}
      </span>
    );
  });
}

const CodeSnippet = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const lineCount = code ? code.split('\n').length : 1;

  return (
    <div className="my-3 rounded-lg border border-(--border-light) bg-[#f6f8fa] dark:bg-[#0d1117] overflow-hidden shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#eaeef2] dark:bg-[#161b22] border-b border-(--border-light) text-[11px] text-(--text-gray)">
        <div className="flex items-center gap-2 font-mono uppercase tracking-wider font-semibold whitespace-nowrap shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block shrink-0" />
          <span className="ml-1 text-(--text-light) opacity-80 whitespace-nowrap">{language}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] text-(--text-gray) hover:text-(--text-light) transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-(--pixel-hover) whitespace-nowrap shrink-0"
          title="Copy code"
        >
          {copied ? (
            <>
              <FaCheck size={11} className="text-(--sucess) shrink-0" />
              <span className="text-(--sucess) font-medium">Copied</span>
            </>
          ) : (
            <>
              <FaCopy size={11} className="shrink-0" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="flex text-xs sm:text-sm font-mono overflow-x-auto p-3 leading-relaxed">
        {/* Line Numbers */}
        <div className="select-none pr-3.5 text-right text-(--text-gray)/50 border-r border-(--border-light)/40 font-mono text-xs shrink-0 flex flex-col">
          {Array.from({ length: lineCount }).map((_, i) => (
            <span key={i} className="leading-relaxed">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Highlighted Code */}
        <pre className="pl-3.5 flex-1 m-0 overflow-visible font-mono">
          <code>{highlightCode(code)}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
