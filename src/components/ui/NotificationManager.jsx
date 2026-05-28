import React, { useState } from "react";
import Toast from "./Toast";

const NotificationManager = () => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            {notifications.map((n) => (
                <div key={n.id} className="pointer-events-auto">
                    <Toast
                        message={n.message}
                        type={n.type}
                        onClose={() => removeNotification(n.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default NotificationManager;
