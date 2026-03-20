import React, { createContext, useState, useContext } from 'react';
import languages from '../../../Data/Language';
import Projects from '../../../Data/Projects';
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    // Check local storage for saved language or default to English
    const [currentLang, setCurrentLang] = useState(() => {
        const saved = localStorage.getItem('app_lang');
        return languages.find(l => l.code === saved) || languages[0];
    });

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
            bot: {
                whatIsAbout: 'What is this project about?',
                techStack: 'What kind of techStacks do you use?',
                role: 'What role were you when you take this project?',
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
                description: 'I’m on a journey to becoming a full-stack developer, building on my background in computer science and hands-on experience in web and mobile development 💻. I enjoy turning ideas into code and code into solutions, and I’m always trying to learn more about software engineering and architecture 💡. At the end of the day, I’m just a guy working towards a goal, driven by creativity and a love for technology. 🚀🚀',
                techStack: "Technologies I've Worked With:"
            },
            links: {
                welcome: 'Welcome',
                portfolio: 'Portfolio',
                contact: 'Get in Touch',
            },
            quotes: [
                { text: '“Insanity is doing the same thing, over and over again, but expecting different results.”', author: '― Narcotics Anonymous' },
                { text: '“You only live once, but if you do it right, once is enough.”', author: '― Mae West' },
                { text: '“Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.”', author: '― Mark Zuckerberg' },
                { text: '“Talk is cheap. Show me the code.”', author: '― Linus Torvalds' },
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
            // PROJECTSSSSSS
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
                            frameworks: { framework1: { name: 'React.js', description: 'Core library for UI and state.' } },
                            styles: { style1: { name: 'Tailwind CSS', description: 'Utility-first CSS framework.' } },
                            api: { api1: { name: 'Firebase', description: 'Backend as a service for Auth and DB.' } },
                        }
                    }
                }
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
            share: "シェアする :",
            pinned: 'ピン留め',
            bot: {
                whatIsAbout: 'このプロジェクトについては?',
                techStack: '技術スタック',
                role: '役割',
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
                noMatches: '該当する作品は見つかりませんでした。',
                btnDemo: "デモを見る",
                btnCode: "ソースコードを見る",
                statusPublic: '公開中',                
            },
            // PROJECKUUUU
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
                }
            },
        },
    };


    // Translation function with English fallback
    const t = (key) => {
        const keys = key.split('.');
        let result = translations[currentLang.code] || translations.en;

        for (const k of keys) {
            result = result?.[k];
            if (!result) break;
        }

        // Final fallback to English if key path fails in current language
        if (!result) {
            result = translations.en;
            for (const k of keys) {
                result = result?.[k];
                if (!result) break;
            }
        }

        return result || key;
    };

    const changeLanguage = (langCode) => {
        const lang = languages.find((l) => l.code === langCode) || languages[0];
        setCurrentLang(lang);
        localStorage.setItem('app_lang', langCode); // Persist language choice
    };

    return (
        <LanguageContext.Provider value={{ currentLang, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;