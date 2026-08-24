export const QUIZ_CATEGORIES = [
  {
    id: 'react',
    name: 'React',
    description: 'Components, hooks, state lifecycle, virtual DOM, and React 19 patterns.',
  },
  {
    id: 'html',
    name: 'HTML',
    description: 'Semantic markup, accessibility, forms, modern APIs, and web fundamentals.',
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'Flexbox, Grid, CSS box model, specificity, animations, and modern units.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Closures, Event Loop, prototypes, async/await, scope, and ES6+ features.',
  },
  {
    id: 'java',
    name: 'Java',
    description: 'JVM architecture, OOP, Collections, Concurrency, and Spring fundamentals.',
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Data structures, list comprehensions, decorators, GIL, and OOP.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Event-driven I/O, streams, buffers, modules, and backend microservices.',
  },
  {
    id: 'database',
    name: 'Database',
    description: 'SQL vs NoSQL, ACID, B-Tree indexes, transactions, joins, and caching.',
  },
  {
    id: 'api',
    name: 'API',
    description: 'REST constraints, GraphQL, WebSockets, HTTP methods, status codes, and auth.',
  },
  {
    id: 'core_concepts',
    name: 'Core concepts',
    description: 'Essential fundamentals including OOP, Data Structures, Algorithms, and problem-solving patterns.',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Cloud services overview (AWS, Azure, GCP), deployments, IaC, serverless, scaling, and more.',
  },
  {
    id: 'typescript',
    name: 'Typescript',
    description: 'Types, interfaces, generics, type narrowing, utility types, and strict mode.',
  },
  {
    id: 'nextjs',
    name: 'NextJs',
    description: 'App Router, Server Components, SSR/SSG/ISR, routing, and Server Actions.',
  },
];

export const QUIZ_QUESTIONS = [
  // ─────────────────────────────────────────────────────────────
  // 1. HTML
  // ─────────────────────────────────────────────────────────────
  {
    id: 'html-1',
    category: 'html',
    categoryName: 'HTML',
    question: 'What is the primary benefit of using semantic HTML elements like `<article>`, `<section>`, and `<nav>`?',
    options: [
      'They automatically apply default responsive CSS grid layouts',
      'They improve accessibility for screen readers and SEO by describing the meaning of content',
      'They prevent JavaScript errors by strictly typing HTML node elements',
      'They make browser rendering 10x faster by bypassing the CSSOM parser'
    ],
    correctIndex: 1,
    explanation: 'Semantic elements give structural meaning to web pages. This enables search engines and screen readers (assistive technologies) to accurately parse the structure and importance of your content.'
  },
  {
    id: 'html-2',
    category: 'html',
    categoryName: 'HTML',
    question: 'What does the `defer` attribute do when added to a `<script>` tag?',
    options: [
      'It pauses HTML parsing immediately until the script downloads and executes',
      'It downloads the script asynchronously and executes it only after the HTML document is fully parsed',
      'It executes the script before any CSS stylesheets are loaded',
      'It defers execution until the user clicks or scrolls on the page'
    ],
    correctIndex: 1,
    explanation: '`defer` tells the browser to download the script in parallel while continuing to parse the HTML. The script executes only after HTML parsing is complete (in document order), preventing render blocking.'
  },
  {
    id: 'html-3',
    category: 'html',
    categoryName: 'HTML',
    question: 'Which HTML attribute is essential on responsive images to prevent Cumulative Layout Shift (CLS)?',
    options: [
      '`loading="eager"`',
      'Explicit `width` and `height` attributes (or `aspect-ratio` in CSS)',
      '`alt="decorative"`',
      '`decoding="sync"`'
    ],
    correctIndex: 1,
    explanation: 'Providing explicit `width` and `height` attributes allows the browser to calculate the aspect ratio and reserve layout space before the image is actually downloaded, preventing content jumping (CLS).'
  },
  {
    id: 'html-4',
    category: 'html',
    categoryName: 'HTML',
    question: 'What is the purpose of the `<!DOCTYPE html>` declaration at the top of an HTML document?',
    options: [
      'It instructs the server which HTTP compression algorithm to use',
      'It enables modern standard mode rendering instead of quirks mode in browsers',
      'It loads the HTML5 compiler into the browser JavaScript runtime',
      'It defines the security Content-Security-Policy header'
    ],
    correctIndex: 1,
    explanation: '`<!DOCTYPE html>` informs the browser that the document is modern HTML5. Without it, browsers fall back into "quirks mode", rendering according to obsolete 1990s rules.'
  },
  {
    id: 'html-5',
    category: 'html',
    categoryName: 'HTML',
    question: 'What is the difference between `localStorage` and `sessionStorage` in the Web Storage API?',
    options: [
      '`localStorage` encrypts data with AES-256; `sessionStorage` stores plaintext',
      '`localStorage` persists until explicitly cleared; `sessionStorage` is cleared when the browser tab/session closes',
      '`sessionStorage` is accessible across all browser windows and tabs automatically',
      '`localStorage` can store up to 5GB, while `sessionStorage` is limited to 4KB'
    ],
    correctIndex: 1,
    explanation: '`localStorage` data has no expiration date and persists across browser restarts. `sessionStorage` data survives page reloads within the same tab, but is deleted when the tab/window is closed.'
  },
  {
    id: 'html-6',
    category: 'html',
    categoryName: 'HTML',
    question: 'What key modal behavior does `dialog.showModal()` provide that `dialog.show()` does NOT?',
    codeSnippet: `<dialog id="confirmModal">
  <form method="dialog">
    <p>Are you sure you want to delete this file?</p>
    <button value="cancel">Cancel</button>
    <button value="confirm">Confirm</button>
  </form>
</dialog>

<script>
  const dialog = document.getElementById('confirmModal');
  dialog.showModal();
</script>`,
    language: 'html',
    options: [
      '`showModal()` forces the dialog to display only in full-screen mode on mobile devices',
      '`showModal()` opens the dialog in the top layer, renders a `::backdrop`, traps keyboard focus, and blocks interactions with background content',
      '`showModal()` automatically encrypts form input values inside the dialog',
      '`showModal()` causes the dialog to close automatically after 3 seconds'
    ],
    correctIndex: 1,
    explanation: '`dialog.showModal()` opens a true modal dialog rendered in the browser’s Top Layer. It activates a dimmable `::backdrop`, traps focus inside the dialog for accessibility, and marks outer elements inert.'
  },
  {
    id: 'html-7',
    category: 'html',
    categoryName: 'HTML',
    question: 'How does the browser evaluate and render the `<picture>` element in the following code?',
    codeSnippet: `<picture>
  <source srcset="banner.avif" type="image/avif" />
  <source srcset="banner.webp" type="image/webp" />
  <img src="banner.jpg" alt="Company Banner" loading="lazy" />
</picture>`,
    language: 'html',
    options: [
      'The browser downloads all three image files simultaneously to pick the sharpest resolution',
      'The browser downloads and renders the first supported format (`.avif` if supported, otherwise `.webp`), falling back to `banner.jpg` if neither is supported',
      'The browser stitches all three sources into an animated sequence',
      'The `<picture>` tag is ignored unless converted to a WebGL canvas'
    ],
    correctIndex: 1,
    explanation: 'The `<picture>` element uses content negotiation. The browser iterates through `<source>` tags from top to bottom and loads the first source whose media query and format type it supports, falling back to the `<img>` tag.'
  },
  {
    id: 'html-8',
    category: 'html',
    categoryName: 'HTML',
    question: 'What occurs when the browser parses the `<template>` element below during page load?',
    codeSnippet: `<template id="user-card">
  <div class="card">
    <h3 class="name">Username</h3>
    <img src="avatar.png" alt="Avatar" />
  </div>
</template>`,
    language: 'html',
    options: [
      'The card is rendered immediately with `visibility: hidden` and `avatar.png` is downloaded right away',
      'The contents are stored inert in the DOM without rendering and without downloading `avatar.png` until cloned in JavaScript via `content.cloneNode(true)`',
      'The template is compiled into a React component at runtime',
      'The template throws a validation error if not placed inside a `<form>`'
    ],
    correctIndex: 1,
    explanation: '`<template>` holds client-side content that is not rendered when the page loads. Its contents are inert: scripts inside do not run, and assets (like images) do not download until the template’s content is explicitly cloned into the active DOM.'
  },
  {
    id: 'html-9',
    category: 'html',
    categoryName: 'HTML',
    question: 'What is the console output when reading `dataset` properties in the following HTML snippet?',
    codeSnippet: `<button id="saveBtn" data-user-role="editor" data-retry-count="3">Save</button>

<script>
  const btn = document.getElementById('saveBtn');
  console.log(btn.dataset.userRole);
  console.log(typeof btn.dataset.retryCount);
</script>`,
    language: 'html',
    options: [
      '`"editor"` and `"string"`',
      '`"editor"` and `"number"`',
      '`undefined` and `"undefined"`',
      '`"userRole"` and `"number"`'
    ],
    correctIndex: 0,
    explanation: 'The `dataset` API converts kebab-case data attributes (`data-user-role`) into camelCase property names (`dataset.userRole`). All values in `dataset` are always returned as strings (`"3"`, type `"string"`).'
  },
  {
    id: 'html-10',
    category: 'html',
    categoryName: 'HTML',
    question: 'Which accessibility pattern properly associates the label with the input field for screen readers?',
    codeSnippet: `<!-- Pattern 1 -->
<label for="user-email">Email Address</label>
<input id="user-email" type="email" name="email" />

<!-- Pattern 2 -->
<label>
  Email Address
  <input type="email" name="email" />
</label>`,
    language: 'html',
    options: [
      'Only Pattern 1 is accessible; Pattern 2 is invalid HTML',
      'Both Pattern 1 (explicit association via `for` and `id`) and Pattern 2 (implicit association via nesting) are valid and fully accessible to screen readers',
      'Neither pattern is accessible; an `aria-label` attribute is always mandatory',
      'Pattern 2 breaks form submission in modern browsers'
    ],
    correctIndex: 1,
    explanation: 'Both explicit association (`<label for="id">` matching `<input id="id">`) and implicit association (nesting the `<input>` inside `<label>`) are valid HTML specifications and correctly announced by screen readers.'
  },

  // ─────────────────────────────────────────────────────────────
  // 2. CSS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'css-1',
    category: 'css',
    categoryName: 'CSS',
    question: 'When `box-sizing: border-box` is set on an element with `width: 200px` and `padding: 20px`, what is the final rendered width of the element?',
    options: [
      '`240px`',
      '`200px`',
      '`160px`',
      '`220px`'
    ],
    correctIndex: 1,
    explanation: 'With `box-sizing: border-box`, the specified width includes both padding and borders. The content area shrinks so the total outer width remains exactly 200px.'
  },
  {
    id: 'css-2',
    category: 'css',
    categoryName: 'CSS',
    question: 'Which of the following selector combinations has the HIGHEST CSS specificity?',
    options: [
      '`div#header ul li.active`',
      '`#main-nav .menu-item.active`',
      '`div.container div.wrapper ul.list li.item.active a:hover`',
      '`body main section article div p.highlight`'
    ],
    correctIndex: 1,
    explanation: 'Specificity is counted as (IDs, Classes/Attributes/Pseudo-classes, Elements). `#main-nav .menu-item.active` has 1 ID + 2 classes = (1, 2, 0), whereas `div#header ul li.active` has 1 ID + 1 class + 3 elements = (1, 1, 3). 1 ID and 2 classes beats 1 ID and 1 class.'
  },
  {
    id: 'css-3',
    category: 'css',
    categoryName: 'CSS',
    question: 'What is the main difference between `display: flex` and `display: grid`?',
    options: [
      'Flexbox is two-dimensional (rows and columns simultaneously), Grid is one-dimensional',
      'Flexbox is one-dimensional (row OR column at a time), Grid is two-dimensional (rows AND columns simultaneously)',
      'Flexbox does not support `gap` properties, while Grid does',
      'Flexbox works only on mobile devices, whereas Grid works on desktop'
    ],
    correctIndex: 1,
    explanation: 'Flexbox is designed for one-dimensional layouts (distributing space along a single axis), whereas CSS Grid is designed for two-dimensional layouts (handling both rows and columns at the same time).'
  },
  {
    id: 'css-4',
    category: 'css',
    categoryName: 'CSS',
    question: 'Why does setting `z-index: 9999` sometimes fail to bring an element above another element?',
    options: [
      '`z-index` only accepts numbers up to 1000 in modern CSS',
      'The element is trapped in a lower stacking context created by a parent (e.g., parent with `opacity < 1` or `transform`)',
      '`z-index` only works when display is set to `inline-block`',
      'The browser ignores `z-index` unless CSS flexbox is disabled'
    ],
    correctIndex: 1,
    explanation: '`z-index` only compares elements within the SAME stacking context. If a parent creates a new stacking context (via `transform`, `opacity < 1`, `filter`, `isolation: isolate`, etc.), child elements cannot escape above sibling stacking contexts.'
  },
  {
    id: 'css-5',
    category: 'css',
    categoryName: 'CSS',
    question: 'What unit in CSS represents 1% of the viewport width?',
    options: [
      '`rem`',
      '`vh`',
      '`vw`',
      '`ch`'
    ],
    correctIndex: 2,
    explanation: '`vw` stands for Viewport Width, where `1vw` equals 1% of the total width of the browser viewport window.'
  },
  {
    id: 'css-6',
    category: 'css',
    categoryName: 'CSS',
    question: 'In the flexbox snippet below, what will be the final computed widths of `.item-a` and `.item-b`?',
    codeSnippet: `.container {
  display: flex;
  width: 500px;
}
.item-a {
  flex: 1 1 100px; /* grow shrink basis */
}
.item-b {
  flex: 2 1 100px; /* grow shrink basis */
}`,
    language: 'css',
    options: [
      '`.item-a` = 100px, `.item-b` = 400px',
      '`.item-a` = 200px, `.item-b` = 300px',
      '`.item-a` = 250px, `.item-b` = 250px',
      '`.item-a` = 150px, `.item-b` = 350px'
    ],
    correctIndex: 1,
    explanation: 'The total flex-basis is 100px + 100px = 200px. Remaining free space is 500px - 200px = 300px. The grow factors are 1 and 2 (total 3). `.item-a` receives (1/3)*300px = 100px extra (total 200px); `.item-b` receives (2/3)*300px = 200px extra (total 300px).'
  },
  {
    id: 'css-7',
    category: 'css',
    categoryName: 'CSS',
    question: 'What does the modern CSS `:has()` pseudo-class selector target in the rule below?',
    codeSnippet: `.card:has(button.delete:hover) {
  border-color: #ef4444;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
}`,
    language: 'css',
    options: [
      'It styles the `button.delete` element when hovered',
      'It styles the parent `.card` element only when a descendant `button.delete` inside it is hovered',
      'It styles all `.card` siblings adjacent to the button',
      'It creates a CSS animation triggering on click'
    ],
    correctIndex: 1,
    explanation: '`:has()` is the CSS relational / "parent" selector. `.card:has(button.delete:hover)` styles the `.card` element itself whenever it contains a `.delete` button in a hovered state.'
  },
  {
    id: 'css-8',
    category: 'css',
    categoryName: 'CSS',
    question: 'How does CSS Grid respond when the container width changes in the snippet below?',
    codeSnippet: `.grid-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}`,
    language: 'css',
    options: [
      'It creates a fixed 2-column layout regardless of screen width',
      'It automatically fits as many 200px columns as possible into the row and expands each column equally (`1fr`) to fill any leftover container width without media queries',
      'It clips items that exceed 200px and adds horizontal scrollbars',
      'It forces all items to stack vertically on desktop screens'
    ],
    correctIndex: 1,
    explanation: '`repeat(auto-fit, minmax(200px, 1fr))` dynamically calculates how many 200px tracks fit across the container. If extra space remains, `1fr` expands each track proportionally, creating an intrinsic responsive layout without media queries.'
  },
  {
    id: 'css-9',
    category: 'css',
    categoryName: 'CSS',
    question: 'What color is applied to the text inside the `.badge` element in the following CSS hierarchy?',
    codeSnippet: `:root {
  --theme-color: #2563eb; /* Blue */
}
.card {
  --theme-color: #16a34a; /* Green */
}
.badge {
  color: var(--badge-color, var(--theme-color, #000000));
}`,
    language: 'css',
    options: [
      '`#2563eb` (Blue from `:root`)',
      '`#16a34a` (Green from `.card`) if `.badge` is inside `.card`, because CSS variables inherit through the DOM',
      '`#000000` (Black default fallback)',
      '`undefined` transparent'
    ],
    correctIndex: 1,
    explanation: 'CSS Custom Properties inherit down the DOM tree. If `--badge-color` is not defined, the fallback `var(--theme-color)` is evaluated. Inside `.card`, `--theme-color` is `#16a34a` (Green).'
  },
  {
    id: 'css-10',
    category: 'css',
    categoryName: 'CSS',
    question: 'Why does `.modal-child` with `z-index: 9999` render BEHIND `.header` with `z-index: 10` in this CSS?',
    codeSnippet: `.modal-wrapper {
  position: relative;
  z-index: 5;
  transform: translateZ(0);
}
.modal-child {
  position: absolute;
  z-index: 9999;
}
.header {
  position: fixed;
  z-index: 10;
}`,
    language: 'css',
    options: [
      '`z-index: 9999` overflows integer limits in CSS rendering engines',
      '`transform: translateZ(0)` creates a new stacking context on `.modal-wrapper` with `z-index: 5`, which is lower than `.header` (`z-index: 10`)',
      '`position: absolute` cannot render over `position: fixed` elements',
      '`transform` disables all z-index properties across the whole document'
    ],
    correctIndex: 1,
    explanation: '`transform` creates a local stacking context. The entire `.modal-wrapper` hierarchy is evaluated at `z-index: 5` relative to the root context. Because `.header` has `z-index: 10`, it renders above `.modal-wrapper` (and all its children, regardless of child `z-index`).'
  },

  // ─────────────────────────────────────────────────────────────
  // 3. JavaScript
  // ─────────────────────────────────────────────────────────────
  {
    id: 'js-1',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What will be logged to the console in JavaScript by the following code?',
    codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    language: 'javascript',
    options: [
      '`1, 2, 3, 4`',
      '`1, 4, 3, 2`',
      '`1, 4, 2, 3`',
      '`1, 3, 4, 2`'
    ],
    correctIndex: 1,
    explanation: 'Synchronous code runs first (`1`, `4`). Next, the Microtask Queue (`Promise` callbacks) drains before macrotasks (`3`). Finally, the Macrotask/Task Queue (`setTimeout`) executes (`2`). Hence: `1, 4, 3, 2`.'
  },
  {
    id: 'js-2',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What is a closure in JavaScript?',
    options: [
      'A function that immediately terminates the event loop',
      'A function combined with its lexical environment, allowing it to access outer scope variables even after the outer function has closed',
      'An object method that cannot be modified or overridden with prototype chaining',
      'A method used to close open WebSockets and network connections'
    ],
    correctIndex: 1,
    explanation: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). It gives an inner function access to an outer function’s scope even after the outer function has returned.'
  },
  {
    id: 'js-3',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What is the output of `typeof null` and `typeof undefined` in JavaScript?',
    options: [
      '`"null"` and `"undefined"`',
      '`"object"` and `"undefined"`',
      '`"undefined"` and `"object"`',
      '`"primitive"` and `"undefined"`'
    ],
    correctIndex: 1,
    explanation: '`typeof null` returning `"object"` is a famous legacy bug from the first version of JavaScript where values had type tags, and `null` was represented by a NULL pointer (0x00, same as object tag). `typeof undefined` is `"undefined"`.'
  },
  {
    id: 'js-4',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'How do arrow functions handle the `this` keyword differently from regular functions?',
    options: [
      'Arrow functions bind `this` to the global object exclusively',
      'Arrow functions do not have their own `this`; they lexically inherit `this` from the enclosing scope',
      'Arrow functions create a mutable dynamic `this` whenever called with `call()` or `apply()`',
      'Arrow functions set `this` to `undefined` in non-strict mode'
    ],
    correctIndex: 1,
    explanation: 'Arrow functions do not define their own execution context. Instead, they capture the `this` value of the enclosing lexical context when they are created, and `bind()`, `call()`, or `apply()` cannot override it.'
  },
  {
    id: 'js-5',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What does `Object.freeze()` do to a JavaScript object?',
    options: [
      'It deeply freezes the object and all its nested sub-objects recursively',
      'It performs a shallow freeze: prevents adding/deleting properties and prevents changing existing property values',
      'It hides all object properties from `Object.keys()` iteration',
      'It converts the object into an immutable JSON string'
    ],
    correctIndex: 1,
    explanation: '`Object.freeze()` makes an object shallowly immutable. You cannot add, remove, or modify existing properties at the top level, but nested objects can still be mutated unless explicitly frozen too.'
  },
  {
    id: 'js-6',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What will be logged to the console by the following `for` loops in JavaScript?',
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 0);
}`,
    language: 'javascript',
    options: [
      '`var: 0, 1, 2` followed by `let: 0, 1, 2`',
      '`var: 3, 3, 3` followed by `let: 0, 1, 2`',
      '`var: 3, 3, 3` followed by `let: 3, 3, 3`',
      '`var: 0, 0, 0` followed by `let: 0, 1, 2`'
    ],
    correctIndex: 1,
    explanation: '`var` has function/global scope; all three callbacks share the single mutated variable `i` (which equals 3 after the loop terminates). `let` has block scope; each iteration creates a fresh binding for `j`, preserving 0, 1, 2.'
  },
  {
    id: 'js-7',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What is the output of `console.log(result)` in the snippet below?',
    codeSnippet: `const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const result = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(result);`,
    language: 'javascript',
    options: [
      '`["apple", "banana", "orange"]`',
      '`{ apple: 3, banana: 2, orange: 1 }`',
      '`{ apple: 1, banana: 1, orange: 1 }`',
      '`[3, 2, 1]`'
    ],
    correctIndex: 1,
    explanation: '`Array.prototype.reduce` iterates over the list with an empty object `{}` initial accumulator, counting the frequency of each fruit string by key.'
  },
  {
    id: 'js-8',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What will be logged by `console.log` after executing the spread clone operations below?',
    codeSnippet: `const original = {
  name: 'Skye',
  details: { role: 'developer', level: 1 }
};

