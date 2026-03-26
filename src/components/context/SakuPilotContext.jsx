import React, { createContext, useContext, useState, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// SakuPilotContext
//First u need to
// Wrap your app with <SakuPilotProvider> once (in App.jsx or main.jsx).
// Then any component anywhere can call:
//
//   const { openChat } = useSakuPilot();
//   <button onClick={openChat}>Ask SakuPilot</button>
//
// No prop drilling needed — PortfolioHeader, Drawer, Search all just call
// openChat() and the single SakuPilot instance in the provider opens.
// ─────────────────────────────────────────────────────────────────────────────

import SakuPilot from '../SakuPilot/SakuPilot.jsx'; // adjust path if needed

const SakuPilotContext = createContext(null);

export const useSakuPilot = () => {
    const ctx = useContext(SakuPilotContext);
    if (!ctx) throw new Error('useSakuPilot must be used inside <SakuPilotProvider>');
    return ctx;
};

export const SakuPilotProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openChat  = useCallback(() => setIsOpen(true),  []);
    const closeChat = useCallback(() => setIsOpen(false), []);

    return (
        <SakuPilotContext.Provider value={{ openChat, closeChat, isOpen }}>
            {children}
            <SakuPilot isOpen={isOpen} onClose={closeChat} />
        </SakuPilotContext.Provider>
    );
};