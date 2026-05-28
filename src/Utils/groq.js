export const getChatEndpoint = (
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
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: errorData.error || 'Network response was not ok',
                details: errorData.details,
                code: errorData.code,
                retryAfter: errorData.retryAfter
            };
        }

        const data = await response.json();
        return data.content;

    } catch (error) {
        console.error("Frontend Error:", error);
        // If it's already a structured error from above, re-throw it
        if (error.status) throw error;
        // Otherwise wrap it
        throw {
            status: 500,
            message: "Failed to connect to SakuPilot.",
            details: error.message,
            code: 'FETCH_ERROR'
        };
    }
};
