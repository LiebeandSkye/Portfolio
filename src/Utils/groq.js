export const getChatEndpoint = (
    metaEnv = import.meta.env,
    env = import.meta.env
) => {
    const apiUrl = env?.VITE_CHAT_API_URL?.replace(/\/$/, '');
    return apiUrl ? `${apiUrl}/api/chat` : '/api/chat';
};

export const getGroqResponse = async (userInput, chatHistory, projectContext = null, options = {}) => {
    try {
        const response = await fetch(getChatEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userInput,
                chatHistory,
                projectContext,
                mode: options.mode,
                model: options.model,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.content;

    } catch (error) {
        console.error("Frontend Error:", error);
        return "Sorry gng, either my rate limits are exceeded or theres just something wrong. Try switching models or try again later in the next 5 hours.";
    }
};