const copy = { ...original };
copy.name = 'Alex';
copy.details.level = 2;

console.log(original.name, original.details.level);`,
    language: 'javascript',
    options: [
      '`"Skye" 1`',
      '`"Skye" 2`',
      '`"Alex" 2`',
      '`"Alex" 1`'
    ],
    correctIndex: 1,
    explanation: 'Object spread (`{ ...original }`) performs a shallow copy. Primitive properties like `name` are copied by value, but nested objects (`details`) are copied by reference. Modifying `copy.details.level` directly mutates `original.details.level`.'
  },
  {
    id: 'js-9',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What will be logged to the console by `Promise.allSettled` in the code below?',
    codeSnippet: `const p1 = Promise.resolve('Success');
const p2 = Promise.reject(new Error('Failed'));
const p3 = Promise.resolve(42);

Promise.allSettled([p1, p2, p3]).then((results) => {
  const fulfilledCount = results.filter(r => r.status === 'fulfilled').length;
  console.log(fulfilledCount, results.length);
});`,
    language: 'javascript',
    options: [
      '`Uncaught Error: Failed`',
      '`2 3`',
      '`3 3`',
      '`0 3`'
    ],
    correctIndex: 1,
    explanation: 'Unlike `Promise.all` (which short-circuits and rejects on the first error), `Promise.allSettled` waits for all promises to finish and returns an array of outcome objects with status `"fulfilled"` (2 items) or `"rejected"` (1 item).'
  },
  {
    id: 'js-10',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What will be printed to the console in a browser runtime?',
    codeSnippet: `const counter = {
  count: 10,
  logRegular: function() {
    setTimeout(function() {
      console.log('Regular:', this.count);
    }, 0);
  },
  logArrow: function() {
    setTimeout(() => {
      console.log('Arrow:', this.count);
    }, 0);
  }
};

