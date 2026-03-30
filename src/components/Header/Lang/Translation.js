const translations = {
    en: {
        name: 'Kry Rithisak',
        job: 'Developer',
        description: 'Frontend developer with a deep passion for computer science. Currently working on some cool web projects.',
        searchPlaceholder: 'Type / to search',
        botTooltip: 'Quick chat with SakuPilot',
        fullscreenTooltip: 'Immersive Conversation with SakuPilot',
        themeTooltipLight: 'Switch to light mode',
        themeTooltipDark: 'Switch to dark mode',
        copyTooltip: 'Copy',
        copiedTooltip: 'Copied',
        copyMessage: 'Copied to clipboard',
        languageTooltip: 'Change language',
        aboutWebsite: 'About this website',
        inspiration: 'This website is inspired by the design of GitHub. Feel free to explore, check out my portfolio or even chat with SakuPilot AI to learn more about me. 🌟🌐🤖',
        randomizeBtn: 'Randomize',
        viewDemo: "View Demo",
        sourceCode: "Source Code",
        share: "Share :",
        pinned: "Pinned",
        search: {
            placeholder: 'Search this website...',
            pages: 'Pages',
            projects: 'Projects',
            visit: 'Visit',
            jumpTo: 'Jump to',
            quickChat: 'Quick Chat',
            immersive: 'Immersive',
            startConversation: 'Start conversation',
        },
        bot: {
            whatIsAbout: 'What is this project about?',
            techStack: 'What kind of tech stacks do you use?',
            role: 'What was your role in this project?',
        },
        contact: {
            name: 'Name',
            nameHolder: 'Enter your name',
            email: 'Email',
            emailHolder: 'Enter your email',
            tel: 'Phone Number',
            telHolder: 'Enter your phone number',
            message: 'Message',
            messageHolder: 'Your Message',
            submit: 'Send Message',
            submitSuccess: 'Message sent successfully!',
            tip: 'Alternatively, you can contact me on my socials',
        },
        bio: {
            title: "Hi 👋, I'm Kry Rithisak",
            description: "I'm on a journey to becoming a full-stack developer, building on my background in computer science and hands-on experience in web and mobile development 💻. I enjoy turning ideas into code and code into solutions, and I'm always trying to learn more about software engineering and architecture 💡. At the end of the day, I'm just a guy working towards a goal, driven by creativity and a love for technology. 🚀🚀",
            techStack: "Technologies I've Worked With:"
        },
        links: {
            welcome: 'Welcome',
            portfolio: 'Portfolio',
            contact: 'Get in Touch',
        },
        sakupilot: {
            drawerLabel: 'SakuPilot',
            drawerTag: 'AI Chat',
            drawerDesc: 'Chat with my AI assistant',
        },
        quotes: [
            { text: '"Insanity is doing the same thing, over and over again, but expecting different results."', author: '― Narcotics Anonymous' },
            { text: '"You only live once, but if you do it right, once is enough."', author: '― Mae West' },
            { text: '"Move fast and break things. Unless you are breaking stuff, you are not moving fast enough."', author: '― Mark Zuckerberg' },
            { text: '"Talk is cheap. Show me the code."', author: '― Linus Torvalds' },
            { text: '"It is better to be hated for what you are than to be loved for what you are not."', author: '― Andre Gide, Autumn Leaves' },
            { text: '"I may not have gone where I intended to go, but I think I have ended up where I needed to be."', author: '― Douglas Adams' },
            { text: '"We are what we pretend to be, so we must be careful about what we pretend to be."', author: '― Kurt Vonnegut' },
            { text: '"But better to get hurt by the truth than comforted with a lie."', author: '― Khaled Hosseini' },
            { text: '"Instead of worrying about what you cannot control, shift your energy to what you can create."', author: '― Roy T. Bennett' },
            { text: '"Sometimes it takes a good fall to really know where you stand"', author: '― Hayley Williams' },
        ],
        portfolio: {
            noMatches: 'No matches found',
            statusPublic: 'Public',
            btnDemo: 'View Demo',
            btnCode: 'Source Code',
        },
        projects: {
            titles: {
                frameworks: "Frameworks & Libraries",
                styling: "Styling & UI",
                api: "CMS & APIs",
                why: "Why This Project?",
                how: "How It Works",
                built: "How I Built This Project"
            },
            continental: {
                title: 'Continental',
                description: 'A car e-commerce website with virtual assistant and clean images of cars at affordable prices.',
                // 3 quick-tap suggested questions shown when this project is attached
                botQuestions: [
                    'What is the Continental project about?',
                    'What tech stack was used for Continental?',
                    'How does the AI virtual assistant work?',
                ],
                Information: {
                    title: 'Continental Website',
                    description: 'Continental is a car e-commerce website located in Phnom Penh, Cambodia. This project was developed as a final project (ETEC II) to provide a modern, user-friendly experience including virtual assistance and simulated payment features. Built with React and Tailwind CSS.',
                    coreFeatures: {
                        title: 'Core Features',
                        features1: { title: 'Virtual Assistance', description: 'Integrated AI assistant to help users with services and recommendations.' },
                        features2: { title: 'Email & Notifications', description: 'EmailJS handles contact forms and automated responses.' },
                        features3: { title: 'Responsive, Animated UI', description: 'Styled with Tailwind CSS and animated with Framer Motion.' },
                        features4: { title: 'CMS-Driven Content', description: 'Contentful used for dynamic content management.' },
                    },
                    whyThisProject: 'Developed as a final project at ETEC II. Randomly assigned as car e-commerce, pushing me to research UI patterns and real-world implementations.',
                    howItWorks: {
                        title: 'How It Works',
                        step1: { title: 'Visitor Browses Cars', description: 'Users can filter and explore car listings.' },
                        step2: { title: 'Chatbot Answers Questions', description: 'AI assistant provides instant responses.' },
                        step3: { title: 'Checkout', description: 'Simulated payment system for demonstration.' },
                        description: 'This project demonstrates how modern frontend tools can create a professional e-commerce experience.',
                    },
                    howIBuiltIt: {
                        title: 'How I Built this Project',
                        frameworks: { framework1: { name: 'React.js', description: 'Used for routing and state management.' } },
                        styles: { style1: { name: 'Tailwind CSS', description: 'Utility-first CSS framework.' } },
                        api: {
                            api1: { name: 'Google Maps', description: 'Location services integration.' },
                            api2: { name: 'Groq', description: 'AI virtual assistant integration.' },
                        },
                    }
                },
            },
            cambodia: {
                title: 'Discover Cambodia',
                description: 'An informative tourism website about Cambodia featuring weather tools, tourist destinations, and educational content.',
                botQuestions: [
                    'What is Discover Cambodia about?',
                    'How does the real-time weather feature work?',
                    'What technologies were used in Discover Cambodia?',
                ],
                Information: {
                    title: 'Discover Cambodia',
                    description: 'Discover Cambodia is a university project built to promote Cambodian tourism. Built with HTML, CSS, JavaScript, and Python.',
                    coreFeatures: {
                        title: 'Core Features',
                        features1: { title: 'Tourist Destination Pages', description: 'Detailed pages showcasing provinces and major attractions.' },
                        features2: { title: 'Weather Integration', description: 'Real-time weather data using a public API.' },
                        features3: { title: 'Responsive Design', description: 'Fully responsive layout built with Tailwind CSS.' },
                        features4: { title: 'Firebase Hosting', description: 'Deployed and hosted using Firebase.' },
                    },
                    whyThisProject: 'One of my early university projects. It helped me understand how front-end and back-end logic connect before moving into frameworks like React.',
                    howItWorks: {
                        title: 'How It Works',
                        step1: { title: 'User Selects Province', description: 'Visitors explore provinces and cultural information.' },
                        step2: { title: 'Weather Data Fetching', description: 'JavaScript fetches live weather data from API.' },
                        step3: { title: 'Dynamic Content Rendering', description: 'Python logic processes data for dynamic sections.' },
                    },
                    howIBuiltIt: {
                        title: 'How I Built this Project',
                        frameworks: { framework1: { name: 'None (Vanilla)', description: 'HTML, CSS, and JavaScript.' } },
                        styles: { style1: { name: 'Tailwind CSS', description: 'Used for styling and responsiveness.' } },
                        api: { api1: { name: 'OpenWeatherMap API', description: 'Used to fetch real-time weather data.' } },
                    }
                },
            },
            electronics: {
                title: 'Electronics E-commerce',
                description: 'An experimental e-commerce platform built for learning purposes, focused on product listings and cart systems.',
                botQuestions: [
                    'What is the Electronics E-commerce project?',
                    'How does the cart and authentication system work?',
                    'Why is this project still under development?',
                ],
                Information: {
                    title: 'Electronics E-commerce Website (Incomplete)',
                    description: 'This project was created mainly for learning advanced concepts such as authentication, cart management, and database integration. It is still under development.',
                    coreFeatures: {
                        title: 'Core Features',
                        features1: { title: 'Product Listings', description: 'Displays electronic products dynamically.' },
                        features2: { title: 'Cart System', description: 'Add and remove items from shopping cart.' },
                        features3: { title: 'Database Integration', description: 'Products stored and fetched from the cloud.' }
                    },
                    whyThisProject: 'Built as a personal learning challenge to understand real-world e-commerce architecture.',
                    howItWorks: {
                        title: 'How It Works',
                        step1: { title: 'User Browses Products', description: 'Products dynamically rendered from database.' },
                        step2: { title: 'Adds to Cart', description: 'Cart state managed using React state.' },
                        step3: { title: 'Authentication Required', description: 'Users must log in to proceed.' },
                    },
                    howIBuiltIt: {
                        title: 'How I Built this Project',
                        frameworks: {
                            framework1: { name: 'React + Vite', description: 'Used for a high-performance, reactive user interface.' }
                        },
                        styles: {
                            style1: { name: 'Tailwind CSS v4', description: 'Utilized for modern, rapid UI development.' }
                        },
                        api: {
                            api1: { name: 'Browser File API', description: 'Processes data locally for 100% user privacy.' },
                            api2: { name: 'None', description: 'Zero external API calls to ensure data security.' }
                        },
                    }
                }
            },
            MemoryPorter: {
                title: 'AI_MemoryPorter',
                description: 'An AI-powered personal memory management tool that helps users capture, organize, and retrieve their memories in a meaningful way.',
                botQuestions: [
                    'What exactly is AI_MemoryPorter?',
                    'How does the memory retrieval system work?',
                    'What tech stack is behind this AI tool?',
                ],
                Information: {
                    title: 'AI_MemoryPorter',
                    description: 'AI_MemoryPorter is a personal knowledge management system designed to act as a "second brain." It leverages AI to categorize unstructured thoughts and help users find connections between their ideas.',
                    coreFeatures: {
                        title: 'Core Features',
                        features1: { title: 'Semantic Search', description: 'Find memories based on meaning rather than just keywords.' },
                        features2: { title: 'AI Categorization', description: 'Automatically tags and organizes entries using LLMs.' },
                        features3: { title: 'Voice-to-Memory', description: 'Seamlessly convert voice notes into structured text data.' },
                        features4: { title: 'Privacy First', description: 'Secure storage ensuring your personal thoughts stay private.' },
                    },
                    whyThisProject: 'I wanted to solve the problem of "information overload" and create a tool that makes personal data actually useful and searchable.',
                    howItWorks: {
                        title: 'How It Works',
                        step1: { title: 'Capture', description: 'Input text, images, or voice notes into the app.' },
                        step2: { title: 'Process', description: 'The AI analyzes the context and extracts key themes.' },
                        step3: { title: 'Retrieve', description: 'Ask questions to your "memory" and get instant answers.' },
                    },
                    howIBuiltIt: {
                        title: 'How I Built this Project',
                        frameworks: { framework1: { name: 'Next.js', description: 'For a fast, SEO-friendly full-stack architecture.' } },
                        styles: { style1: { name: 'Tailwind CSS', description: 'For a clean, minimalist dashboard UI.' } },
                        api: {
                            api1: { name: 'Vector Database', description: 'Used for storing and querying embeddings.' },
                            api2: { name: 'OpenAI / Groq', description: 'Powering the natural language understanding.' }
                        },
                    }
                }
            },
        },
    },
    jp: {
        name: 'サク',
        job: '開発者',
        description: 'コンピュータサイエンスに強い情熱を持つフロントエンド開発者です。現在、クールなWebプロジェクトに取り組んでいます。',
        searchPlaceholder: '検索するには「/」を入力',
        botTooltip: 'SakuPilotとすぐにチャット',
        fullscreenTooltip: 'SakuPilotとのフルスクリーン会話',
        themeTooltipLight: 'ライトモードに切り替え',
        themeTooltipDark: 'ダークモードに切り替え',
        copyTooltip: 'コピー',
        copiedTooltip: 'コピーしました',
        copyMessage: 'クリップボードにコピーしました',
        languageTooltip: '言語を変更',
        aboutWebsite: 'このウェブサイトについて',
        inspiration: 'このサイトはGitHubのデザインからインスピレーションを受けています。ぜひポートフォリオを見たり、SakuPilot AIとチャットして、僕についてもっと知ってください。🌟🌐🤖',
        randomizeBtn: 'ランダム',
        viewDemo: "デモを見る",
        sourceCode: "ソースコード",
        share: 'シェアする : ',
        pinned: 'ピン留め',
        search: {
            placeholder: 'このウェブサイトを検索...',
            pages: 'ページ',
            projects: 'プロジェクト',
            visit: '訪問',
            jumpTo: 'ジャンプ',
            quickChat: 'クイックチャット',
            immersive: 'イマーシブ',
            startConversation: '会話を始める',
        },
        bot: {
            whatIsAbout: 'このプロジェクトは何ですか？',
            techStack: '使用した技術スタックは？',
            role: 'このプロジェクトでの役割は？',
        },
        contact: {
            name: '名前',
            nameHolder: '名前を入力',
            email: 'メールアドレス',
            emailHolder: 'メールアドレスを入力',
            tel: '電話番号',
            telHolder: '電話番号を入力',
            message: 'メッセージ',
            messageHolder: 'メッセージを入力',
            submit: '送信',
            submitSuccess: 'メッセージを送信しました！',
            tip: 'または、SNSからも連絡できます'
        },
        bio: {
            title: "こんにちは 👋 サクです",
            description: "コンピュータサイエンスのバックグラウンドを活かしながら、フルスタック開発者を目指しています 💻。Webやモバイル開発の経験を積みつつ、アイデアをコードに、コードを実際のソリューションに変えることを楽しんでいます。ソフトウェアエンジニアリングやアーキテクチャについても常に学び続けています 💡。目標に向かって挑戦し続ける、テクノロジー好きな一人の開発者です。🚀🚀",
            techStack: "これまで触れてきた技術:"
        },
        links: {
            welcome: 'ホーム',
            portfolio: 'ポートフォリオ',
            contact: 'お問い合わせ'
        },
        sakupilot: {
            drawerLabel: 'サクパイロット',
            drawerTag: 'AIチャット',
            drawerDesc: 'AIアシスタントとチャット',
        },
        quotes: [
            { text: '「狂気とは、同じことを何度も繰り返しながら、違う結果を期待することだ。」', author: '― Narcotics Anonymous' },
            { text: '「人生は一度きり。でも正しく生きれば、一度で十分だ。」', author: '― メイ・ウエスト' },
            { text: '「速く動いて、どんどん壊せ。何も壊していないなら、まだ遅い。」', author: '― マーク・ザッカーバーグ' },
            { text: '「口で言うのは簡単だ。コードを見せてくれ。」', author: '― リーナス・トーバルズ' },
            { text: '「ありのままの自分で嫌われるほうが、偽りの自分で愛されるよりいい。」', author: '― アンドレ・ジッド『地の糧』' },
            { text: '「思い通りの場所には行けなかったかもしれない。でも、行くべき場所にたどり着いた気がする。」', author: '― ダグラス・アダムズ' },
            { text: '「人は自分が演じているものになる。だからこそ、何を演じるかには気をつけなければならない。」', author: '― カート・ヴォネガット' },
            { text: '「嘘に慰められるより、真実に傷つくほうがいい。」', author: '― カーレド・ホッセイニ' },
            { text: '「コントロールできないことを心配するより、自分が生み出せることにエネルギーを使おう。」', author: '― ロイ・T・ベネット' },
            { text: '「大きく転んで初めて、自分の立ち位置がわかることもある。」', author: '― ヘイリー・ウィリアムス' }
        ],
        portfolio: {
            noMatches: '該当する作品は見つかりませんでした。',
            btnDemo: "デモを見る",
            btnCode: "ソースコードを見る",
            statusPublic: '公開中',
        },
        projects: {
            titles: {
                frameworks: "フレームワーク & ライブラリ",
                styling: "スタイリング & UI",
                api: "CMS & API",
                why: "なぜこのプロジェクト？",
                how: "仕組み",
                built: "このプロジェクトの構築方法"
            },
            continental: {
                title: 'コンティネンタル',
                description: 'AIアシスタント付きの車のECサイト。手頃な価格の車のクリーンな画像を提供します。',
                botQuestions: [
                    'コンティネンタルはどんなプロジェクトですか？',
                    'どの技術スタックを使いましたか？',
                    'バーチャルアシスタントはどのように動きますか？',
                ],
                Information: {
                    title: 'コンティネンタル ウェブサイト',
                    description: 'Continentalは、カンボジアのプノンペンに拠点を置く自動車のEコマースウェブサイトです。このプロジェクトはETEC IIの最終プロジェクトとして開発され、仮想アシスタントや模擬決済機能を含む、現代的で使いやすい体験を提供することを目的としています。ReactとTailwind CSSを使用して構築されています。',
                    coreFeatures: {
                        title: 'コア機能',
                        features1: { title: 'バーチャルアシスタント', description: 'サービスや推奨事項をユーザーに提供するAIアシスタントを統合。' },
                        features2: { title: 'メールと通知', description: 'EmailJSが連絡フォームと自動応答を処理。' },
                        features3: { title: 'レスポンシブ、アニメーションUI', description: 'Tailwind CSSでスタイリング、Framer Motionでアニメーション。' },
                        features4: { title: 'CMS管理コンテンツ', description: 'Contentfulを使用して動的コンテンツを管理。' },
                    },
                    whyThisProject: 'ETEC IIの最終プロジェクトとして開発。車のECサイトとしてランダムに割り当てられ、UIパターンと実際の実装を研究することになった。',
                    howItWorks: {
                        title: '仕組み',
                        step1: { title: '訪問者が車を閲覧', description: 'ユーザーは車のリストをフィルターして探索できます。' },
                        step2: { title: 'チャットボットが質問に回答', description: 'AIアシスタントが即座に回答。' },
                        step3: { title: 'チェックアウト', description: 'デモ用のシミュレートされた支払いシステム。' },
                        description: 'このプロジェクトは、最新のフロントエンドツールを活用することで、プロフェッショナルなEコマース体験をどのように実現できるかを示しています。',
                    },
                    howIBuiltIt: {
                        title: 'このプロジェクトの構築方法',
                        frameworks: { framework1: { name: 'React.js', description: 'ルーティングと状態管理に使用。' } },
                        styles: { style1: { name: 'Tailwind CSS', description: 'ユーティリティファーストのCSSフレームワーク。' } },
                        api: {
                            api1: { name: 'Google Maps', description: '位置情報サービスの統合。' },
                            api2: { name: 'Groq', description: 'AIバーチャルアシスタントの統合。' },
                        },
                    }
                },
            },
            cambodia: {
                title: 'カンボジアを発見',
                description: 'カンボジアの観光情報サイト。天気ツール、観光地、教育コンテンツを掲載。',
                botQuestions: [
                    'カンボジアを発見はどんなプロジェクトですか？',
                    '天気統合はどのように機能しますか？',
                    'どんな技術を使いましたか？',
                ],
                Information: {
                    title: 'カンボジアを発見',
                    description: '大学のプロジェクトとして作成されたカンボジアの観光情報サイト。HTML, CSS, JavaScript, Pythonで構築。',
                    coreFeatures: {
                        title: 'コア機能',
                        features1: { title: '観光地ページ', description: '州と主な観光地を紹介する詳細ページ。' },
                        features2: { title: '天気情報統合', description: '公開APIを使用してリアルタイムの天気データを取得。' },
                        features3: { title: 'レスポンシブデザイン', description: 'Tailwind CSSで完全にレスポンシブなレイアウトを構築。' },
                        features4: { title: 'Firebaseホスティング', description: 'Firebaseを使用してデプロイおよびホスト。' },
                    },
                    whyThisProject: '大学初期のプロジェクトの1つで、フロントエンドとバックエンドの接続を理解するのに役立った。',
                    howItWorks: {
                        title: '仕組み',
                        step1: { title: 'ユーザーが州を選択', description: '訪問者は州や文化情報を探索。' },
                        step2: { title: '天気データ取得', description: 'JavaScriptでAPIからライブ天気データを取得。' },
                        step3: { title: '動的コンテンツ表示', description: 'Pythonロジックで動的セクションを処理。' },
                    },
                    howIBuiltIt: {
                        title: 'このプロジェクトの構築方法',
                        frameworks: { framework1: { name: 'なし (バニラ)', description: 'HTML, CSS, JavaScriptを使用。' } },
                        styles: { style1: { name: 'Tailwind CSS', description: 'スタイリングとレスポンシブ対応に使用。' } },
                        api: { api1: { name: 'OpenWeatherMap API', description: 'リアルタイム天気データの取得に使用。' } },
                    }
                },
            },
            electronics: {
                title: '電子機器 Eコマース',
                description: '学習目的で構築された実験的なEコマースプラットフォーム。商品リストとカートシステムに重点を置いています。',
                botQuestions: [
                    '電子機器ECサイトについて教えてください。',
                    'カートシステムはどのように機能しますか？',
                    'なぜまだ開発中ですか？',
                ],
                Information: {
                    title: '電子機器 Eコマース ウェブサイト (未完成)',
                    description: 'このプロジェクトは、主に認証、カート管理、データベース統合などの高度な概念を学習するために作成されました。現在も開発中です。',
                    coreFeatures: {
                        title: 'コア機能',
                        features1: { title: '商品リスト', description: '電子機器の商品を動的に表示します。' },
                        features2: { title: 'カートシステム', description: 'ショッピングカートへの商品の追加と削除。' },
                        features3: { title: 'データベース統合', description: 'クラウドから商品を保存・取得します。' }
                    },
                    whyThisProject: '実際のEコマースアーキテクチャを理解するための、個人的な学習チャレンジとして構築されました。',
                    howItWorks: {
                        title: '仕組み',
                        step1: { title: 'ユーザーが商品を閲覧', description: 'データベースから動的にレンダリングされた商品。' },
                        step2: { title: 'カートに追加', description: 'Reactの状態管理を使用してカートの状態を管理。' },
                        step3: { title: '認証が必要', description: '続行するにはユーザーがログインする必要があります。' },
                    },
                    howIBuiltIt: {
                        title: 'このプロジェクトの構築方法',
                        frameworks: { framework1: { name: 'React.js', description: 'UIと状態管理のためのコアライブラリ。' } },
                        styles: { style1: { name: 'Tailwind CSS', description: 'ユーティリティファーストのCSSフレームワーク。' } },
                        api: { api1: { name: 'Firebase', description: '認証とDBのためのバックエンドサービス。' } },
                    }
                }
            },
            MemoryPorter: {
                title: 'AI_MemoryPorter',
                description: 'AIを活用したパーソナルメモリ管理ツール。思い出や知識をキャプチャ、整理し、意味のある形で取り出すのをサポートします。',
                botQuestions: [
                    'AI_MemoryPorterとは具体的に何ですか？',
                    'メモリの検索機能はどのように動きますか？',
                    'このAIツールにはどんな技術が使われていますか？',
                ],
                Information: {
                    title: 'AI_MemoryPorter',
                    description: 'AI_MemoryPorterは、「第二の脳」として機能するように設計された個人向けの知識管理システムです。AIを活用して整理されていない思考を分類し、アイデア間のつながりを見つける手助けをします。',
                    coreFeatures: {
                        title: 'コア機能',
                        features1: { title: 'セマンティック検索', description: 'キーワードだけでなく、意味に基づいて内容を検索可能。' },
                        features2: { title: 'AI自動分類', description: 'LLMを使用して、エントリを自動的にタグ付けし整理。' },
                        features3: { title: '音声入力', description: '音声メモをシームレスに構造化されたテキストデータに変換。' },
                        features4: { title: 'プライバシー重視', description: '個人の思考を安全に保護するセキュアなストレージ。' },
                    },
                    whyThisProject: '「情報のオーバーロード」という問題を解決し、個人のデータが実際に役立ち、検索可能になるツールを作りたいと考えました。',
                    howItWorks: {
                        title: '仕組み',
                        step1: { title: 'キャプチャ', description: 'テキスト、画像、または音声メモをアプリに入力。' },
                        step2: { title: 'プロセス', description: 'AIが文脈を分析し、主要なテーマを抽出。' },
                        step3: { title: 'リトリーブ', description: '自分の「記憶」に質問すると、即座に回答が返ってきます。' },
                    },
                    howIBuiltIt: {
                        title: 'このプロジェクトの構築方法',
                        frameworks: {
                            framework1: { name: 'React + Vite', description: '高性能でリアクティブなユーザーインターフェースに使用。' }
                        },
                        styles: {
                            style1: { name: 'Tailwind CSS v4', description: 'モダンで迅速なUI開発のために採用。' }
                        },
                        api: {
                            api1: { name: 'Browser File API', description: '100%のプライバシー保護のため、データをローカルで処理。' },
                            api2: { name: 'なし', description: 'データセキュリティを確保するため、外部API呼び出しはゼロ。' }
                        },
                    }
                }
            },
        },
    },
};
export default translations