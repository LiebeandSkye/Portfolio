import React, { useState, useCallback } from "react";
import Toast from "./Toast";

const NotificationManager = () => {
    const [notifications, setNotifications] = useState([]);

    // Function to add a new notification to the stack
    const addNotification = useCallback((message) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message }]);
    }, []);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="fixed top-4 right-6 z-[100] flex flex-col gap-3">
            {notifications.map((n) => (
                <Toast
                    key={n.id}
                    message={n.message}
                    onClose={() => removeNotification(n.id)}
                    // Pass a prop to handle the "Error" state styling
                    type="error"
                />
            ))}
        </div>
    );
};

export default NotificationManager;