counter.logRegular();
counter.logArrow();`,
    language: 'javascript',
    options: [
      '`Regular: 10` and `Arrow: 10`',
      '`Regular: undefined` and `Arrow: 10`',
      '`Regular: 10` and `Arrow: undefined`',
      '`Regular: undefined` and `Arrow: undefined`'
    ],
    correctIndex: 1,
    explanation: 'In `logRegular`, the traditional `function()` callback inside `setTimeout` is invoked with the global object (`window`) as `this`, where `window.count` is `undefined`. In `logArrow`, the arrow function retains the lexical `this` of `counter` (`10`).'
  },
  {
    id: 'js-11',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What is logged to the console when clicking directly on `#childBtn` in the snippet below?',
    codeSnippet: `document.getElementById('parentDiv').addEventListener('click', () => {
  console.log('Parent Clicked');
});

document.getElementById('childBtn').addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('Child Clicked');
});`,
    language: 'javascript',
    options: [
      '`Child Clicked` followed by `Parent Clicked`',
      '`Child Clicked` only',
      '`Parent Clicked` only',
      'Nothing is logged because propagation is stopped'
    ],
    correctIndex: 1,
    explanation: '`event.stopPropagation()` halts the event bubbling phase up the DOM tree, preventing the click event from triggering the click listener on parent elements like `parentDiv`.'
  },
  {
    id: 'js-12',
    category: 'javascript',
    categoryName: 'JavaScript',
    question: 'What will be logged by `console.log` when evaluating falsy values with `||` vs `??`?',
    codeSnippet: `const config = {
  maxRetries: 0,
  enableLogs: false,
  tag: ''
};

const r1 = config.maxRetries || 3;
const r2 = config.maxRetries ?? 3;
const r3 = config.enableLogs ?? true;

console.log(r1, r2, r3);`,
    language: 'javascript',
    options: [
      '`3 3 true`',
      '`3 0 false`',
      '`0 0 false`',
      '`3 0 true`'
    ],
    correctIndex: 1,
    explanation: 'The logical OR `||` evaluates truthiness, treating `0`, `""`, and `false` as falsy (yielding `3`). The nullish coalescing operator `??` only falls back for `null` or `undefined`, preserving valid values `0` and `false`.'
  },

  // ─────────────────────────────────────────────────────────────
  // 4. TypeScript
  // ─────────────────────────────────────────────────────────────
  {
    id: 'ts-1',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What is the primary difference between `unknown` and `any` in TypeScript?',
    options: [
      '`any` is type-safe; `unknown` turns off all type checking completely',
      '`unknown` is the type-safe counterpart of `any`; you cannot perform operations on `unknown` without type narrowing or assertions',
      '`unknown` only allows primitive numbers and strings; `any` allows objects',
      '`unknown` is evaluated at runtime, while `any` is evaluated at compile time'
    ],
    correctIndex: 1,
    explanation: 'While both can hold any value, `any` disables all type safety (allowing arbitrary property access and method calls). `unknown` enforces safety by requiring you to narrow the type (e.g. `typeof x === "string"`) before using it.'
  },
  {
    id: 'ts-2',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What does the TypeScript utility type `Record<K, T>` construct?',
    options: [
      'An array where elements of type `K` and `T` alternate',
      'An object type whose property keys are `K` and property values are `T`',
      'A tuple storing immutable database records',
      'A function signature mapping parameter `K` to return type `T`'
    ],
    correctIndex: 1,
    explanation: '`Record<Keys, Type>` constructs an object type whose keys are of type `Keys` (string | number | symbol) and property values are of type `Type`.'
  },
  {
    id: 'ts-3',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'Which TypeScript keyword allows you to extract the property names of a type as a union of string literals?',
    options: [
      '`typeof`',
      '`keyof`',
      '`instanceof`',
      '`infer`'
    ],
    correctIndex: 1,
    explanation: '`keyof` produces a union of string or numeric literal types representing the keys of an object type (e.g., `type UserKeys = keyof { name: string; age: number }` results in `"name" | "age"`).'
  },
  {
    id: 'ts-4',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What does the TypeScript utility type `Partial<T>` do?',
    options: [
      'It removes all optional properties from type `T`',
      'It constructs a type with all properties of `T` set to optional (`?`)',
      'It extracts half of the fields defined in interface `T`',
      'It makes all properties in `T` read-only'
    ],
    correctIndex: 1,
    explanation: '`Partial<T>` creates a new type by taking all properties from `T` and marking each one as optional with the `?` modifier.'
  },
  {
    id: 'ts-5',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What is a "Discriminated Union" (or Tagged Union) in TypeScript?',
    options: [
      'A union of incompatible class instances that throws compile warnings',
      'A union pattern where every type in the union shares a common literal property (the discriminator) used to narrow types in switch/if checks',
      'A union type that only accepts boolean and numeric flags',
      'A type union restricted strictly to database entity models'
    ],
    correctIndex: 1,
    explanation: 'A Discriminated Union uses a common property with distinct literal values (like `kind: "circle"` vs `kind: "square"`) across members so TypeScript can safely narrow the exact shape in `switch` or `if` statements.'
  },
  {
    id: 'ts-6',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What is the purpose of the return type `pet is Fish` in the custom Type Predicate function below?',
    codeSnippet: `interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // TypeScript knows pet is Fish here
  } else {
    pet.fly();  // TypeScript knows pet is Bird here
  }
}`,
    language: 'typescript',
    options: [
      'It converts `pet` into a Fish class instance at runtime via memory casting',
      'It acts as a custom type guard: when `isFish` returns `true`, TypeScript narrows the type of `pet` to `Fish` in that code branch',
      'It prevents `isFish` from receiving `Bird` arguments',
      'It creates an interface alias for boolean values'
    ],
    correctIndex: 1,
    explanation: '`parameterName is Type` is a User-Defined Type Guard. When the function returns `true`, the TypeScript compiler narrows the variable to `Fish` in the `if` block, providing full autocomplete and type checking.'
  },
  {
    id: 'ts-7',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What type is inferred for `Role` when using `as const` and indexed access below?',
    codeSnippet: `const ROLES = ['admin', 'editor', 'viewer'] as const;

type Role = typeof ROLES[number];`,
    language: 'typescript',
    options: [
      '`string[]`',
      '`"admin" | "editor" | "viewer"`',
      '`number`',
      '`{ admin: string, editor: string, viewer: string }`'
    ],
    correctIndex: 1,
    explanation: '`as const` freezes the array into a read-only tuple of literal strings `readonly ["admin", "editor", "viewer"]`. Indexed access with `[number]` extracts the union of all element types: `"admin" | "editor" | "viewer"`.'
  },
  {
    id: 'ts-8',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What happens when calling `getProperty(user, "salary")` in the generic function below?',
    codeSnippet: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 101, name: 'Liebe', active: true };

const nameVal = getProperty(user, 'name');
// const salaryVal = getProperty(user, 'salary');`,
    language: 'typescript',
    options: [
      'It compiles cleanly and returns `undefined` at runtime',
      'It fails compilation with an error because `"salary"` is not assignable to type `"id" | "name" | "active"`',
      'It automatically adds `salary: undefined` to `user`',
      'It throws a runtime `ReferenceError`'
    ],
    correctIndex: 1,
    explanation: '`K extends keyof T` constrains the `key` argument to only valid keys of `T` (`"id" | "name" | "active"`). Passing `"salary"` produces a compile-time type checking error.'
  },
  {
    id: 'ts-9',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What types do `ResultA` and `ResultB` resolve to in the conditional type below?',
    codeSnippet: `type FlattenPromise<T> = T extends Promise<infer U> ? U : T;

type ResultA = FlattenPromise<Promise<string>>;
type ResultB = FlattenPromise<number[]>;`,
    language: 'typescript',
    options: [
      '`ResultA = Promise<string>`, `ResultB = number[]`',
      '`ResultA = string`, `ResultB = number[]`',
      '`ResultA = string`, `ResultB = number`',
      '`ResultA = any`, `ResultB = never`'
    ],
    correctIndex: 1,
    explanation: '`FlattenPromise` checks if `T` extends `Promise<infer U>`. For `Promise<string>`, `U` is inferred as `string`. For `number[]`, it does not extend `Promise`, so it returns `T` (`number[]`).'
  },
  {
    id: 'ts-10',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'Which properties are present in the `UserPreview` type below?',
    codeSnippet: `interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

type UserPreview = Omit<User, 'passwordHash' | 'createdAt'>;`,
    language: 'typescript',
    options: [
      '`passwordHash` and `createdAt`',
      '`id`, `username`, and `email`',
      '`username` and `email` only',
      '`passwordHash` only'
    ],
    correctIndex: 1,
    explanation: '`Omit<T, K>` constructs a type by picking all properties from `T` and removing the specified keys `K`. Omitting `passwordHash` and `createdAt` leaves `id`, `username`, and `email`.'
  },
  {
    id: 'ts-11',
    category: 'typescript',
    categoryName: 'Typescript',
    question: 'What is the purpose of `const _exhaustiveCheck: never = shape` in the default case below?',
    codeSnippet: `type Shape = 'circle' | 'square';

function calculateArea(shape: Shape) {
  switch (shape) {
    case 'circle':
      return Math.PI * 10 * 10;
    case 'square':
      return 10 * 10;
    default: {
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
    }
  }
}`,
    language: 'typescript',
    options: [
      'It creates a runtime exception handler for memory leaks',
      'It provides compile-time exhaustiveness checking: if a new shape is added to `type Shape` without handling it in the `switch`, TypeScript will throw a compilation error',
      'It resets the `shape` object to `null`',
      'It executes default calculations via WebAssembly'
    ],
    correctIndex: 1,
    explanation: 'Assigning unhandled values to type `never` guarantees exhaustiveness at compile time. If someone adds `\'triangle\'` to `Shape`, `shape` in `default` will be of type `\'triangle\'` (which cannot be assigned to `never`), alerting the developer.'
  },

  // ─────────────────────────────────────────────────────────────
  // 5. React
  // ─────────────────────────────────────────────────────────────
  {
    id: 'react-1',
    category: 'react',
    categoryName: 'React',
    question: 'Why does React require a unique `key` prop when rendering lists of elements?',
    options: [
      'To assign unique CSS selector IDs for automated testing',
      'To help React identify which items have changed, been added, or been removed during Virtual DOM reconciliation',
      'To encrypt list item contents in client-side memory',
      'To automatically sort list items alphabetically'
    ],
    correctIndex: 1,
    explanation: 'Keys provide stable identities to list elements across renders. React uses keys during diffing to match new virtual DOM trees with previous trees efficiently, avoiding unnecessary re-mounting and state loss.'
  },
  {
    id: 'react-2',
    category: 'react',
    categoryName: 'React',
    question: 'What is the primary difference between `useMemo` and `useCallback`?',
    options: [
      '`useMemo` memoizes a calculated value; `useCallback` memoizes a callback function definition',
      '`useMemo` runs asynchronously; `useCallback` runs synchronously on the main thread',
      '`useMemo` only works inside custom hooks; `useCallback` works inside components',
      '`useCallback` prevents all child re-renders; `useMemo` only caches HTTP requests'
    ],
    correctIndex: 0,
    explanation: '`useMemo(() => computeValue(a, b), [a, b])` caches the result of a calculation. `useCallback(fn, deps)` is shorthand for `useMemo(() => fn, deps)`, caching the function instance itself across renders.'
  },
  {
    id: 'react-3',
    category: 'react',
    categoryName: 'React',
    question: 'What happens when you update state in React using `setCount(count + 1)` multiple times in the same synchronous event handler?',
    options: [
      'Each call triggers an immediate separate DOM re-render',
      'React batches the updates into a single render; if using value instead of updater function `setCount(c => c + 1)`, the state will only increment once',
      'React throws an infinite loop warning in console',
      'The component crashes due to concurrent state deadlock'
    ],
    correctIndex: 1,
    explanation: 'React batches state updates to optimize performance. In `setCount(count + 1)`, every call in that handler reads the same snapshot value of `count`. To increment multiple times in one tick, you must use the updater function `setCount(prev => prev + 1)`.'
  },
  {
    id: 'react-4',
    category: 'react',
    categoryName: 'React',
    question: 'What is a major characteristic of `useRef` in React?',
    options: [
      'Modifying `ref.current` triggers a re-render of the component',
      'Modifying `ref.current` does NOT trigger a re-render, and the value persists across renders',
      '`useRef` can only be used to reference DOM elements and cannot store arbitrary values',
      '`useRef` resets to `null` whenever any parent component re-renders'
    ],
    correctIndex: 1,
    explanation: '`useRef` returns a mutable object whose `.current` property holds a value across renders without causing a re-render when mutated. It is used both for direct DOM references and for holding mutable instance variables (like timer IDs).'
  },
  {
    id: 'react-5',
    category: 'react',
    categoryName: 'React',
    question: 'When does the cleanup function returned by `useEffect` run?',
    options: [
      'Only once when the entire browser tab closes',
      'Before the effect runs again on dependency change, and when the component unmounts',
      'Immediately before the component renders its initial JSX',
      'Only when an uncaught error is thrown inside the effect'
    ],
    correctIndex: 1,
    explanation: 'React executes the effect cleanup function before re-running the effect on dependency change and when the component is unmounted from the DOM, allowing cleanup of event listeners, intervals, and subscriptions.'
  },
  {
    id: 'react-6',
    category: 'react',
    categoryName: 'React',
    question: 'What number will be displayed in `<h1>` after 5 seconds in the component below, and why?',
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <h1>{count}</h1>;
}`,
    language: 'jsx',
    options: [
      '`5`, because the interval increments every second',
      '`1`, because the empty dependency array `[]` captured the initial `count = 0` in a stale closure',
      '`0`, because state updates inside `setInterval` are ignored by React',
      '`NaN`, due to state concurrency conflict'
    ],
    correctIndex: 1,
    explanation: 'Because `useEffect` has an empty dependency array `[]`, the callback closes over the initial render scope where `count` is always `0`. Every second, `setCount(0 + 1)` sets state to `1`. To fix this, use functional state updates: `setCount(prev => prev + 1)`.'
  },
  {
    id: 'react-7',
    category: 'react',
    categoryName: 'React',
    question: 'What will be rendered into the DOM when `unreadCount` is `0` in the JSX snippet below?',
    codeSnippet: `function Inbox({ unreadCount }) {
  return (
    <div className="inbox">
      {unreadCount && <span className="badge">{unreadCount} unread</span>}
    </div>
  );
}

