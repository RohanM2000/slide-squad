import { useState, useRef } from "react";

export default function SlideText ({startLeft, startTop, text}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const prevPos = useRef({
        top: 0,
        left: 0
    });
    const isClicked = useRef(false);
    const assignedLocation = useRef(false);

    const handleMouseDown = (e) => {
        e.preventDefault();
        isClicked.current = true;
        if (!assignedLocation.current) {
            prevPos.current.top = e.clientY;
            prevPos.current.left = e.clientX;
        }
        assignedLocation.current = true;
    };

    const handleMouseUp = (e) => {
        isClicked.current = false;
    };

    const handleMouseLeave = (e) => {
        isClicked.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isClicked.current) return;
        setTop(e.clientY - prevPos.current.top);
        setLeft(e.clientX - prevPos.current.left);
    };

    return (
        <p 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{position: "absolute", top: (startTop + top) + "px", left: (startLeft + left) + "px"}}
        >
            {text}
        </p>
    );
};