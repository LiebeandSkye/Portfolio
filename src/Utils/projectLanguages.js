export const LANGUAGE_STYLES = {
  javascript: { label: 'JavaScript', color: '#f1e05a' },
  typescript: { label: 'TypeScript', color: '#3178c6' },
  kotlin: { label: 'Kotlin', color: '#A97BFF' },
  xml: { label: 'XML', color: '#0060ac' },
  css: { label: 'CSS', color: '#563d7c' },
  html: { label: 'HTML', color: '#e34c26' },
  python: { label: 'Python', color: '#3572A5' },
  plpgsql: { label: 'PLpgSQL', color: '#336790' },
  sql: { label: 'SQL', color: '#e38c00' },
  java: { label: 'Java', color: '#b07219' },
  c: { label: 'C', color: '#555555' },
  cpp: { label: 'C++', color: '#f34b7d' },
  csharp: { label: 'C#', color: '#178600' },
  go: { label: 'Go', color: '#00ADD8' },
  rust: { label: 'Rust', color: '#dea584' },
  dart: { label: 'Dart', color: '#00B4AB' },
  swift: { label: 'Swift', color: '#F05138' },
  ruby: { label: 'Ruby', color: '#701516' },
  php: { label: 'PHP', color: '#4F5D95' },
  shell: { label: 'Shell', color: '#89e051' },
};

const DEFAULT_LANGUAGE = {
  key: 'javascript',
  label: 'JavaScript',
  color: '#f1e05a',
  percent: 0,
};

/**
 * Resolves the dominant programming language for a given project.
 * Uses `project.percent` (highest percentage), falling back to `project.tags`
 * or a default JavaScript entry.
 */
export function getDominantLanguage(project) {
  if (!project || typeof project !== 'object') {
    return DEFAULT_LANGUAGE;
  }

  // Explicit override if provided
  if (project.dominantLanguage) {
    if (typeof project.dominantLanguage === 'string') {
      const key = project.dominantLanguage.toLowerCase();
      const style = LANGUAGE_STYLES[key];
      return {
        key,
        label: style?.label || project.dominantLanguage,
        color: style?.color || '#8b949e',
        percent: 100,
      };
    }
    if (typeof project.dominantLanguage === 'object') {
      return {
        key: project.dominantLanguage.key || 'unknown',
        label: project.dominantLanguage.label || project.dominantLanguage.name || 'Unknown',
        color: project.dominantLanguage.color || '#8b949e',
        percent: project.dominantLanguage.percent ?? 100,
      };
    }
  }

  // Determine from percent breakdown
  if (project.percent && typeof project.percent === 'object') {
    let maxKey = null;
    let maxVal = -Infinity;

    for (const [key, val] of Object.entries(project.percent)) {
      const num = Number(val);
      if (!Number.isNaN(num) && num > maxVal) {
        maxVal = num;
        maxKey = key;
      }
    }

    if (maxKey) {
      const normalizedKey = maxKey.toLowerCase();
      const style = LANGUAGE_STYLES[normalizedKey];
      const fallbackLabel =
        project.languages?.[maxKey] ||
        project.languages?.[normalizedKey] ||
        (normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1));

      return {
        key: normalizedKey,
        label: style?.label || fallbackLabel,
        color: style?.color || '#8b949e',
        percent: maxVal,
      };
    }
  }

  // Fallback: search tags for a matching programming language
  if (Array.isArray(project.tags)) {
    for (const tag of project.tags) {
      const normalizedTag = String(tag).toLowerCase().replace(/\s+/g, '');
      if (LANGUAGE_STYLES[normalizedTag]) {
        return {
          key: normalizedTag,
          label: LANGUAGE_STYLES[normalizedTag].label,
          color: LANGUAGE_STYLES[normalizedTag].color,
          percent: 0,
        };
      }
      for (const [key, style] of Object.entries(LANGUAGE_STYLES)) {
        if (style.label.toLowerCase() === String(tag).toLowerCase()) {
          return {
            key,
            label: style.label,
            color: style.color,
            percent: 0,
          };
        }
      }
    }
  }

  return DEFAULT_LANGUAGE;
}