// Rendered as:
// <Inbox unreadCount={0} />`,
    language: 'jsx',
    options: [
      'Nothing inside `<div className="inbox">`',
      '`<div className="inbox">0</div>`',
      '`<div className="inbox"><span className="badge">0 unread</span></div>`',
      'A React hydration warning in console'
    ],
    correctIndex: 1,
    explanation: 'In JavaScript, `0 && <Component />` evaluates to the number `0`. In React JSX, numbers (including `0`) are valid renderable primitives, so React will render `0` directly into the DOM. Best practice: use `unreadCount > 0 && ...` or a ternary.'
  },
  {
    id: 'react-8',
    category: 'react',
    categoryName: 'React',
    question: 'How does `useRef` preserve the previous prop value across renders in the component below?',
    codeSnippet: `function PriceDisplay({ price }) {
  const prevPriceRef = useRef();

  useEffect(() => {
    prevPriceRef.current = price;
  }, [price]);

  const prevPrice = prevPriceRef.current;

  return <div>Current: \${price}, Previous: \${prevPrice}</div>;
}`,
    language: 'jsx',
    options: [
      'On initial render with `price = 100`, `prevPrice` is `undefined`; after `price` updates to `120`, `prevPrice` shows `100`',
      'Both `price` and `prevPrice` always show the same value at all times',
      '`useRef` forces an immediate synchronous re-render',
      'The component crashes on initial render because `.current` is read before mount'
    ],
    correctIndex: 0,
    explanation: 'The component renders first (reading `prevPriceRef.current`, which is initially `undefined`). Only after render is committed does `useEffect` execute, updating `prevPriceRef.current` with the current `price` for the NEXT render.'
  },
  {
    id: 'react-9',
    category: 'react',
    categoryName: 'React',
    question: 'Why does `<Child />` re-render every time the user clicks "Count" in `<Parent />`, even with `React.memo`?',
    codeSnippet: `const Child = React.memo(({ config, onAction }) => {
  console.log('Child rendered');
  return <button onClick={onAction}>{config.theme}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <Child config={{ theme: 'dark' }} onAction={() => console.log('Action')} />
    </div>
  );
}`,
    language: 'jsx',
    options: [
      '`React.memo` is deprecated in modern React',
      'Inline object literals `{{ theme: "dark" }}` and inline arrow functions `() => ...` create new memory references on every parent render, failing shallow prop equality checks',
      '`React.memo` only works on class components',
      'Child components cannot receive buttons as props'
    ],
    correctIndex: 1,
    explanation: '`React.memo` does a shallow comparison (`===`) of props. Because `config` and `onAction` are defined inline inside `Parent`, new objects/functions are created on every render, causing prop checks to fail. Solution: memoize with `useMemo` and `useCallback`.'
  },
  {
    id: 'react-10',
    category: 'react',
    categoryName: 'React',
    question: 'What is the role of `useReducer` compared to `useState` in the state machine below?',
    codeSnippet: `function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload], total: state.total + action.payload.price };
    case 'CLEAR':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });`,
    language: 'jsx',
    options: [
      '`useReducer` persists data automatically to IndexedDB',
      '`useReducer` provides predictable state management for complex logic where the next state depends on multiple sub-values and explicit action types',
      '`useReducer` executes actions in a separate web worker thread',
      '`useReducer` bypasses React reconciliation'
    ],
    correctIndex: 1,
    explanation: '`useReducer` is ideal for complex state transitions where multiple sub-values interact (like updating items and recalculating totals together), keeping state transition logic pure, testable, and isolated outside components.'
  },
  {
    id: 'react-11',
    category: 'react',
    categoryName: 'React',
    question: 'What is the purpose of the React 19 `useOptimistic` hook shown below?',
    codeSnippet: `function ChatRoom({ messages, sendMessageAction }) {
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    (state, newText) => [...state, { id: 'temp', text: newText, pending: true }]
  );

  async function handleSubmit(formData) {
    const text = formData.get('message');
    setOptimisticMessages(text);
    await sendMessageAction(text);
  }

  return (
    <div>
      {optimisticMessages.map(m => (
        <p key={m.id} style={{ opacity: m.pending ? 0.6 : 1 }}>{m.text}</p>
      ))}
    </div>
  );
}`,
    language: 'jsx',
    options: [
      'It creates WebSockets automatically between clients',
      'It allows the UI to render the expected outcome immediately while an async action (like a server mutation) is still in flight, reverting if the action fails',
      'It validates JSON payloads before network requests',
      'It optimizes CSS animations using GPU hardware acceleration'
    ],
    correctIndex: 1,
    explanation: '`useOptimistic` lets you present an instant UI update to the user while an async operation executes. If the mutation succeeds or finishes, the optimistic state is replaced by real server data; if it fails, it rolls back gracefully.'
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Next.js
  // ─────────────────────────────────────────────────────────────
  {
    id: 'next-1',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'In the Next.js App Router, what is the default rendering paradigm for components inside the `app` directory?',
    options: [
      'Client Components (`"use client"`)',
      'React Server Components (RSC)',
      'Static HTML without hydration support',
      'Micro-frontend iframe isolates'
    ],
    correctIndex: 1,
    explanation: 'In the Next.js App Router, all components inside the `app/` directory are React Server Components (RSC) by default. They run only on the server, keeping server-only dependencies out of client JavaScript bundles.'
  },
  {
    id: 'next-2',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'What directive must be placed at the top of a file in Next.js to enable client-side hooks like `useState` or `useEffect`?',
    options: [
      '`"use browser"`',
      '`"use client"`',
      '`"enable reactive"`',
      '`"use dynamic"`'
    ],
    correctIndex: 1,
    explanation: '`"use client"` declares the boundary between Server and Client component modules in React 19 / Next.js App Router, enabling React hooks, browser APIs, and interactive event handlers.'
  },
  {
    id: 'next-3',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'What is Incremental Static Regeneration (ISR) in Next.js?',
    options: [
      'Re-building the entire site from scratch on every user page request',
      'Generating or updating static pages in the background on-demand or after a cache revalidation period without rebuilding the entire website',
      'Streaming HTML chunks character by character using WebSockets',
      'Compiling React JSX on the client device using WebAssembly'
    ],
    correctIndex: 1,
    explanation: 'ISR allows you to retain the speed benefits of static generation while updating pages in the background as traffic arrives (via `revalidate`), without needing a full project rebuild and redeploy.'
  },
  {
    id: 'next-4',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'What is the purpose of Server Actions in Next.js?',
    options: [
      'To replace CSS animations with server-side physics engines',
      'Asynchronous functions executed on the server that can be called directly from Client or Server components (e.g. for form submissions and mutations)',
      'To manage Docker container orchestration on Vercel',
      'To automate Git commits after saving files'
    ],
    correctIndex: 1,
    explanation: 'Server Actions (`"use server"`) let you define server-side functions that can be invoked seamlessly from client components (or forms) without manually creating boilerplate API route handlers.'
  },
  {
    id: 'next-5',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'How does Next.js `<Image>` component optimize web images automatically?',
    options: [
      'It uploads images to a public IPFS node network',
      'It serves modern formats (WebP/AVIF), resizes for device breakpoints, prevents CLS, and lazy-loads images by default',
      'It compresses images by reducing color depth to 256 colors',
      'It vectorizes PNG images into SVG format'
    ],
    correctIndex: 1,
    explanation: 'The `next/image` component serves images in next-gen formats (WebP/AVIF), creates responsive sizes per viewport, loads images lazily as they enter the viewport, and preserves layout dimensions to avoid CLS.'
  },
  {
    id: 'next-6',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'How does Next.js execute the Server Action when the form is submitted in the code below?',
    codeSnippet: `// app/actions.js
'use server';

export async function createPost(formData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
}

// app/NewPost.jsx
'use client';
import { createPost } from './actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" />
      <button type="submit">Publish</button>
    </form>
  );
}`,
    language: 'jsx',
    options: [
      'Next.js compiles the entire database code into client-side WebAssembly',
      'Next.js makes an automated `POST` HTTP request to the server, executes `createPost` on the server runtime, and can progressively enhance forms even if JS is loading',
      'It converts the form into a client-side localStorage record',
      'It forces a full browser window refresh before executing'
    ],
    correctIndex: 1,
    explanation: 'Server Actions generate a secure endpoint behind the scenes. When invoked from a client `<form action={...}>`, Next.js sends a POST request with `FormData`, executes server-side database logic, and triggers automatic route revalidation.'
  },
  {
    id: 'next-7',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'What HTTP status code and response payload will this Next.js Route Handler return for an empty JSON body `{}`?',
    codeSnippet: `// app/api/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();

  if (!data.email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}`,
    language: 'javascript',
    options: [
      '`200 OK` with `{ success: true }`',
      '`400 Bad Request` with `{ error: "Email is required" }`',
      '`500 Internal Server Error`',
      '`404 Not Found`'
    ],
    correctIndex: 1,
    explanation: 'Because `data.email` is undefined in an empty body `{}`, the validation condition `!data.email` evaluates to `true`, returning HTTP status 400 with the error JSON object.'
  },
  {
    id: 'next-8',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'What values will `params` contain when navigating to `/products/electronics/headphones` in Next.js App Router?',
    codeSnippet: `// app/products/[category]/[slug]/page.jsx
export default async function ProductPage({ params }) {
  const { category, slug } = await params;
  return (
    <div>
      <h1>Category: {category}</h1>
      <p>Product: {slug}</p>
    </div>
  );
}`,
    language: 'jsx',
    options: [
      '`category = "electronics"` and `slug = "headphones"`',
      '`category = "products"` and `slug = "electronics"`',
      '`params` is an array: `["products", "electronics", "headphones"]`',
      '`category` is undefined without `getStaticProps`'
    ],
    correctIndex: 0,
    explanation: 'In the Next.js App Router folder structure `[category]/[slug]`, URL path segments are matched directly to parameter keys: `/products/electronics/headphones` maps to `{ category: "electronics", slug: "headphones" }`.'
  },
  {
    id: 'next-9',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'What error happens when passing `onLog` from a Server Component to a Client Component as shown below?',
    codeSnippet: `// ServerComponent.jsx (Server Component)
import ClientButton from './ClientButton';

export default function ServerComponent() {
  const handleLog = () => console.log('Server click');

  return <ClientButton onClick={handleLog} title="Click Me" />;
}`,
    language: 'jsx',
    options: [
      'No error: functions serialize seamlessly into JSON across network boundaries',
      'A serialization error: Functions cannot be passed as props across the Server Component -> Client Component boundary because functions cannot be serialized over the wire',
      'The client component automatically converts to a Server Component',
      'The server crashes with a memory overflow error'
    ],
    correctIndex: 1,
    explanation: 'Props passed from Server Components to Client Components must be serializable (e.g. JSON primitives, plain objects, arrays). Functions cannot be serialized across the network boundary; event handlers must be declared inside Client Components (`"use client"`).'
  },
  {
    id: 'next-10',
    category: 'nextjs',
    categoryName: 'NextJs',
    question: 'What does `next: { revalidate: 60 }` achieve in the Server Component fetch call below?',
    codeSnippet: `export default async function NewsPage() {
  const res = await fetch('https://api.example.com/news', {
    next: { revalidate: 60 }
  });
  const articles = await res.json();

  return <NewsList items={articles} />;
}`,
    language: 'jsx',
    options: [
      'It aborts the network request if the server takes longer than 60 milliseconds',
      'It caches the response and automatically revalidates (refetches in the background) at most once every 60 seconds (Time-based ISR)',
      'It polls the API every 60 seconds in the user’s browser via setInterval',
      'It retries failed network calls up to 60 times'
    ],
    correctIndex: 1,
    explanation: '`next: { revalidate: 60 }` enables time-based Incremental Static Regeneration (ISR). The server serves cached data instantly and triggers a background fetch to update the cache when a request arrives after 60 seconds have elapsed.'
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Node.js
  // ─────────────────────────────────────────────────────────────
  {
    id: 'node-1',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'Why is Node.js described as "single-threaded, non-blocking, and asynchronous"?',
    options: [
      'It runs on single-core CPUs only and cannot handle concurrent connections',
      'Its main JavaScript execution loop runs on one thread, while I/O operations and background tasks are delegated to the `libuv` thread pool and OS kernel asynchronously',
      'It executes code line by line synchronously and waits for database queries to finish before reading the next line',
      'It converts JavaScript into multi-threaded assembly instructions at startup'
    ],
    correctIndex: 1,
    explanation: 'Node.js runs your JavaScript code on a single main event loop thread, but leverages the C/C++ library `libuv` (with OS async primitives and a background worker thread pool) to handle non-blocking file, network, and crypto operations.'
  },
  {
    id: 'node-2',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'What is the difference between `process.nextTick()` and `setImmediate()` in Node.js?',
    options: [
      '`process.nextTick()` executes at the start of the next event loop iteration; `setImmediate()` runs immediately in microtask queue',
      '`process.nextTick()` queues a callback to run before the event loop continues (before microtasks/macrotasks); `setImmediate()` runs during the Check phase of the event loop',
      '`setImmediate()` is faster because it bypasses the Node.js runtime entirely',
      '`process.nextTick()` is deprecated and replaced by `setTimeout(fn, 1000)`'
    ],
    correctIndex: 1,
    explanation: '`process.nextTick()` fires immediately after the current operation finishes (draining before the event loop advances). `setImmediate()` is scheduled in the "Check" phase of the event loop iteration.'
  },
  {
    id: 'node-3',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'Why are Streams preferred over `fs.readFile()` when handling large files (e.g. 2GB video)?',
    options: [
      '`fs.readFile()` encrypts data which consumes CPU; streams transmit plaintext',
      'Streams process data chunk by chunk in small memory buffers without loading the entire 2GB file into RAM at once',
      '`fs.readFile()` only supports text files, not binary files',
      'Streams automatically compress files using gzip'
    ],
    correctIndex: 1,
    explanation: '`fs.readFile()` loads the entire file into memory before returning it, which can crash Node.js with out-of-memory errors for large files. Streams (`fs.createReadStream()`) pipe small manageable chunks sequentially.'
  },
  {
    id: 'node-4',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'What is the Node.js `Cluster` module primarily used for?',
    options: [
      'Connecting to Kubernetes clusters in the cloud',
      'Forking child processes that share server ports to take full advantage of multi-core CPU hardware',
      'Clustering multiple Redis databases into a master-slave configuration',
      'Managing CSS module bundling in backend templates'
    ],
    correctIndex: 1,
    explanation: 'Because a single Node.js instance runs on a single core, the `cluster` module allows master processes to spawn child worker processes (one per CPU core) that share server ports and distribute incoming traffic.'
  },
  {
    id: 'node-5',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'What is the difference between CommonJS (`require`) and ES Modules (`import`) in Node.js?',
    options: [
      'CommonJS is synchronous and resolves modules at runtime; ES Modules are asynchronous and static (parsed before code executes)',
      'ES Modules work only on Windows; CommonJS works on Linux',
      '`import` cannot import JSON files under any circumstances',
      'CommonJS loads code from CDN URLs; ES Modules load from disk'
    ],
    correctIndex: 0,
    explanation: 'CommonJS (`require`, `module.exports`) is synchronous and dynamic at runtime. ES Modules (`import`, `export`) have static module structure, enabling tree-shaking, static analysis, and top-level await.'
  },
  {
    id: 'node-6',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'What is the exact sequence of console logs when running the Node.js script below?',
    codeSnippet: `console.log('1: Sync');

setTimeout(() => console.log('2: Timeout'), 0);
setImmediate(() => console.log('3: Immediate'));

Promise.resolve().then(() => console.log('4: Promise'));
process.nextTick(() => console.log('5: nextTick'));

console.log('6: Sync End');`,
    language: 'javascript',
    options: [
      '`1, 6, 2, 3, 4, 5`',
      '`1, 6, 5, 4, 2, 3` (or `3, 2` depending on timers)',
      '`1, 6, 4, 5, 2, 3`',
      '`5, 4, 1, 6, 2, 3`'
    ],
    correctIndex: 1,
    explanation: 'Synchronous logs (`1`, `6`) run first. Next, `process.nextTick` queue empties before microtasks (`5`). Then microtasks (`4: Promise`) resolve. Finally, macrotask timers / check queues execute (`2` and `3`).'
  },
  {
    id: 'node-7',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'How does Express identify that the middleware below is an Error-Handling middleware?',
    codeSnippet: `const express = require('express');
const app = express();

app.get('/api/user', (req, res, next) => {
  throw new Error('Database connection failed');
});

// Middleware definition
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});`,
    language: 'javascript',
    options: [
      'Because it uses `app.use` instead of `app.get`',
      'By inspecting function arity: the function signature explicitly defines 4 arguments `(err, req, res, next)` (`fn.length === 4`)',
      'Because it calls `res.status(500)`',
      'Express parses the parameter name string `"err"` via regex'
    ],
    correctIndex: 1,
    explanation: 'Express inspects the function’s `length` property (parameter count). Functions with 4 arguments `(err, req, res, next)` are classified as error handlers and only invoked when `next(err)` or an exception occurs.'
  },
  {
    id: 'node-8',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'What is the output of `count` in the `EventEmitter` code below?',
    codeSnippet: `const EventEmitter = require('events');
const emitter = new EventEmitter();

let count = 0;

emitter.once('event', () => {
  count += 10;
});

emitter.on('event', () => {
  count += 1;
});

emitter.emit('event');
emitter.emit('event');

console.log(count);`,
    language: 'javascript',
    options: [
      '`22`',
      '`12`',
      '`20`',
      '`2`'
    ],
    correctIndex: 1,
    explanation: 'On the first `emit("event")`, the `once` listener runs (+10) and unregisters itself, and the `on` listener runs (+1) -> total 11. On the second `emit("event")`, only the `on` listener runs (+1) -> total 12.'
  },
  {
    id: 'node-9',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'What security risk exists when using `Buffer.allocUnsafe(100)` in Node.js?',
    codeSnippet: `const safeBuf = Buffer.alloc(100);
const unsafeBuf = Buffer.allocUnsafe(100);`,
    language: 'javascript',
    options: [
      '`Buffer.allocUnsafe` executes arbitrary shell commands automatically',
      '`Buffer.allocUnsafe` allocates uninitialized memory without zero-filling, which may leak sensitive previous memory content (passwords, tokens, keys) if sent over network',
      '`Buffer.allocUnsafe` crashes the Node.js V8 runtime if size > 64 bytes',
      'There is no difference; it is only a naming convention'
    ],
    correctIndex: 1,
    explanation: '`Buffer.alloc(n)` zeros out memory before returning. `Buffer.allocUnsafe(n)` is faster because it skips zero-filling, but the allocated chunk may contain residual uninitialized memory data from other operations, posing data leak risks.'
  },
  {
    id: 'node-10',
    category: 'nodejs',
    categoryName: 'Nodejs',
    question: 'How do Worker Threads communicate with the parent thread in Node.js?',
    codeSnippet: `// worker.js
const { parentPort } = require('worker_threads');

parentPort.on('message', (task) => {
  const result = heavyCalculation(task);
  parentPort.postMessage(result);
});`,
    language: 'javascript',
    options: [
      'Through shared global variables in V8 heap memory',
      'Through message passing via `parentPort.postMessage()` and `MessagePort` event channels',
      'By writing temporary JSON files to the local SSD disk',
      'Using HTTP localhost REST calls'
    ],
    correctIndex: 1,
    explanation: 'Node.js `worker_threads` run in isolated V8 contexts with separate event loops. They communicate with the main thread asynchronously by passing serialized messages through `parentPort.postMessage()` and `on("message")` channels.'
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Python
  // ─────────────────────────────────────────────────────────────
  {
    id: 'py-1',
    category: 'python',
    categoryName: 'Python',
    question: 'What is the Global Interpreter Lock (GIL) in CPython?',
    options: [
      'A firewall preventing Python scripts from communicating over HTTP',
      'A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at the same time',
      'A mechanism that permanently compiles Python bytecode into machine code',
      'A security lock that encrypts Python packages installed via pip'
    ],
    correctIndex: 1,
    explanation: 'The GIL is a mutex in CPython that ensures only one thread executes Python bytecode at a time, protecting CPython memory management. For CPU-bound parallel workloads, developers use multiprocessing instead of multithreading.'
  },
  {
    id: 'py-2',
    category: 'python',
    categoryName: 'Python',
    question: 'What is the key difference between a List Comprehension and a Generator Expression in Python?',
    options: [
      'List comprehensions use parentheses `()`; generators use brackets `[]`',
      'List comprehensions construct the entire list in memory immediately; generator expressions yield items lazily one at a time on demand',
      'Generators can only produce integers, whereas lists can store any object',
      'List comprehensions execute in C speed; generators are 100x slower'
    ],
    correctIndex: 1,
    explanation: 'A list comprehension `[x for x in data]` allocates memory and evaluates all elements immediately. A generator `(x for x in data)` evaluates lazily using iterators, saving substantial memory for large sequences.'
  },
  {
    id: 'py-3',
    category: 'python',
    categoryName: 'Python',
    question: 'What does a Python decorator (`@decorator`) do?',
    options: [
      'It formats Python code according to PEP 8 standards',
      'It takes a function as an argument, adds extra behavior or modifications, and returns a new function without altering the original source code',
      'It converts standard functions into asynchronous coroutines automatically',
      'It exports Python functions to a C++ shared library'
    ],
    correctIndex: 1,
    explanation: 'A decorator is a callable that accepts another function as input, wraps it with additional behavior (like logging, authentication, or caching), and returns the enhanced function wrapper.'
  },
  {
    id: 'py-4',
    category: 'python',
    categoryName: 'Python',
    question: 'Which of the following Python data structures is IMMUTABLE?',
    options: [
      'List `[1, 2, 3]`',
      'Dictionary `{"a": 1}`',
      'Tuple `(1, 2, 3)`',
      'Set `{1, 2, 3}`'
    ],
    correctIndex: 2,
    explanation: 'Tuples, strings, integers, floats, and frozensets are immutable in Python. Once created, their contents and sizes cannot be modified in place.'
  },
  {
    id: 'py-5',
    category: 'python',
    categoryName: 'Python',
    question: 'What is the purpose of the `with` statement and Context Managers in Python?',
    options: [
      'To import third-party modules conditionally',
      'To guarantee resource allocation and cleanup (like closing files or network sockets) via `__enter__` and `__exit__`, even if exceptions occur',
      'To bypass the Global Interpreter Lock for multi-core execution',
      'To declare static types for function variables'
    ],
    correctIndex: 1,
    explanation: '`with open(...) as f:` uses context management (`__enter__` and `__exit__`) to ensure resources are cleanly released and closed automatically, even if an unhandled exception occurs inside the block.'
  },
  {
    id: 'py-6',
    category: 'python',
    categoryName: 'Python',
    question: 'What will `print(list1)` and `print(list2)` output in Python?',
    codeSnippet: `def add_item(item, target_list=[]):
    target_list.append(item)
    return target_list

list1 = add_item('A')
list2 = add_item('B')
list3 = add_item('C', [])

print(list1)
print(list2)
print(list3)`,
    language: 'python',
    options: [
      "`['A']`, `['B']`, and `['C']`",
      "`['A', 'B']`, `['A', 'B']`, and `['C']`",
      "`['A']`, `['A', 'B']`, and `['A', 'B', 'C']`",
      "`['B']`, `['B']`, and `['C']`"
    ],
    correctIndex: 1,
    explanation: 'Default argument expressions in Python are evaluated once when the function is defined, not when called. The default list `[]` is shared across calls that omit the parameter. Modifying `target_list` mutates this persistent shared object.'
  },
  {
    id: 'py-7',
    category: 'python',
    categoryName: 'Python',
    question: 'What will be printed to the console when invoking the decorated function below?',
    codeSnippet: `def multiplier(factor):
    def decorator(func):
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs) * factor
        return wrapper
    return decorator

@multiplier(3)
def calculate(a, b):
    return a + b

print(calculate(2, 4))`,
    language: 'python',
    options: [
      '`6`',
      '`18`',
      '`14`',
      '`TypeError: calculate() takes 2 positional arguments`'
    ],
    correctIndex: 1,
    explanation: '`calculate(2, 4)` returns `6`. The `wrapper` intercepts the return value and multiplies it by `factor = 3`: `6 * 3 = 18`.'
  },
  {
    id: 'py-8',
    category: 'python',
    categoryName: 'Python',
    question: 'What is printed to the console when calling `next()` on the generator below?',
    codeSnippet: `def step_counter():
    print("Start")
    yield 10
    print("Middle")
    yield 20
    print("End")

gen = step_counter()
print("A:", next(gen))
print("B:", next(gen))`,
    language: 'python',
    options: [
      '`Start`, `Middle`, `End`, `A: 10`, `B: 20`',
      '`Start` followed by `A: 10`, then `Middle` followed by `B: 20`',
      '`A: 10` and `B: 20` only',
      '`TypeError: step_counter is not iterable`'
    ],
    correctIndex: 1,
    explanation: 'Generators execute lazily. Calling `next(gen)` starts execution until the first `yield 10` (printing `"Start"` then returning 10). The next `next(gen)` resumes where it paused, printing `"Middle"` and yielding 20.'
  },
  {
    id: 'py-9',
    category: 'python',
    categoryName: 'Python',
    question: 'What is the value of `result` in the list comprehension below?',
    codeSnippet: `numbers = [1, 2, 3, 4, 5, 6]

result = ["Even" if n % 2 == 0 else "Odd" for n in numbers if n >= 3]
print(result)`,
    language: 'python',
    options: [
      "`['Odd', 'Even', 'Odd', 'Even']`",
      "`['Odd', 'Even', 'Odd', 'Even', 'Odd', 'Even']`",
      "`['Even', 'Odd', 'Even']`",
      "`['Even', 'Even', 'Even']`"
    ],
    correctIndex: 0,
    explanation: 'The filtering condition `if n >= 3` at the end filters `numbers` to `[3, 4, 5, 6]`. The ternary expression maps `3 -> "Odd"`, `4 -> "Even"`, `5 -> "Odd"`, `6 -> "Even"`.'
  },
  {
    id: 'py-10',
    category: 'python',
    categoryName: 'Python',
    question: 'What will `print(str(item))` and `print([item])` output for the class below?',
    codeSnippet: `class Product:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

    def __repr__(self):
        return f"Product('{self.name}')"

item = Product("Keyboard")
print(str(item))
print([item])`,
    language: 'python',
    options: [
      '`Keyboard` and `[Keyboard]`',
      "`Keyboard` and `[Product('Keyboard')]`",
      "`Product('Keyboard')` and `[Keyboard]`",
      "`<Product object at 0x...>` and `[Keyboard]`"
    ],
    correctIndex: 1,
    explanation: '`str(item)` triggers `__str__` (returning `"Keyboard"`). When printing a container (like a list `[item]`), Python calls `__repr__` on its items to provide unambiguous representation (`[Product(\'Keyboard\')]`).'
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Java
  // ─────────────────────────────────────────────────────────────
  {
    id: 'java-1',
    category: 'java',
    categoryName: 'Java',
    question: 'What is the main role of the Java Virtual Machine (JVM) and Just-In-Time (JIT) compiler?',
    options: [
      'To convert Java source code directly into HTML and CSS',
      'To execute Java bytecode on any operating system, compiling frequently executed bytecode into native machine code at runtime for high performance',
      'To run Java code exclusively in browser sandbox environments',
      'To replace database SQL engines with Java bytecode tables'
    ],
    correctIndex: 1,
    explanation: 'The JVM provides the "Write Once, Run Anywhere" platform independence by interpreting bytecode. The JIT compiler optimizes hot code paths at runtime into direct native machine instructions.'
  },
  {
    id: 'java-2',
    category: 'java',
    categoryName: 'Java',
    question: 'What is the difference between `==` and `.equals()` when comparing two String objects in Java?',
    options: [
      '`==` compares string characters; `.equals()` compares memory addresses',
      '`==` compares object memory references (identity); `.equals()` compares character content (value equality)',
      '`==` only works for integers; `.equals()` works only for arrays',
      'They behave identically in all versions of Java'
    ],
    correctIndex: 1,
    explanation: 'In Java, `==` checks if both references point to the exact same memory address. The `.equals()` method compares the actual textual content inside the strings.'
  },
  {
    id: 'java-3',
    category: 'java',
    categoryName: 'Java',
    question: 'What is the key difference between an `ArrayList` and a `LinkedList` in Java?',
    options: [
      '`ArrayList` uses a dynamic contiguous array with `O(1)` random access; `LinkedList` uses doubly-linked nodes with `O(1)` insertions/deletions at ends but `O(n)` element search',
      '`LinkedList` is thread-safe; `ArrayList` cannot be synchronized',
      '`ArrayList` only stores primitive ints; `LinkedList` stores objects',
      '`ArrayList` has a fixed size that cannot expand; `LinkedList` expands'
    ],
    correctIndex: 0,
    explanation: '`ArrayList` is backed by a resizable array, offering fast `O(1)` random access via index `get(i)`. `LinkedList` is a doubly linked list, which is faster for insertions/deletions at heads/tails but requires traversing nodes `O(n)` to find index `i`.'
  },
  {
    id: 'java-4',
    category: 'java',
    categoryName: 'Java',
    question: 'What does the `volatile` keyword do to a variable in Java multithreading?',
    options: [
      'It prevents any thread from modifying the variable',
      'It guarantees that reads and writes are read directly from/written to main memory, ensuring visibility across all threads',
      'It automatically acquires an exclusive synchronized monitor lock on the object',
      'It saves the variable state to persistent disk storage'
    ],
    correctIndex: 1,
    explanation: '`volatile` ensures that changes made by one thread to a shared variable are immediately visible to all other threads by preventing CPU cache staleness and instruction reordering for that variable.'
  },
  {
    id: 'java-5',
    category: 'java',
    categoryName: 'Java',
    question: 'In Java, what is the difference between Checked and Unchecked (Runtime) exceptions?',
    options: [
      'Checked exceptions extend `RuntimeException` and are optional to catch; Unchecked exceptions must be declared in method signature',
      'Checked exceptions are verified at compile-time and must be caught or declared (`throws`); Unchecked exceptions extend `RuntimeException` and are not forced by the compiler',
      'Checked exceptions crash the JVM immediately; Unchecked exceptions do not',
      'Checked exceptions only occur in web applications'
    ],
    correctIndex: 1,
    explanation: 'Checked exceptions (like `IOException`) must be handled with `try-catch` or declared with `throws`. Unchecked exceptions (subclasses of `RuntimeException` like `NullPointerException`) occur at runtime and do not require mandatory compiler declarations.'
  },
  {
    id: 'java-6',
    category: 'java',
    categoryName: 'Java',
    question: 'What will be printed to the console by the Java Stream pipeline below?',
    codeSnippet: `import java.util.List;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> words = List.of("apple", "banana", "avocado", "apricot", "blueberry");

        int result = words.stream()
            .filter(w -> w.startsWith("a"))
            .mapToInt(String::length)
            .sum();

        System.out.println(result);
    }
}`,
    language: 'java',
    options: [
      '`12`',
      '`19` (5 + 7 + 7)',
      '`26`',
      '`3`'
    ],
    correctIndex: 1,
    explanation: 'The `filter` retains `"apple"` (5), `"avocado"` (7), and `"apricot"` (7). `mapToInt(String::length)` maps them to lengths 5, 7, 7. `sum()` adds them: 5 + 7 + 7 = 19.'
  },
  {
    id: 'java-7',
    category: 'java',
    categoryName: 'Java',
    question: 'What will be printed by the two `System.out.println` statements in Java?',
    codeSnippet: `public class StringTest {
    public static void main(String[] args) {
        String s = "Hello";
        s.concat(" World");
        System.out.println("String: " + s);

        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");
        System.out.println("StringBuilder: " + sb);
    }
}`,
    language: 'java',
    options: [
      '`String: Hello World` and `StringBuilder: Hello World`',
      '`String: Hello` and `StringBuilder: Hello World`',
      '`String: Hello` and `StringBuilder: Hello`',
      '`String: Hello World` and `StringBuilder: Hello`'
    ],
    correctIndex: 1,
    explanation: '`String` in Java is immutable. `s.concat(...)` creates and returns a new String without modifying `s`. `StringBuilder` is mutable; `.append(...)` modifies the existing buffer in place.'
  },
  {
    id: 'java-8',
    category: 'java',
    categoryName: 'Java',
    question: 'What will be printed to the console during execution of the `Optional` operations below?',
    codeSnippet: `import java.util.Optional;

public class OptionalDemo {
    public static String computeFallback() {
        System.out.print("Fallback! ");
        return "Default";
    }

    public static void main(String[] args) {
        Optional<String> present = Optional.of("Hello");

        present.orElse(computeFallback());
        present.orElseGet(() -> computeFallback());
    }
}`,
    language: 'java',
    options: [
      'Nothing is printed because the Optional is non-empty',
      '`Fallback! ` (printed once by `orElse`)',
      '`Fallback! Fallback! ` (printed twice)',
      '`Default`'
    ],
    correctIndex: 1,
    explanation: '`orElse(val)` is eager: the argument expression is evaluated immediately regardless of whether the Optional has a value. `orElseGet(Supplier)` is lazy: the lambda is only invoked if the Optional is empty.'
  },
  {
    id: 'java-9',
    category: 'java',
    categoryName: 'Java',
    question: 'What will `ref.speak()` print at runtime using polymorphism?',
    codeSnippet: `class Animal {
    public String speak() {
        return "Animal Sound";
    }
}

class Cat extends Animal {
    @Override
    public String speak() {
        return "Meow";
    }
}

public class Main {
    public static void main(String[] args) {
        Animal ref = new Cat();
        System.out.println(ref.speak());
    }
}`,
    language: 'java',
    options: [
      '`Animal Sound` (based on reference type)',
      '`Meow` (based on actual runtime object instance)',
      '`null`',
      'Throws `ClassCastException`'
    ],
    correctIndex: 1,
    explanation: 'In Java, non-static methods use dynamic method dispatch (runtime polymorphism). The JVM invokes the overridden method corresponding to the actual instance in heap memory (`Cat`), outputting `"Meow"`.'
  },
  {
    id: 'java-10',
    category: 'java',
    categoryName: 'Java',
    question: 'What will `map.get(new Coordinate(10, 20))` return in the Java code below?',
    codeSnippet: `import java.util.HashMap;
import java.util.Map;

class Coordinate {
    int x, y;
    Coordinate(int x, int y) { this.x = x; this.y = y; }
    // Note: equals() and hashCode() are NOT overridden
}

public class MapTest {
    public static void main(String[] args) {
        Map<Coordinate, String> map = new HashMap<>();
        map.put(new Coordinate(10, 20), "Target City");

        System.out.println(map.get(new Coordinate(10, 20)));
    }
}`,
    language: 'java',
    options: [
      '`"Target City"`',
      '`null`',
      '`Coordinate@...`',
      'Throws `NullPointerException`'
    ],
    correctIndex: 1,
    explanation: 'Because `equals()` and `hashCode()` are not overridden, `Coordinate` inherits default `Object` implementations (which compare identity / memory addresses). The new `Coordinate` object produces a different hash code and equals check, returning `null`.'
  },
  {
    id: 'java-11',
    category: 'java',
    categoryName: 'Java',
    question: 'What is the output of `future.join()` in the `CompletableFuture` pipeline below?',
    codeSnippet: `import java.util.concurrent.CompletableFuture;

public class AsyncDemo {
    public static void main(String[] args) {
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> 10)
            .thenApply(n -> n * 2)
            .thenApply(n -> n + 5);

        System.out.println(future.join());
    }
}`,
    language: 'java',
    options: [
      '`10`',
      '`25`',
      '`30`',
      '`null`'
    ],
    correctIndex: 1,
    explanation: '`supplyAsync` generates `10`. The first `thenApply` transforms it to `10 * 2 = 20`. The second `thenApply` adds 5: `20 + 5 = 25`. `future.join()` synchronously retrieves the final result.'
  },
  {
    id: 'java-12',
    category: 'java',
    categoryName: 'Java',
    question: 'Why does line 8 fail to compile with Generics wildcard `<? extends Number>` (PECS rule)?',
    codeSnippet: `import java.util.ArrayList;
import java.util.List;

public class GenericsTest {
    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>(List.of(1, 2, 3));
        List<? extends Number> numbers = ints;

        Number n = numbers.get(0); // Line 7: OK
        // numbers.add(10);        // Line 8: Compilation Error
    }
}`,
    language: 'java',
    options: [
      '`Integer` is not a subtype of `Number` in Java',
      'With covariance `<? extends Number>`, the compiler cannot guarantee the specific subtype allowed for insertion (Producer Extends - read-only)',
      '`ArrayList` is strictly immutable in modern Java',
      '`get(0)` invalidates the collection list structure'
    ],
    correctIndex: 1,
    explanation: '`<? extends Number>` means the list could be `List<Integer>`, `List<Double>`, etc. To preserve type safety, the compiler forbids adding elements (other than `null`) because you might try to insert a `Double` into a `List<Integer>`.'
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Database
  // ─────────────────────────────────────────────────────────────
  {
    id: 'db-1',
    category: 'database',
    categoryName: 'Database',
    question: 'What do the letters in ACID properties stand for in relational database management systems?',
    options: [
      'Asynchronous, Concurrent, Indexed, Distributed',
      'Atomicity, Consistency, Isolation, Durability',
      'Availability, Consistency, Integrity, Dependency',
      'Authentication, Cryptography, Identity, Delegation'
    ],
    correctIndex: 1,
    explanation: 'ACID guarantees reliable transactions: Atomicity (all or nothing), Consistency (preserves schema constraints), Isolation (concurrent transactions do not interfere), and Durability (committed changes survive crashes).'
  },
  {
    id: 'db-2',
    category: 'database',
    categoryName: 'Database',
    question: 'Why are B-Tree (or B+Tree) indexes widely used in SQL databases for table indexing?',
    options: [
      'They store data in flat text files that compress easily',
      'They maintain balanced tree depth, providing `O(log N)` lookups, insertions, deletions, and efficient range queries (`BETWEEN`, `>`, `<`)',
      'They eliminate the need for primary keys',
      'They execute all queries in `O(1)` constant time without disk I/O'
    ],
    correctIndex: 1,
    explanation: 'B-Trees keep data sorted and self-balanced with minimal disk page reads. In B+Trees, all values are linked sequentially in leaf nodes, making sequential range scans (`WHERE age > 20`) extremely fast.'
  },
  {
    id: 'db-3',
    category: 'database',
    categoryName: 'Database',
    question: 'What is the difference between an `INNER JOIN` and a `LEFT JOIN` in SQL?',
    options: [
      '`INNER JOIN` returns all rows from both tables; `LEFT JOIN` returns only matching rows',
      '`INNER JOIN` returns only rows that have matching values in both tables; `LEFT JOIN` returns all rows from the left table plus matching rows from the right table (with NULLs for non-matches)',
      '`LEFT JOIN` is only supported in SQLite databases',
      '`INNER JOIN` modifies data in place, while `LEFT JOIN` is read-only'
    ],
    correctIndex: 1,
    explanation: 'An `INNER JOIN` filters out rows that do not have matching keys in both tables. A `LEFT JOIN` preserves all rows from the left table regardless of whether a matching right-table row exists, filling missing columns with `NULL`.'
  },
  {
    id: 'db-4',
    category: 'database',
    categoryName: 'Database',
    question: 'What is Database Sharding (Horizontal Partitioning)?',
    options: [
      'Splitting large columns into separate vertical tables',
      'Distributing rows of a single logical table across multiple separate database servers/nodes based on a shard key',
      'Backing up database tables to AWS S3 buckets every hour',
      'Creating redundant read replicas that mirror the primary master'
    ],
    correctIndex: 1,
    explanation: 'Sharding splits a huge dataset horizontally into smaller partitions (shards) across multiple machines based on a shard key (e.g. `user_id`), allowing horizontal scaling beyond a single server’s storage and CPU limits.'
  },
  {
    id: 'db-5',
    category: 'database',
    categoryName: 'Database',
    question: 'What is an N+1 Query Problem in ORMs (like Prisma, Hibernate, or TypeORM)?',
    options: [
      'An error when a database has more than N+1 foreign keys',
      'An inefficiency where the app executes 1 query to fetch N parent records, and then executes N additional individual queries to fetch child relations for each parent',
      'A race condition where N threads attempt to insert 1 row simultaneously',
      'A memory leak in SQL connection pools'
    ],
    correctIndex: 1,
    explanation: 'The N+1 problem happens when loading relations in a loop: 1 query to get 100 users, then 100 separate queries to get each user’s posts. It is solved using eager loading (e.g. `JOIN` or `include`).'
  },
  {
    id: 'db-6',
    category: 'database',
    categoryName: 'Database',
    question: 'What is the logical order of evaluation for clauses in the SQL query below?',
    codeSnippet: `SELECT department_id, AVG(salary) AS avg_sal
FROM employees
WHERE active = true
GROUP BY department_id
HAVING COUNT(*) >= 5
ORDER BY avg_sal DESC;`,
    language: 'sql',
    options: [
      '`SELECT` -> `FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `ORDER BY`',
      '`FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `SELECT` -> `ORDER BY`',
      '`WHERE` -> `FROM` -> `GROUP BY` -> `SELECT` -> `HAVING` -> `ORDER BY`',
      '`FROM` -> `SELECT` -> `WHERE` -> `GROUP BY` -> `ORDER BY` -> `HAVING`'
    ],
    correctIndex: 1,
    explanation: 'SQL executes logically: 1. `FROM` (retrieve table), 2. `WHERE` (filter rows), 3. `GROUP BY` (group rows), 4. `HAVING` (filter aggregate groups), 5. `SELECT` (project expressions/aliases), 6. `ORDER BY` (sort results).'
  },
  {
    id: 'db-7',
    category: 'database',
    categoryName: 'Database',
    question: 'What does `rank_in_cat = 1` represent in the query result below?',
    codeSnippet: `SELECT 
  product_name, 
  category, 
  price,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rank_in_cat
FROM products;`,
    language: 'sql',
    options: [
      'The cheapest product across all categories combined',
      'The highest-priced product within each respective category partition',
      'The total number of products in each category',
      'A randomized sample product from category 1'
    ],
    correctIndex: 1,
    explanation: '`ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)` assigns sequential row numbers starting from 1 for each category, ordered by price descending. Rank 1 is the most expensive product in that category.'
  },
  {
    id: 'db-8',
    category: 'database',
    categoryName: 'Database',
    question: 'What records does the `LEFT JOIN` query below retrieve from the database?',
    codeSnippet: `SELECT u.id, u.name, u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.order_id IS NULL;`,
    language: 'sql',
    options: [
      'All users who have placed at least 1 order',
      'All users who have NEVER placed any orders (inactive / non-ordering users)',
      'All orphaned orders that have no valid user',
      'All orders where order_id is zero'
    ],
    correctIndex: 1,
    explanation: 'A `LEFT JOIN` preserves all rows from `users`. If a user has no matching row in `orders`, all joined columns (`o.*`) become `NULL`. Filtering `WHERE o.order_id IS NULL` isolates users with zero orders.'
  },
  {
    id: 'db-9',
    category: 'database',
    categoryName: 'Database',
    question: 'What happens if `salary = 5000` and `bonus = NULL` in `salary + bonus` without using `COALESCE` in SQL?',
    codeSnippet: `-- Calculation with COALESCE
SELECT salary + COALESCE(bonus, 0) AS total_pay FROM payroll;

-- Calculation without COALESCE
SELECT salary + bonus AS total_pay FROM payroll;`,
    language: 'sql',
    options: [
      'It evaluates to `5000` in both queries',
      'Without `COALESCE`, `salary + NULL` evaluates to `NULL` because arithmetic with `NULL` yields `NULL` in SQL',
      'Without `COALESCE`, the database throws a fatal runtime calculation exception',
      '`NULL` is automatically treated as `0` by default in all SQL math'
    ],
    correctIndex: 1,
    explanation: 'In Three-Valued Logic SQL, any arithmetic operation with `NULL` (e.g. `5000 + NULL`) produces `NULL`. `COALESCE(bonus, 0)` replaces `NULL` with `0`, ensuring safe calculation.'
  },
  {
    id: 'db-10',
    category: 'database',
    categoryName: 'Database',
    question: 'Assuming a standard B-Tree index exists on `username`, how will the database execute Query 1 vs Query 2?',
    codeSnippet: `-- Query 1
SELECT * FROM accounts WHERE username LIKE 'alex%';

-- Query 2
SELECT * FROM accounts WHERE username LIKE '%alex';`,
    language: 'sql',
    options: [
      'Both queries perform fast `O(log N)` index range scans',
      'Query 1 can utilize the B-Tree index (Index Range Scan); Query 2 must perform a Full Table Scan because leading wildcards prevent prefix index matching',
      'Both queries require Full Table Scans',
      'Query 2 is automatically rewritten by the optimizer into Query 1'
    ],
    correctIndex: 1,
    explanation: 'B-Tree indexes sort strings lexicographically. A prefix search `alex%` can navigate the tree directly to the `alex` subtree. A leading wildcard `%alex` cannot determine the starting character, forcing a full scan of all records.'
  },

  // ─────────────────────────────────────────────────────────────
  // 11. API
  // ─────────────────────────────────────────────────────────────
  {
    id: 'api-1',
    category: 'api',
    categoryName: 'API',
    question: 'What does it mean for an HTTP method to be "Idempotent"?',
    options: [
      'The method can only be called over encrypted HTTPS connections',
      'Making multiple identical requests has the same intended effect and server state as making a single request',
      'The method cannot accept request body payloads',
      'The response is automatically cached by all public CDNs'
    ],
    correctIndex: 1,
    explanation: 'An HTTP method is idempotent if executing it multiple times leaves the system in the exact same state as executing it once. `GET`, `PUT`, and `DELETE` are idempotent; `POST` is generally NOT idempotent.'
  },
  {
    id: 'api-2',
    category: 'api',
    categoryName: 'API',
    question: 'Which HTTP status code should a server return when a user is not authenticated (missing/invalid token)?',
    options: [
      '`400 Bad Request`',
      '`401 Unauthorized`',
      '`403 Forbidden`',
      '`404 Not Found`'
    ],
    correctIndex: 1,
    explanation: '`401 Unauthorized` means authentication is required and has failed or not been provided. `403 Forbidden` means the server knows who the user is, but the user lacks permission to access that resource.'
  },
  {
    id: 'api-3',
    category: 'api',
    categoryName: 'API',
    question: 'What is the purpose of an HTTP CORS "Preflight Request"?',
    options: [
      'To test if the client’s internet connection bandwidth is fast enough',
      'A preliminary `OPTIONS` request sent by browsers to check if the server allows cross-origin requests with custom headers/methods before sending the actual request',
      'To compress the JSON payload with Brotli encoding',
      'To synchronize browser cookies with third-party domain servers'
    ],
    correctIndex: 1,
    explanation: 'For non-simple cross-origin requests (e.g. with `Authorization` headers or `PUT`/`DELETE` methods), the browser automatically sends an `OPTIONS` preflight request to verify allowed origins, methods, and headers.'
  },
  {
    id: 'api-4',
    category: 'api',
    categoryName: 'API',
    question: 'How does GraphQL solve the "Over-fetching" and "Under-fetching" problems common in traditional REST APIs?',
    options: [
      'It compresses all JSON responses into binary Protocol Buffers',
      'It allows clients to query for exact fields they need in a single request, preventing unnecessary data transfer and multiple roundtrips',
      'It replaces HTTP with peer-to-peer WebRTC connections',
      'It forces backend databases to store data exclusively in graph format'
    ],
    correctIndex: 1,
    explanation: 'In REST, endpoints often return fixed payload shapes with unneeded fields (over-fetching) or require multiple endpoint calls to get related data (under-fetching). GraphQL lets clients define the exact shape and nested relations in one query.'
  },
  {
    id: 'api-5',
    category: 'api',
    categoryName: 'API',
    question: 'What is the difference between WebSockets and Server-Sent Events (SSE)?',
    options: [
      'WebSockets are bidirectional (two-way full-duplex communication); SSE is unidirectional (server pushes text events to client over standard HTTP)',
      'SSE only works on mobile devices; WebSockets work on desktop',
      'WebSockets cannot send JSON; SSE can only send binary video',
      'SSE requires installing native C++ plugins in the client browser'
    ],
    correctIndex: 0,
    explanation: 'WebSockets provide full-duplex, two-way communication over a single TCP connection. SSE (Server-Sent Events) is simpler and unidirectional—allowing the server to stream live text updates to the client over standard HTTP.'
  },
  {
    id: 'api-6',
    category: 'api',
    categoryName: 'API',
    question: 'What occurs if the server takes 6 seconds to respond in the `AbortController` snippet below?',
    codeSnippet: `const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 3000);

try {
  const response = await fetch('/api/analytics', {
    signal: controller.signal
  });
  const data = await response.json();
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request aborted due to timeout');
  }
} finally {
  clearTimeout(timeoutId);
}`,
    language: 'javascript',
    options: [
      'The fetch hangs indefinitely until the server responds',
      'After 3000ms, `controller.abort()` cancels the fetch request and `err.name === "AbortError"` is caught',
      'The browser reloads the entire webpage',
      'The browser retries the fetch 5 times automatically'
    ],
    correctIndex: 1,
    explanation: '`AbortController` links a cancellation signal to `fetch()`. When `controller.abort()` fires after 3 seconds, the browser terminates the pending network socket and rejects the fetch promise with a DOMException named `"AbortError"`.'
  },
  {
    id: 'api-7',
    category: 'api',
    categoryName: 'API',
    question: 'Why is decoding a JWT token using `atob()` on the client NOT sufficient to verify user authentication?',
    codeSnippet: `// JWT: header.payload.signature
const token = "eyJhbGciOi...eyJ1c2VySWQiOiIxMDEiLCJyb2xlIjoiYWRtaW4ifQ...SflKxw...";

const [, payloadB64] = token.split('.');
const payload = JSON.parse(atob(payloadB64));
console.log(payload.role); // "admin"`,
    language: 'javascript',
    options: [
      'Base64 decoding is mathematically irreversible without private keys',
      'JWT payloads are merely base64url-encoded JSON (not encrypted); anyone can tamper with client payload data unless the cryptographic signature is verified with the secret/public key',
      '`atob()` is deprecated in modern ECMAScript standards',
      'JWT tokens cannot store role strings'
    ],
    correctIndex: 1,
    explanation: 'JWT payload is readable by anyone via simple Base64 decoding. Security comes exclusively from the 3rd part (Signature). The server must verify that the signature matches the header + payload using its secret key before trusting any payload fields.'
  },
  {
    id: 'api-8',
    category: 'api',
    categoryName: 'API',
    question: 'What does `s-maxage=86400` specify in the HTTP `Cache-Control` header below?',
    codeSnippet: `HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=60`,
    language: 'http',
    options: [
      'It tells browser client caches to keep the file for 86400 seconds (24h)',
      'It specifies the caching duration for shared/proxy/CDN edge caches (86400s), overriding `max-age` (3600s) for public proxy servers',
      'It deletes the cache after 86400 milliseconds',
      'It forces SSL re-negotiation every 24 hours'
    ],
    correctIndex: 1,
    explanation: '`s-maxage` (shared max age) applies only to shared caches (such as CDNs and reverse proxies), overriding `max-age`. Here, private browsers cache for 1 hour (`max-age=3600`), while CDN edge servers cache for 24 hours (`s-maxage=86400`).'
  },
  {
    id: 'api-9',
    category: 'api',
    categoryName: 'API',
    question: 'What is the primary semantic difference between `PUT` and `PATCH` in RESTful APIs?',
    codeSnippet: `<!-- Request A -->
PATCH /api/users/101
Content-Type: application/json
{ "email": "alex_new@example.com" }

<!-- Request B -->
PUT /api/users/101
Content-Type: application/json
{ "name": "Alex", "email": "alex_new@example.com", "role": "admin" }`,
    language: 'http',
    options: [
      '`PUT` is used for partial field updates; `PATCH` replaces the entire resource representation',
      '`PUT` replaces the entire target resource with the payload representation; `PATCH` applies partial modifications/deltas to the resource',
      '`PATCH` is only supported over WebSocket protocols',
      '`PUT` cannot accept JSON request bodies'
    ],
    correctIndex: 1,
    explanation: 'In REST conventions, `PUT` is idempotent and replaces the target resource entirely (missing fields are reset or removed). `PATCH` applies partial updates, modifying only the fields explicitly provided in the request body.'
  },

  // ─────────────────────────────────────────────────────────────
  // 12. Core Concepts
  // ─────────────────────────────────────────────────────────────
  {
    id: 'core-1',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'What are the 4 fundamental pillars of Object-Oriented Programming (OOP)?',
    options: [
      'Iteration, Recursion, Compilation, Interpretation',
      'Encapsulation, Abstraction, Inheritance, Polymorphism',
      'Atomicity, Consistency, Isolation, Durability',
      'Coupling, Cohesion, Complexity, Concurrency'
    ],
    correctIndex: 1,
    explanation: 'The 4 pillars of OOP are: Encapsulation (bundling data and methods), Abstraction (hiding implementation details), Inheritance (reusing parent class logic), and Polymorphism (handling different types via a common interface).'
  },
  {
    id: 'core-2',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST) vs an unsorted Array of size N?',
    options: [
      'BST is `O(N)`; Unsorted Array is `O(1)`',
      'BST is `O(log N)`; Unsorted Array is `O(N)`',
      'BST is `O(N^2)`; Unsorted Array is `O(log N)`',
      'Both are `O(1)` constant time'
    ],
    correctIndex: 1,
    explanation: 'In a balanced BST, each comparison cuts the remaining search space in half, giving `O(log N)` search time. In an unsorted array, you must inspect every element one by one in the worst case, taking `O(N)` linear time.'
  },
  {
    id: 'core-3',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'What is the "S" in the SOLID design principles for software engineering?',
    options: [
      'State Management Principle',
      'Single Responsibility Principle: A class/module should have only one reason to change',
      'Singleton Pattern Requirement',
      'Speed Optimization Standard'
    ],
    correctIndex: 1,
    explanation: 'The Single Responsibility Principle (SRP) states that a class, module, or function should do one thing and have only one reason to be modified, reducing coupling and making code easier to test and maintain.'
  },
  {
    id: 'core-4',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'What is the primary difference between Stack memory and Heap memory in computer systems?',
    options: [
      'Stack stores long-lived dynamic objects; Heap stores short-lived local variables',
      'Stack is fast, contiguous memory managed automatically (LIFO for function frames/primitives); Heap is larger dynamic memory allocated and freed at runtime (via pointers/garbage collector)',
      'Stack memory is located on the SSD hard drive; Heap is in CPU registers',
      'Stack is unlimited in size; Heap is limited to 64KB'
    ],
    correctIndex: 1,
    explanation: 'Stack allocation is fast and strictly ordered (LIFO) for local function execution contexts and primitives. Heap memory is a large pool for dynamic object allocations where lifetimes are not tied to function return frames.'
  },
  {
    id: 'core-5',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'Why does a Hash Table provide average `O(1)` constant time lookups?',
    options: [
      'It performs binary search on all stored keys simultaneously',
      'A hash function computes an array index directly from the key, allowing direct memory bucket access without scanning other keys',
      'It stores all values in CPU L1 cache exclusively',
      'It maintains a sorted linked list of all items'
    ],
    correctIndex: 1,
    explanation: 'A hash function converts a key into a numerical index pointing directly to an array bucket. In the average case (with few collisions), accessing the element at that calculated index is an `O(1)` direct array lookup.'
  },
  {
    id: 'core-6',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'Why is `left + (right - left) / 2` used instead of `(left + right) / 2` in the binary search implementation below?',
    codeSnippet: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Midpoint calculation
    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    language: 'javascript',
    options: [
      'It makes binary search run in `O(1)` time instead of `O(log N)`',
      'It avoids integer arithmetic overflow when `left + right` exceeds the maximum integer limit (e.g. `2^31 - 1` in Java/C++)',
      'It ensures the midpoint is always an odd number',
      'It is required by the JavaScript V8 bytecode compiler'
    ],
    correctIndex: 1,
    explanation: 'In languages with 32-bit signed integers (Java, C, C++), if `left` and `right` are both large (e.g., > 1 billion), `left + right` overflows to a negative number, causing an index out of bounds exception. `left + (right - left) / 2` is algebraically identical and safe from overflow.'
  },
  {
    id: 'core-7',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'What data structure and algorithm complexity are used in the balanced parentheses validator below?',
    codeSnippet: `function isValidParentheses(str) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of str) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
    language: 'javascript',
    options: [
      'Queue with `O(N^2)` time complexity and `O(1)` space',
      'Stack (LIFO) with `O(N)` linear time complexity and `O(N)` auxiliary space',
      'Hash Map with `O(N log N)` time complexity and `O(N^2)` space',
      'Binary Search Tree with `O(1)` space'
    ],
    correctIndex: 1,
    explanation: 'The function uses a Stack (LIFO: Last-In, First-Out). It traverses the string of length N once (`O(N)` time) and pushes opening brackets onto the stack (up to `N` elements in worst case, `O(N)` space).'
  },
  {
    id: 'core-8',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'What mathematical property does `isPowerOfTwo(n)` test using the bitwise trick below?',
    codeSnippet: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    language: 'javascript',
    options: [
      'It checks if `n` is an even number',
      'It checks if `n` is an exact power of two (1, 2, 4, 8, 16, 32...)',
      'It checks if `n` is a prime number',
      'It calculates the square root of `n`'
    ],
    correctIndex: 1,
    explanation: 'Powers of two in binary contain exactly one set bit (e.g. `8 = 1000_2`). Subtracting 1 flips all lower bits (`7 = 0111_2`). The bitwise AND `(1000 & 0111)` yields `0000`, confirming that `n` has only one binary bit set.'
  },
  {
    id: 'core-9',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'How does memoization change the time complexity of the Fibonacci algorithm below?',
    codeSnippet: `def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]`,
    language: 'python',
    options: [
      'From `O(N)` linear to `O(1)` constant',
      'From `O(2^N)` exponential to `O(N)` linear time',
      'From `O(N^2)` quadratic to `O(N log N)`',
      'It has no effect on time complexity'
    ],
    correctIndex: 1,
    explanation: 'Naive recursive Fibonacci recalculates overlapping subproblems exponentially (`O(2^N)`). Memoization caches the result of each subproblem `fib(k)` upon first compute, so each integer from 0 to N is solved exactly once in `O(N)` time.'
  },
  {
    id: 'core-10',
    category: 'core_concepts',
    categoryName: 'Core concepts',
    question: 'How many comparisons does the two-pointer algorithm make for `isPalindrome("racecar")` before returning `true`?',
    codeSnippet: `function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    language: 'javascript',
    options: [
      '`7` comparisons',
      '`3` comparisons (`r===r`, `a===a`, `c===c`)',
      '`1` comparison',
      '`14` comparisons'
    ],
    correctIndex: 1,
    explanation: 'For `"racecar"` (length 7): 1. `str[0] (\'r\') === str[6] (\'r\')`, 2. `str[1] (\'a\') === str[5] (\'a\')`, 3. `str[2] (\'c\') === str[4] (\'c\')`. Then `left = 3, right = 3`, loop terminates (`left < right` is false). Total 3 comparisons.'
  },

  // ─────────────────────────────────────────────────────────────
  // 13. Cloud
  // ─────────────────────────────────────────────────────────────
  {
    id: 'cloud-1',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'What is the core benefit of Infrastructure as Code (IaC) tools like Terraform or AWS CloudFormation?',
    options: [
      'They write HTML and CSS code automatically for cloud dashboards',
      'They allow you to define, version-control, automate, and reliably reproduce cloud infrastructure using declarative configuration files',
      'They convert cloud databases into static SQLite files',
      'They eliminate the cost of all cloud resources'
    ],
    correctIndex: 1,
    explanation: 'IaC lets teams treat infrastructure provisioning like application code: stored in Git, reviewed through pull requests, tested in staging, and reproduced consistently without error-prone manual console clicks.'
  },
  {
    id: 'cloud-2',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'What is a key characteristic of "Serverless" compute services (e.g. AWS Lambda, Google Cloud Functions)?',
    options: [
      'Servers do not exist anywhere in the cloud provider’s data centers',
      'Developers do not manage or provision OS servers; compute scales automatically from zero based on incoming requests, and you only pay for active execution time',
      'Serverless functions must run continuously 24/7 without stopping',
      'They cannot connect to any external databases or APIs'
    ],
    correctIndex: 1,
    explanation: 'Serverless abstracts server management away. The cloud provider provisions, scales, patches, and tears down execution instances automatically. You only pay for exact milliseconds of CPU execution time (scaling down to zero cost when idle).'
  },
  {
    id: 'cloud-3',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'What is the difference between a Container (Docker) and a Virtual Machine (VM)?',
    options: [
      'VMs share the host OS kernel; Containers run their own full guest operating system and virtualized hardware',
      'Containers share the host OS kernel and isolate user space, making them lightweight and fast to start; VMs run a full guest OS on top of a hypervisor with dedicated virtual hardware',
      'Containers cannot run Linux applications; VMs can only run Windows',
      'Docker containers require dedicated physical hardware servers'
    ],
    correctIndex: 1,
    explanation: 'Containers virtualize at the OS level (sharing the host kernel), packaging only app binaries and libraries for minimal overhead. VMs virtualize at the hardware level with a hypervisor and complete guest OS, which takes more RAM and startup time.'
  },
  {
    id: 'cloud-4',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'What is a Content Delivery Network (CDN) and why is it used?',
    options: [
      'A private blockchain used to secure database backups',
      'A globally distributed network of edge caching proxy servers that deliver content (images, JS, videos) to users from the geographically closest location to reduce latency',
      'A hardware load balancer installed in home offices',
      'An internal network protocol replacing TCP/IP'
    ],
    correctIndex: 1,
    explanation: 'CDNs (like Cloudflare, CloudFront, Fastly) cache static assets at hundreds of edge locations worldwide, drastically reducing round-trip latency (TTFB) and offloading traffic from origin servers.'
  },
  {
    id: 'cloud-5',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'What is the purpose of an Auto Scaling Group (ASG) combined with a Load Balancer in cloud architectures?',
    options: [
      'To automatically delete idle database records to save disk space',
      'To automatically add or remove compute instances based on live CPU/traffic metrics, while distributing incoming requests evenly across healthy instances',
      'To convert single-page apps into native mobile iOS apps',
      'To restrict all incoming HTTP traffic to a single IP address'
    ],
    correctIndex: 1,
    explanation: 'An Auto Scaling Group dynamically scales server instance count up during high traffic spikes (maintaining availability) and scales down during lulls (reducing costs), while the Load Balancer routes requests only to healthy instances.'
  },
  {
    id: 'cloud-6',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'What is the primary optimization benefit of the Multi-Stage Dockerfile below?',
    codeSnippet: `# Stage 1: Build & Compile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
    language: 'dockerfile',
    options: [
      'It installs Docker inside the container',
      'It creates a drastically smaller and more secure production image by discarding heavy build tools, compilers, and source code files from Stage 1',
      'It allows the container to run on Kubernetes without an ingress controller',
      'It runs npm build continuously in the background'
    ],
    correctIndex: 1,
    explanation: 'Multi-stage builds leave behind intermediate build dependencies, SDKs, devDependencies, and raw source code from Stage 1. Only the compiled `dist/` and production runtime artifacts are copied to the final `runner` image, reducing image size from ~1GB to ~100MB.'
  },
  {
    id: 'cloud-7',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'What happens in Kubernetes if the `api-server` container exceeds the `128Mi` memory limit below?',
    codeSnippet: `apiVersion: v1
kind: Pod
metadata:
  name: api-server
spec:
  containers:
  - name: app
    image: my-api:latest
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"`,
    language: 'yaml',
    options: [
      'The CPU is throttled to 0% until memory drops',
      'The Linux kernel OOM killer terminates the container, and Kubernetes marks the Pod with `OOMKilled` (restarting it if `restartPolicy` allows)',
      'Kubernetes automatically upgrades the physical node hardware',
      'Memory is swapped to AWS S3 without restarting the process'
    ],
    correctIndex: 1,
    explanation: 'Unlike CPU usage (which is throttled when limits are reached), exceeding container memory limits triggers an Out-Of-Memory (`OOMKilled`) termination by the Linux cgroup memory subsystem, restarting the container.'
  },
  {
    id: 'cloud-8',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'If an IAM user has the AWS Policy below, can they execute `s3:DeleteObject` on `company-bucket/file.pdf`?',
    codeSnippet: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::company-bucket/*"
    },
    {
      "Effect": "Deny",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::company-bucket/*"
    }
  ]
}`,
    language: 'json',
    options: [
      'Yes, because `s3:*` includes delete permissions and was evaluated first',
      'No, because in AWS IAM policy evaluation, an explicit `Deny` ALWAYS overrides any `Allow`',
      'Yes, but only if the request originates from within the AWS VPC',
      'Only if the user has multi-factor authentication (MFA) enabled'
    ],
    correctIndex: 1,
    explanation: 'In AWS IAM authorization logic, an explicit `Deny` in any matching statement always takes precedence over any `Allow` (even wildcards like `s3:*`), definitively blocking `s3:DeleteObject`.'
  },
  {
    id: 'cloud-9',
    category: 'cloud',
    categoryName: 'Cloud',
    question: 'How does the `web` container communicate with the database container in the `docker-compose.yml` configuration below?',
    codeSnippet: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:3000"
    environment:
      - DB_HOST=postgres-db
    depends_on:
      - postgres-db

  postgres-db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=secret`,
    language: 'yaml',
    options: [
      'It must connect to `localhost:8080`',
      'Docker Compose creates an automatic default bridge network where containers resolve each other by their service name (`postgres-db`) via internal DNS',
      'They can only communicate if hosted on separate AWS EC2 instances',
      'They must use public IP addresses'
    ],
    correctIndex: 1,
    explanation: 'Docker Compose creates a shared user-defined bridge network for all services in the file. Embedded DNS allows the `web` container to reach the database simply by using the service hostname `postgres-db`.'
  }
];
