import { useState, useRef } from "react";

export default function SlideText ({startLeft, id, startTop, text, setPresentationState}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [currentText,setCurrentText] = useState(text);
    const prevPos = useRef({
        top: 0,
        left: 0
    });
    const isClicked = useRef(false);
    // const assignedLocation = useRef(false);

    const handleMouseDown = (e) => {
        // e.preventDefault();
        isClicked.current = true;
        prevPos.current.top = e.clientY;
        prevPos.current.left = e.clientX;
        // if (!assignedLocation.current) {
        // }
        // assignedLocation.current = true;
    };

    const handleMouseUp = (e) => {
        isClicked.current = false;
        setPresentationState(state=>{
            const tempLeft = left;
            const tempTop = top;
            setTop(0);
            setLeft(0);
           return {...state,
            [id]: {
                text: currentText,
                startTop: startTop + tempTop,
                startLeft: startLeft + tempLeft,
                id: id,
                type: "text"
            }}
        })
    };

    const handleMouseLeave = (e) => {
        isClicked.current = false;
        setPresentationState(state=>{
            const tempLeft = left;
            const tempTop = top;
            setTop(0);
            setLeft(0);
           return {...state,
            [id]: {
                text: currentText,
                startTop: startTop + tempTop,
                startLeft: startLeft + tempLeft,
                id: id,
                type: "text"
            }}
        })

    };

    const handleMouseMove = (e) => {
        if (!isClicked.current) return;
        setTop(e.clientY - prevPos.current.top);
        setLeft(e.clientX - prevPos.current.left);
    };

    return (
        <input
            value={currentText}
            onChange={event=>setCurrentText(event.currentTarget.value)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{position: "absolute", top: (startTop + top) + "px", left: (startLeft + left) + "px"}}
        >
            
        </input>
    );
};