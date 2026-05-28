import React, { forwardRef, useCallback, useLayoutEffect, useRef } from 'react';

const AutoResizeTextarea = forwardRef(function AutoResizeTextarea(
    { minRows = 1, maxRows = 8, value, onChange, style, ...props },
    forwardedRef
) {
    const localRef = useRef(null);

    const setRefs = useCallback((node) => {
        localRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
    }, [forwardedRef]);

    const resize = useCallback(() => {
        const node = localRef.current;
        if (!node) return;

        const computed = window.getComputedStyle(node);
        const lineHeight = parseFloat(computed.lineHeight) || 20;
        const borderY = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
        const paddingY = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
        const minHeight = lineHeight * minRows + paddingY + borderY;
        const maxHeight = lineHeight * maxRows + paddingY + borderY;

        node.style.height = 'auto';
        node.style.height = `${Math.min(Math.max(node.scrollHeight, minHeight), maxHeight)}px`;
        node.style.overflowY = node.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }, [maxRows, minRows]);

    useLayoutEffect(() => {
        resize();
    }, [resize, value]);

    const handleChange = (event) => {
        onChange?.(event);
        requestAnimationFrame(resize);
    };

    return (
        <textarea
            {...props}
            ref={setRefs}
            value={value}
            onChange={handleChange}
            rows={minRows}
            style={{ ...style, resize: 'none' }}
        />
    );
});

export default AutoResizeTextarea;
