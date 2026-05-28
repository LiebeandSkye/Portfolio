export const IMMERSIVE_CHAT_STORAGE_KEY = 'sakupilot:immersive-conversations';

export const summarizeConversationTitle = (input) => {
    const normalized = String(input || '').replace(/\s+/g, ' ').trim();
    if (!normalized) return 'New chat';
    return normalized.length > 51 ? `${normalized.slice(0, 48).trim()}...` : normalized;
};

export const createConversation = (seedText = '') => {
    const now = new Date().toISOString();
    return {
        id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title: summarizeConversationTitle(seedText),
        messages: [],
        createdAt: now,
        updatedAt: now,
    };
};

export const renameConversation = (conversation, title) => {
    const now = new Date();
    const previous = Date.parse(conversation.updatedAt);
    const updatedAt = Number.isFinite(previous) && now.getTime() <= previous
        ? new Date(previous + 1).toISOString()
        : now.toISOString();

    return {
        ...conversation,
        title: summarizeConversationTitle(title),
        updatedAt,
    };
};

export const loadConversations = (storage = window.localStorage) => {
    try {
        const raw = storage.getItem(IMMERSIVE_CHAT_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export const saveConversations = (conversations, storage = window.localStorage) => {
    const sanitized = conversations.map((conv) => ({
        ...conv,
        messages: conv.messages.map(({ isNew: _isNew, ...msg }) => msg),
    }));
    storage.setItem(IMMERSIVE_CHAT_STORAGE_KEY, JSON.stringify(sanitized));
};

export const upsertConversation = (conversations, conversation) => {
    const withoutCurrent = conversations.filter((item) => item.id !== conversation.id);
    return [conversation, ...withoutCurrent].slice(0, 30);
};
