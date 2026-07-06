import continentalThumb from '../assets/Continental/WebsiteThumbnail.webp';
import cambodiaThumb from '../assets/DiscoverCambodia/WebsiteThumbnail.webp';
import groq from '../assets/Tools/groq.png';
import None from '../assets/Tools/None.png';
import continentalScreenshot1 from '../assets/Continental/screenshot1.webp';
import continentalScreenshot2 from '../assets/Continental/screenshot2.webp';
import continentalScreenshot6 from '../assets/Continental/screenshot6.webp';
import continentalScreenshot8 from '../assets/Continental/screenshot8.webp';
import continentalScreenshot9 from '../assets/Continental/screenshot9.webp';
import continentalScreenshot10 from '../assets/Continental/screenshot10.webp';
import Memory1 from '../assets/AI_MemoryPorter/Memory1.png';
import Memory2 from '../assets/AI_MemoryPorter/Memory2.png';
import nebulaThumb from '../assets/Nebula/WebsiteThumbnail.jpg';
import nebulaScreenshot1 from '../assets/Nebula/screenshot1.jpg';
import sakiKaraokeThumb from '../assets/SakiKaraoke/WebsiteThumbnail.png';
import OpenWeather from '../assets/Tools/OpenWeather.png';
import googleMap from '../assets/Tools/googleMap.png';
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiGooglemaps, SiSocketdotio, SiExpress, SiVite, SiNodedotjs, SiYoutube } from "react-icons/si";
import { MdLyrics } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BsLayersHalf } from "react-icons/bs";

