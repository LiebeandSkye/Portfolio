import React, { createContext, useState, useContext } from 'react';
import languages from '../../../Data/Language';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState(languages[0]); // default English

    // Simple translation dictionary – easily extendable
    const translations = {
        en: {
            name: 'Kry Rithisak',
            job: 'Developer',
            description: 'Frontend developer with a deep passion for computer science. Currently working on some cool web.',
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
            randomizeBtn: 'Randomize',
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

            randomizeBtn: 'ランダム',

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
            }
        },
        // Add more languages as needed
    };

    const t = (key) => translations[currentLang.code]?.[key] || translations.en[key];

    const changeLanguage = (langCode) => {
        const lang = languages.find((l) => l.code === langCode) || languages[0];
        setCurrentLang(lang);
    };

    return (
        <LanguageContext.Provider value={{ currentLang, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;