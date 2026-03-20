import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 5, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // If the full text is already reached, stop
        if (index >= text.length) {
            if (onComplete) onComplete();
            return;
        }

        // Determine how many characters to add per "tick" for speed
        // Higher speed = more characters at once
        const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            setIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
    }, [index, text, speed, onComplete]);

    return <>{displayedText}</>;
};

export default Typewriter;