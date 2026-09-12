import { useState, useEffect, useRef } from "react";

const TypingText = ({ text, speed = 15, onDone, onUpdate }) => {
    const [displayed, setDisplayed] = useState("");
    const onDoneRef = useRef(onDone);
    const onUpdateRef = useRef(onUpdate);

    useEffect(() => { onDoneRef.current = onDone; }, [onDone]);
    useEffect(() => { onUpdateRef.current = onUpdate; }, [onUpdate]);

    useEffect(() => {
        setDisplayed("");
        let i = 0;

        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            onUpdateRef.current?.();

            i++;
            if (i >= text.length) {
                clearInterval(interval);
                onDoneRef.current?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <>{displayed}<span className="animate-pulse">|</span></>;
};

export default TypingText;