const Projects = [
    {
        id: 1,
        title: 'Continental',
        langKey: "continental",
        public: true,
        red: true,
        description: 'A car e-commerce website with virtual assistant and clean images of cars at affordable prices.',
        bread: '/portfolio',
        code: 'https://github.com/LiebeandSkye/Continental',
        demo: 'https://continental-neon.vercel.app/',
        designed: true,
        developed: true,
        thumbnail: continentalThumb,
        tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'API', 'E-commerce', 'Virtual Assistant'],
        summary: {
            title: 'Development Summary',
            framework: 'React',
            style: 'Tailwind CSS',
            API: 'Groq',
        },
        percent: { javascript: 97.6, html: 0.4, css: 2.0 },
        Information: {
            title: 'Continental',
            description: 'Continental is a car e-commerce website located in Phnom Penh, Cambodia. This project was developed as a final project (ETEC II) to provide a modern, user-friendly experience including virtual assistance and simulated payment features. Built with React and Tailwind CSS.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Virtual Assistance',
                    description: '– Integrated AI assistant to help users with services and recommendations.'
                },
                features2: {
                    title: 'Email & Notifications',
                    description: '– EmailJS handles contact forms and automated responses.'
                },
                features3: {
                    title: 'Responsive, Animated UI',
                    description: '– Styled with Tailwind CSS and animated with Framer Motion.'
                },
                features4: {
                    title: 'CMS-Driven Content',
                    description: '– Contentful used for dynamic content management.'
                }
            },
            WhyThisProject: {
                title: 'Why This Project?',
                description: "Developed as a final project at ETEC II. It was randomly assigned as car e-commerce, which pushed me to research UI patterns and real-world implementations.",
            },
            HowItWorks: {
                title: 'How It Works?',
                steps: {
                    step1: {
                        title: 'Visitor Browses Cars',
                        description: '– Users can filter and explore car listings.'
                    },
                    step2: {
                        title: 'Chatbot Answers Questions',
                        description: '– AI assistant provides instant responses.'
                    },
                    step3: {
                        title: 'Checkout',
                        description: '– Simulated payment system for demonstration.'
                    },
                },
                description: 'This project demonstrates how modern frontend tools can create a professional e-commerce experience.',
            },
            HowIBuiltIt: {
                title: 'How I Built this Project',
                frameworks: {
                    framework1: {
                        icon: FaReact,
                        name: 'React.js',
                        description: 'Used for routing and state management.',
                        color: '#61dafb',
                    },
                },
                Styles: {
                    style1: {
                        icon: RiTailwindCssFill,
                        name: 'Tailwind CSS',
                        description: 'Utility-first CSS framework.',
                        color: '#38bdf8',
                    },
                },
                Api: {
                    api1: {
                        icon: googleMap,
                        name: 'Google Maps',
                        description: 'Location services integration.',
                        color: '#4caf50',
                    },
                    api2: {
                        icon: groq,
                        name: 'Groq',
                        description: 'AI virtual assistant integration.',
                        color: '#ffffff',
                    },
                },
            },
            languages: { lang1: 'JavaScript', lang2: 'HTML', lang3: 'CSS' },
            screenshots: {
                screenshot4: continentalThumb,
                screenshot1: continentalScreenshot1,
                screenshot2: continentalScreenshot2,
                screenshot6: continentalScreenshot6,
                screenshot10: continentalScreenshot10,
                screenshot8: continentalScreenshot8,
                screenshot9: continentalScreenshot9,
            },
        },
    },

    // ===========================
    // DISCOVER CAMBODIA (ID:2)
    // ===========================

    {
        id: 2,
        title: 'Discover Cambodia',
        langKey: "cambodia",
        public: true,
        red: true,
        description: 'An informative tourism website about Cambodia featuring weather tools, tourist destinations, and educational content.',
        bread: '/portfolio',
        code: 'https://github.com/LiebeandSkye/Travel_Project',
        demo: 'https://edcambodia-164ed.web.app/',
        thumbnail: cambodiaThumb,
        designed: true,
        developed: true,
        tags: ['JavaScript', 'Python', 'HTML', 'CSS', 'Tailwind CSS', 'Tourism', 'Firebase'],
        summary: {
            framework: 'None (Vanilla)',
            style: 'Tailwind CSS',
            API: 'OpenWeatherMap API',
        },
        percent: { javascript: 50, html: 25, css: 15, python: 10 },
        languages: { javascript: 'JavaScript', html: 'HTML', css: 'CSS', python: 'Python' },
        Information: {
            title: 'Discover Cambodia',
            description: 'Discover Cambodia is a university project built to promote Cambodian tourism. It provides detailed information about provinces, cultural heritage, tourist attractions, and real-time weather updates. The website was built before learning React, using pure HTML, CSS, JavaScript, and Python.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Tourist Destination Pages',
                    description: '– Detailed pages showcasing provinces and major attractions.'
                },
                features2: {
                    title: 'Weather Integration',
                    description: '– Real-time weather data using a public API.'
                },
                features3: {
                    title: 'Responsive Design',
                    description: '– Fully responsive layout built with Tailwind CSS.'
                },
                features4: {
                    title: 'Firebase Hosting',
                    description: '– Deployed and hosted using Firebase.'
                }
            },
            WhyThisProject: {
                title: 'Why This Project?',
                description: 'This was one of my early university projects. It helped me understand how front-end and back-end logic connect before moving into frameworks like React.',
            },
            HowItWorks: {
                title: 'How It Works?',
                steps: {
                    step1: {
                        title: 'User Selects Province',
                        description: '– Visitors explore provinces and cultural information.'
                    },
                    step2: {
                        title: 'Weather Data Fetching',
                        description: '– JavaScript fetches live weather data from API.'
                    },
                    step3: {
                        title: 'Dynamic Content Rendering',
                        description: '– Python logic processes data for certain dynamic sections.'
                    },
                },
                description: 'The project combines frontend interactivity with backend logic to create a functional tourism information platform.',
            },
            HowIBuiltIt: {
                title: 'How I Built this Project',
                frameworks: {
                    framework1: {
                        icon: None,
                        name: 'None (Vanilla)',
                        description: 'HTML CSS and Javascript.',
                        color: '#8e8e93',
                    },
                },
                Styles: {
                    style1: {
                        icon: RiTailwindCssFill,
                        name: 'Tailwind CSS',
                        description: 'Used for styling and responsiveness.',
                        color: '#38bdf8',
                    },
                },
                Api: {
                    api1: {
                        icon: OpenWeather,
                        name: 'OpenWeatherMap API',
                        description: 'Used to fetch real-time weather data.',
                        color: '#ffffff',
                    },
                },
            },
        },
    },

    // ===========================
    // ELECTRONICS E-COMMERCE (ID:3)
    // ===========================

    {
        id: 3,
        title: 'Electronics E-commerce',
        langKey: "electronics",
        public: true,
        red: false,
        description: 'An experimental e-commerce platform built for learning purposes, focused on product listings, authentication, and cart systems.',
        bread: '/incomplete',
        thumbnail: null,
        designed: false,
        developed: false,
        demo: 'https://electronicshop-nine.vercel.app/',
        code: 'https://github.com/LiebeandSkye/electronic_shop',
        tags: ['Vanilla', 'Vercel', 'HTML', 'CSS', 'JavaScript', 'E-commerce'],
        summary: {
            framework: 'React',
            style: 'CSS / Tailwind',
            API: 'Firebase',
        },
        percent: { javascript: 70, html: 15, css: 15 },
        languages: { javascript: 'JavaScript', html: 'HTML', css: 'CSS' },
        Information: {
            title: 'Electronics E-commerce',
            description: 'This project was created mainly for learning advanced concepts such as authentication, cart management, and database integration. It is still under development.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Product Listings',
                    description: '– Displays electronic products dynamically.'
                },
                features2: {
                    title: 'Cart System',
                    description: '– Add and remove items from shopping cart.'
                },
                features3: {
                    title: 'Database Integration',
                    description: '– Products stored and fetched from Pinterest (lol).'
                }
            },
            WhyThisProject: {
                title: 'Why This Project?',
                description: 'Built as a personal learning challenge to understand real-world e-commerce architecture.',
            },
            HowItWorks: {
                title: 'How It Works?',
                steps: {
                    step1: {
                        title: 'User Browses Products',
                        description: '– Products dynamically rendered from database.'
                    },
                    step2: {
                        title: 'Adds to Cart',
                        description: '– Cart state managed using React state.'
                    },
                    step3: {
                        title: 'Authentication Required',
                        description: '– Users must log in to proceed.'
                    },
                },
                description: 'The goal is to eventually evolve this into a full production-ready e-commerce platform.',
            },
            HowIBuiltIt: {
                title: 'How I Built this Project',
                frameworks: {
                    framework1: {
                        icon: None,
                        name: 'None (Vanilla)',
                        description: 'HTML CSS and Javascript.',
                        color: '#8e8e93',
                    },
                },
                Styles: {
                    style1: {
                        icon: RiTailwindCssFill,
                        name: 'Tailwind CSS',
                        description: 'Utility-first CSS framework.',
                        color: '#38bdf8',
                    },
                },
                Api: {
                    api1: {
                        icon: None,
                        name: 'None',
                        description: 'No API integration.',
                        color: '#8b949e',
                    },
                },
            },
        },

    },
    // ===========================
    // AI_MEMORYPORTER (ID:4)
    // ===========================

    {
        id: 4,
        title: 'AI MemoryPorter',
        langKey: "MemoryPorter",
        public: true,
        red: true,
        description: 'A privacy-first tool to curate, optimize, and transfer chat history between different AI providers using JSON-to-Markdown processing.',
        bread: '/portfolio',
        thumbnail: Memory1,
        designed: true,
        developed: true,
        demo: 'https://liebeandskye.github.io/AI_MemoryPorter/',
        code: 'https://github.com/LiebeandSkye/AI_MemoryPorter',
        tags: ['React.js', 'Tailwind CSS v4', 'Vite', 'Git Automation', 'Privacy-Focused'],
        summary: {
            framework: 'React 19',
            style: 'Tailwind CSS v4',
            API: 'Client-side FileReader',
        },
        percent: { javascript: 97.0, html: 2.8, css: 0.2 },
        languages: { javascript: 'JavaScript', html: 'HTML', css: 'CSS' },
        Information: {
            title: 'AI MemoryPorter',
            description: 'AI MemoryPorter was built to solve the "context loss" problem when switching between AI models. It allows users to upload Claude export files, select specific high-value conversations, and compile them into a token-optimized Markdown file that can be used as a knowledge base for other AIs.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Granular Selection',
                    description: '– Interactive modal allows users to pick specific chats instead of dumping a whole archive.'
                },
                features2: {
                    title: 'Local Processing',
                    description: '– Uses browser-based file reading so user data never touches a server.'
                },
                features3: {
                    title: 'Multi-File Support',
                    description: '– Handles conversations.json, users.json, and memories.json simultaneously.'
                },
                features4: {
                    title: 'Token Optimization',
                    description: '– Converts messy JSON into clean, indexed Markdown for better AI retrieval (RAG).'
                }
            },
            WhyThisProject: {
                title: 'Why This Project?',
                description: 'Dumping huge files into AI context windows is expensive and inaccurate. I built this to surgically provide AI with the exact context it needs while maintaining total user privacy.',
            },
            HowItWorks: {
                title: 'How It Works?',
                steps: {
                    step1: {
                        title: 'Upload JSON Export',
                        description: '– User drops their AI provider data export into the staging area.'
                    },
                    step2: {
                        title: 'Curation & Filtering',
                        description: '– Select only the conversations relevant to the current work session.'
                    },
                    step3: {
                        title: 'Markdown Generation',
                        description: '– The app compiles a structured .md file ready for injection into any LLM.'
                    },
                },
                description: 'This project utilizes advanced JavaScript file handling to manage large data sets entirely on the client side.',
            },
            HowIBuiltIt: {
                title: 'How I Built this Project',
                frameworks: {
                    framework1: {
                        icon: FaReact,
                        name: 'React.js',
                        description: 'Used for the component-based UI and state management for file staging.',
                        color: '#61dafb',
                    },
                },
                Styles: {
                    style1: {
                        icon: RiTailwindCssFill,
                        name: 'Tailwind CSS v4',
                        description: 'Leveraging the latest utility-first features for a sleek, dark-mode interface.',
                        color: '#38bdf8',
                    },
                },
                Api: {
                    api1: {
                        icon: LuFileSpreadsheet,
                        name: 'Browser File API',
                        description: 'Client-side processing for maximum data security.',
                        color: '#2ea043',
                    },
                },
            },
            screenshots: {
                screenshot1: Memory1,
                screenshot2: Memory2,
            }
        },
    },
    // ===========================
    // PROJECT NEBULA (ID:5)
    // ===========================
    {
        id: 5,
        title: 'Project Nebula',
        langKey: "nebula",
        public: true,
        red: true,
        description: 'A multiplayer social deduction game inspired by Gnosia, featuring day/night rounds, role abilities, and real-time Socket.IO gameplay.',
        bread: '/portfolio',
        thumbnail: nebulaThumb,
        designed: true,
        developed: true,
        demo: 'https://nebula-eight-self.vercel.app',
        code: 'https://github.com/LiebeandSkye/Nebula',
        tags: ['React.js', 'Socket.IO', 'Express', 'Multiplayer', 'Social Deduction', 'Game Systems'],
        summary: {
            framework: 'React + Vite',
            style: 'Tailwind CSS v4',
            API: 'Socket.IO + Express API',
        },
        percent: { javascript: 88.0, html: 5.0, css: 7.0 },
        languages: { javascript: 'JavaScript', html: 'HTML', css: 'CSS' },
        Information: {
            title: 'Project Nebula',
            description: 'Project Nebula is a multiplayer social deduction game inspired by Gnosia. Players enter day/night cycles, discuss, vote, and use role-specific abilities in real time through a Socket.IO-powered architecture.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Real-Time Multiplayer Rooms',
                    description: '– Players can create and join live game rooms with synchronized state updates.',
                },
                features2: {
                    title: 'Role System with Unique Abilities',
                    description: '– Includes roles like Engineer, Doctor, Guardian Angel, Lawyer, Gnosia, Traitor, and Illusionist.',
                },
                features3: {
                    title: 'Day/Night Game Loop',
                    description: '– Structured phases for discussion, voting, role actions, and result announcements.',
                },
                features4: {
                    title: 'Host-Controlled Mission Settings',
                    description: '– Hosts can configure role toggles and game balance settings for each mission.',
                }
            },
            WhyThisProject: {
                title: 'Why This Project?',
                description: 'I wanted to build a complete real-time strategy/social game system instead of a standard CRUD app. Nebula let me design game rules, role interactions, and multiplayer synchronization in one production-like project.',
            },
            HowItWorks: {
                title: 'How It Works?',
                steps: {
                    step1: {
                        title: 'Lobby and Setup',
                        description: '– Players gather in a lobby while the host configures mission settings and role options.',
                    },
                    step2: {
                        title: 'Day Discussion and Voting',
                        description: '– Players discuss suspicious behavior, nominate targets, and vote for Cold Sleep.',
                    },
                    step3: {
                        title: 'Night Actions and Resolution',
                        description: '– Gnosia and special roles perform actions, then the game announces outcomes and checks win conditions.',
                    },
                },
                description: 'Nebula combines social deduction mechanics with low-latency networking so every role action and vote is reflected instantly for all players.',
            },
            HowIBuiltIt: {
                title: 'How I Built this Project',
                frameworks: {
                    framework1: {
                        icon: FaReact,
                        name: 'React + Vite',
                        description: 'Used for fast client-side rendering and gameplay UI updates.',
                        color: '#61dafb',
                    },
                },
                Styles: {
                    style1: {
                        icon: RiTailwindCssFill,
                        name: 'Tailwind CSS v4',
                        description: 'Used to build responsive game panels, role UI, and polished visual states.',
                        color: '#38bdf8',
                    },
                },
                Api: {
                    api1: {
                        icon: SiSocketdotio,
                        name: 'Socket.IO',
                        description: 'Bi-directional events power real-time room, chat, vote, and action synchronization.',
                        color: '#ffffff',
                    },
                    api2: {
                        icon: SiExpress,
                        name: 'Express.js API',
                        description: 'Handles server-side room lifecycle, game loop logic, and mission orchestration.',
                        color: '#ffffff',
                    },
                },
            },
            screenshots: {
                screenshot1: nebulaThumb,
                screenshot2: nebulaScreenshot1,
            }
        },
    },
    {
        id: 6,
        title: 'SakiKaraoke',
        langKey: "sakikaraoke",
        public: true,
        red: true,
        description: 'A real-time collaborative karaoke web app. Create a room, share the code, and sing together — everyone stays in sync while you take turns on the mic.',
        bread: '/portfolio',
        code: 'https://github.com/LiebeandSkye/SakiKaraoke',
        demo: 'https://sakikaraoke.vercel.app/',
        designed: true,
        developed: true,
        thumbnail: sakiKaraokeThumb,
        tags: ['React.js', 'Socket.IO', 'Express', 'Vite', 'LRCLIB API', 'Real-time Sync', 'Karaoke'],
        summary: {
            title: 'Development Summary',
            framework: 'React 19 + Vite 8',
            style: 'Vanilla CSS',
            API: 'Socket.io + LRCLIB',
        },
        percent: { javascript: 85.0, css: 12.0, html: 3.0 },
        Information: {
            title: 'SakiKaraoke',
            description: 'SakiKaraoke is a real-time collaborative karaoke web application. Users can create a virtual room with a 6-character code, share it with friends, and sing together. Playback is synchronized across all participants using a custom sync architecture, and timestamped LRC lyrics scroll in real-time.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Room System & Sync',
                    description: '– Create a room with a 6-digit code, share it, and sing in sync with friends.'
                },
                features2: {
                    title: 'YouTube Integration',
                    description: '– Paste any YouTube URL and watch synchronized video playback in real time.'
                },
                features3: {
                    title: 'Real-time Lyrics',
                    description: '– Timestamped LRC lyrics fetched from LRCLIB API scroll in sync with the song.'
                },
                features4: {
                    title: 'Singer Rotation & Controls',
                    description: '– Automatic singer rotation per segment or song, with host playback and lyrics offset controls.'
                }
            },
            WhyThisProject: {
                title: 'Why This Project?',
                description: "I wanted to build a high-fidelity real-time collaboration experience. Synced karaoke required solving complex networking challenges like latency-compensated playback synchronization, state propagation, and client-side drift correction.",
            },
            HowItWorks: {
                title: 'How It Works?',
                steps: {
                    step1: {
                        title: 'Host Creates Room',
                        description: '– The host generates a room code and sets the initial playlist.'
                    },
                    step2: {
                        title: 'Real-time Synced Playback',
                        description: '– Host controls are broadcast via Socket.IO with network latency compensation; guests sync positions via heartbeats.'
                    },
                    step3: {
                        title: 'Drift Correction & Lyrics',
                        description: '– Clients verify timing every 2 seconds and re-sync if drifted >300ms, while lyrics scroll using synchronized offsets.'
                    },
                },
                description: 'SakiKaraoke combines collaborative features with sub-second synchronization to deliver a premium karaoke experience.',
            },
            HowIBuiltIt: {
                title: 'How I Built this Project',
                frameworks: {
                    framework1: {
                        icon: FaReact,
                        name: 'React 19',
                        description: 'Powering the reactive user interface, component states, and player integration.',
                        color: '#61dafb',
                    },
                    framework2: {
                        icon: SiVite,
                        name: 'Vite 8',
                        description: 'Providing a lightning-fast build tool and dev server configuration.',
                        color: '#646cff',
                    },
                },
                Styles: {
                    style1: {
                        icon: BsLayersHalf,
                        name: 'Vanilla CSS',
                        description: 'Premium custom glassmorphic theme designed with CSS custom properties.',
                        color: '#ffffff',
                    },
                },
                Api: {
                    api1: {
                        icon: SiSocketdotio,
                        name: 'Socket.IO 4',
                        description: 'Handles bi-directional real-time events for playback controls, queues, and sync heartbeats.',
                        color: '#ffffff',
                    },
                    api2: {
                        icon: SiExpress,
                        name: 'Express 5',
                        description: 'Manages server routing, room states, and proxies requests to the LRCLIB API.',
                        color: '#ffffff',
                    },
                    api3: {
                        icon: MdLyrics,
                        name: 'LRCLIB API',
                        description: 'Fetches timestamped LRC lyrics for synchronized, line-by-line scrolling.',
                        color: '#ff79c6',
                    },
                    api4: {
                        icon: SiYoutube,
                        name: 'YouTube IFrame API',
                        description: 'Powers video playback and synchronization through react-player controls.',
                        color: '#ff0000',
                    },
                },
            },
            languages: { lang1: 'JavaScript', lang2: 'CSS', lang3: 'HTML' },
            screenshots: {
                screenshot1: sakiKaraokeThumb,
            },
        },
    },
];

export default Projects;
