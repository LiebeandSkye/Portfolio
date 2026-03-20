import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../ui/Toast';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info', duration = 4200) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type, duration }]);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}

            <div className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence mode="popLayout" initial={false}>
                    {notifications.map((notif) => (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            layout
                            className="pointer-events-auto"
                        >
                            <Toast
                                message={notif.message}
                                type={notif.type}
                                duration={notif.duration}
                                onClose={() => removeNotification(notif.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used inside NotificationProvider');
    return context;
};