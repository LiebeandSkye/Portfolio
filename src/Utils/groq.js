export const getGroqResponse = async (userInput, chatHistory, projectContext = null) => {
    try {
        const response = await fetch('/backend/api.js', {
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