export const QUIZ_CATEGORIES = [
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    description: 'Components, hooks, state lifecycle, virtual DOM, and React 19 patterns.',
  },
  {
    id: 'html',
    name: 'HTML',
    icon: '🌐',
    description: 'Semantic markup, accessibility, forms, modern APIs, and web fundamentals.',
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    description: 'Flexbox, Grid, CSS box model, specificity, animations, and modern units.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    description: 'Closures, Event Loop, prototypes, async/await, scope, and ES6+ features.',
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    description: 'JVM architecture, OOP, Collections, Concurrency, and Spring fundamentals.',
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'Data structures, list comprehensions, decorators, GIL, and OOP.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    description: 'Event-driven I/O, streams, buffers, modules, and backend microservices.',
  },
  {
    id: 'database',
    name: 'Database',
    icon: '🗄️',
    description: 'SQL vs NoSQL, ACID, B-Tree indexes, transactions, joins, and caching.',
  },
  {
    id: 'api',
    name: 'API',
    icon: '🔌',
    description: 'REST constraints, GraphQL, WebSockets, HTTP methods, status codes, and auth.',
  },
  {
    id: 'core_concepts',
    name: 'Core concepts',
    icon: '🧠',
    description: 'Essential fundamentals including OOP, Data Structures, Algorithms, and problem-solving patterns.',
  },
  {
    id: 'cloud',
    name: 'Cloud',
    icon: '☁️',
    description: 'Cloud services overview (AWS, Azure, GCP), deployments, IaC, serverless, scaling, and more.',
  },
  {
    id: 'typescript',
    name: 'Typescript',
    icon: '📘',
    description: 'Types, interfaces, generics, type narrowing, utility types, and strict mode.',
  },
  {
    id: 'nextjs',
    name: 'NextJs',
    icon: '▲',
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
    question: 'What is the primary benefit of using semantic HTML elements like <article>, <section>, and <nav>?',
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
      'loading="eager"',
      'Explicit `width` and `height` attributes (or aspect-ratio in CSS)',
      'alt="decorative"',
      'decoding="sync"'
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

  // ─────────────────────────────────────────────────────────────
  // 2. CSS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'css-1',
    category: 'css',
    categoryName: 'CSS',
    question: 'When `box-sizing: border-box` is set on an element with `width: 200px` and `padding: 20px`, what is the final rendered width of the element?',
    options: [
      '240px',
      '200px',
      '160px',
      '220px'
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
      'div#header ul li.active',
      '#main-nav .menu-item.active',
      'div.container div.wrapper ul.list li.item.active a:hover',
      'body main section article div p.highlight'
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
      'Flexbox does not support gap properties, while Grid does',
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
      'z-index only accepts numbers up to 1000 in modern CSS',
      'The element is trapped in a lower stacking context created by a parent (e.g., parent with opacity < 1 or transform)',
      'z-index only works when display is set to inline-block',
      'The browser ignores z-index unless CSS flexbox is disabled'
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
      'rem',
      'vh',
      'vw',
      'ch'
    ],
    correctIndex: 2,
    explanation: '`vw` stands for Viewport Width, where `1vw` equals 1% of the total width of the browser viewport window.'
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
    options: [
      '1, 2, 3, 4',
      '1, 4, 3, 2',
      '1, 4, 2, 3',
      '1, 3, 4, 2'
    ],
    correctIndex: 1,
    explanation: 'Synchronous code runs first (1, 4). Next, the Microtask Queue (Promise callbacks) drains before macrotasks (3). Finally, the Macrotask/Task Queue (setTimeout) executes (2). Hence: 1, 4, 3, 2.'
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
      '"null" and "undefined"',
      '"object" and "undefined"',
      '"undefined" and "object"',
      '"primitive" and "undefined"'
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
      'Arrow functions set `this` to undefined in non-strict mode'
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
      'An array where elements of type K and T alternate',
      'An object type whose property keys are K and property values are T',
      'A tuple storing immutable database records',
      'A function signature mapping parameter K to return type T'
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
      'typeof',
      'keyof',
      'instanceof',
      'infer'
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
      'It removes all optional properties from type T',
      'It constructs a type with all properties of T set to optional (`?`)',
      'It extracts half of the fields defined in interface T',
      'It makes all properties in T read-only'
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
      '"use browser"',
      '"use client"',
      '"enable reactive"',
      '"use dynamic"'
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
      'Its main JavaScript execution loop runs on one thread, while I/O operations and background tasks are delegated to the libuv thread pool and OS kernel asynchronously',
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
      '`ArrayList` uses a dynamic contiguous array with O(1) random access; `LinkedList` uses doubly-linked nodes with O(1) insertions/deletions at ends but O(n) element search',
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
      'They maintain balanced tree depth, providing O(log N) lookups, insertions, deletions, and efficient range queries (`BETWEEN`, `>`, `<`)',
      'They eliminate the need for primary keys',
      'They execute all queries in O(1) constant time without disk I/O'
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
      '400 Bad Request',
      '401 Unauthorized',
      '403 Forbidden',
      '404 Not Found'
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
      'BST is O(N); Unsorted Array is O(1)',
      'BST is O(log N); Unsorted Array is O(N)',
      'BST is O(N^2); Unsorted Array is O(log N)',
      'Both are O(1) constant time'
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
    question: 'Why does a Hash Table provide average O(1) constant time lookups?',
    options: [
      'It performs binary search on all stored keys simultaneously',
      'A hash function computes an array index directly from the key, allowing direct memory bucket access without scanning other keys',
      'It stores all values in CPU L1 cache exclusively',
      'It maintains a sorted linked list of all items'
    ],
    correctIndex: 1,
    explanation: 'A hash function converts a key into a numerical index pointing directly to an array bucket. In the average case (with few collisions), accessing the element at that calculated index is an `O(1)` direct array lookup.'
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
  }
];
