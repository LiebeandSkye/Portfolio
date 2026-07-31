import { useState, useEffect } from "react";

const TypingText = ({ text, speed = 15, onDone, onUpdate }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;

        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            onUpdate && onUpdate();

            i++;
            if (i >= text.length) {
                clearInterval(interval);
                onDone && onDone();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onDone, onUpdate]);

    return <>{displayed}<span className="animate-pulse">|</span></>;
};

export default TypingText;