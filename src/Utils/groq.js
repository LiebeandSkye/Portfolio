export const getChatEndpoint = (
    env = import.meta.env
) => {
    const apiUrl = env?.VITE_CHAT_API_URL?.replace(/\/$/, '');
    return apiUrl ? `${apiUrl}/api/chat` : '/api/chat';
};

export const getGroqResponse = async (userInput, chatHistory, projectContext = null, options = {}) => {
    const wantsStream = typeof options.onChunk === 'function';

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
                stream: wantsStream,
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

        const contentType = response.headers.get('content-type') || '';
        if (wantsStream && contentType.includes('text/event-stream') && response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let accumulated = '';
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith('data:')) continue;
                    const dataStr = trimmed.slice(5).trim();
                    if (dataStr === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(dataStr);
                        if (parsed.delta) {
                            accumulated += parsed.delta;
                            options.onChunk(accumulated, parsed.delta);
                        }
                    } catch {
                        // Ignore malformed partial line
                    }
                }
            }

            if (accumulated) {
                return accumulated;
            }
        }

        const data = await response.json();
        if (wantsStream && data.content) {
            options.onChunk(data.content, data.content);
        }
        return data.content;

    } catch (error) {
        console.error("Frontend Error:", error);
        if (error.status) throw error;
        throw {
            status: 500,
            message: "Failed to connect to SakuPilot.",
            details: error.message,
            code: 'FETCH_ERROR'
        };
    }
};
