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
import charmStoreThumb from '../assets/CharmStoreKH/WebsiteThumbnail.png';
import OpenWeather from '../assets/Tools/OpenWeather.png';
import googleMap from '../assets/Tools/googleMap.png';
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiGooglemaps, SiSocketdotio, SiExpress, SiVite, SiNodedotjs, SiYoutube, SiTypescript, SiSupabase, SiCloudinary } from "react-icons/si";
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
        pinned: true,
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
        pinned: true,
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
    // CHARM STORE KH (ID:3)
    // ===========================

    {
        id: 3,
        title: 'Charm Store KH',
        langKey: "charmstorekh",
        public: true,
        red: true,
        description: 'A Cambodia-only e-commerce store for stationery, plushies, and everyday essentials, built around an admin dashboard that works almost like its own website builder.',
        bread: '/portfolio',
        pinned: true,
        thumbnail: charmStoreThumb,
        designed: true,
        developed: true,
        demo: 'https://charmstorekh.vercel.app/',
        code: false,
        tags: ['Next.js', 'TypeScript', 'Supabase', 'Cloudinary', 'E-commerce', 'Admin Dashboard', 'OAuth'],
        summary: {
            title: 'Development Summary',
            framework: 'Next.js (TypeScript)',
            style: 'Tailwind CSS',
            API: 'Supabase + Cloudinary',
        },
        percent: { typescript: 88.4, plpgsql: 2.6, css: 12.0, html: 2.0 },
        languages: { typescript: 'TypeScript', plpgsql: 'PLpgSQL', css: 'CSS', javascript: 'JavaScript', html: 'HTML' },
        Information: {
            title: 'Charm Store KH',
            description: 'Charm Store KH is a Cambodia-only online store for stationery, plushies, and lifestyle essentials. The real core of the project is the admin dashboard, which works almost like a private website builder, letting the owner design products, banners, and pages with custom, self-made slugs without writing a single line of code.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Cart, Checkout & Filtering',
                    description: '– Customers filter products, build a cart, and check out. Since there is no payment gateway, checkout gives them a personal user ID to copy and send over social media to confirm the order.'
                },
                features2: {
                    title: 'Website-Builder Admin Dashboard',
                    description: '– A custom text editor and image uploader let the admin design products, banners, and even pages with custom slugs, essentially running the whole site without code.'
                },
                features3: {
                    title: 'Social Login with RLS',
                    description: '– Users sign in with Google, Discord, or Facebook through Supabase Auth, with row-level security keeping every user\'s data properly scoped.'
                },
                features4: {
                    title: 'Automatic Image Optimization',
                    description: '– Every uploaded file is stored through Cloudinary and automatically converted to WebP, keeping storage light and pages fast.'
                }
            },
            WhyThisProject: {
                title: 'Why This Project?',
                description: "I wanted to build something that could actually go live for local use in Cambodia, not just a demo. The bigger challenge was the admin side: instead of hardcoding pages, I built a dashboard that lets a non-technical owner design the storefront, banners, and even URL slugs on their own.",
            },
            HowItWorks: {
                title: 'How It Works?',
                steps: {
                    step1: {
                        title: 'Customer Signs In & Browses',
                        description: '– Shoppers log in with Google, Discord, or Facebook, then filter and search through the catalog.'
                    },
                    step2: {
                        title: 'Add to Cart & Checkout',
                        description: '– Items go into the cart, and checkout generates a user ID, which the customer sends over social media to complete the order.'
                    },
                    step3: {
                        title: 'Admin Builds & Manages Everything',
                        description: '– From the dashboard, the admin edits products, banners, and pages, and sets custom slugs, all through a built-in text and image editor.'
                    },
                },
                description: 'Charm Store KH pairs a simple shopping flow for customers with a powerful, code-free control panel for the person actually running the store.',
            },
            HowIBuiltIt: {
                title: 'How I Built this Project',
                frameworks: {
                    framework1: {
                        icon: RiNextjsFill,
                        name: 'Next.js',
                        description: 'Handles routing, rendering, and the overall app structure.',
                        color: '#ffffff',
                    },
                    framework2: {
                        icon: SiTypescript,
                        name: 'TypeScript',
                        description: 'Keeps the growing codebase, especially the admin dashboard, type-safe and easier to maintain.',
                        color: '#3178c6',
                    },
                },
                Styles: {
                    style1: {
                        icon: RiTailwindCssFill,
                        name: 'Tailwind CSS',
                        description: 'Utility-first styling for both the storefront and the dashboard UI.',
                        color: '#38bdf8',
                    },
                },
                Api: {
                    api1: {
                        icon: SiSupabase,
                        name: 'Supabase',
                        description: 'Row-level-secured database plus authentication, including Google, Discord, and Facebook OAuth.',
                        color: '#3ecf8e',
                    },
                    api2: {
                        icon: SiCloudinary,
                        name: 'Cloudinary',
                        description: 'Stores every uploaded file and auto-converts it to WebP to save storage space.',
                        color: '#3448c5',
                    },
                },
            },
            screenshots: {
                screenshot1: charmStoreThumb,
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
        pinned: true,
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
        pinned: true,
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
        code: 'https://github.com/LiebeandSkye/SakiKaraoke.git',
        demo: 'https://sakikaraoke.vercel.app/',
        designed: true,
        developed: true,
        pinned: true,
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
            description: 'SakiKaraoke is a real-time collaborative karaoke web application. Users create a virtual room with a 6-character code, share it with friends, hop on a Discord call for live voice chat, and sing together. Powered by Socket.IO websockets for sub-second real-time state synchronization, video playback and timestamped LRC lyrics stay in ultra-low latency sync so singing is seamlessly smooth.',
            coreFeatures: {
                title: 'Core Features',
                features1: {
                    title: 'Room System & Low-Latency Sync',
                    description: '– Create a room with a 6-digit code, share it, and sing in sync with friends using low-latency Socket.IO websockets.'
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
                },
                features5: {
                    title: 'Discord Voice Call Integration',
                    description: '– Join a Discord voice call for live voice chat while using the website; combined with Socket.IO real-time sync, group singing is seamlessly smooth and lag-free.'
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
                        title: 'Real-time Synced Playback & Discord Call',
                        description: '– Sing over a Discord voice call while host controls are broadcast via Socket.IO for sub-second low latency, keeping singing seamlessly smooth.'
                    },
                    step3: {
                        title: 'Drift Correction & Lyrics',
                        description: '– Clients verify timing every 2 seconds and re-sync if drifted >300ms, while lyrics scroll using synchronized offsets.'
                    },
                },
                description: 'SakiKaraoke combines Discord voice calls with sub-second Socket.IO synchronization to deliver a seamlessly smooth, lag-free collaborative karaoke experience.',
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