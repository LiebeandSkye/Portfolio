import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
    console.error("Critical: VITE_GROQ_API_KEY is not defined. Check Vercel Settings bro plsss");
}

const groq = new Groq({
    apiKey: apiKey || "dummy_key_to_prevent_crash",
    dangerouslyAllowBrowser: true
});

export const getGroqResponse = async (userInput, chatHistory, projectContext = null) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userInput,
                chatHistory,
                projectContext
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.content;

    } catch (error) {
        console.error("Frontend Error:", error);
        return "Sorry, my brain just glitched for a second 😅\n\nTry asking again!";
    }
};