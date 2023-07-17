import { useState, useRef } from "react";

export default function SlideRectangle ({rotate,slideNumber, startLeft, id, startTop, startWidth, startHeight, setPresentationState, windowHeight, windowWidth, setOnFocus, bg}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const prevPos = useRef({
        top: 0,
        left: 0
    });
    const isClicked = useRef(false);
    const isResizeClicked = useRef(false);
    // const assignedLocation = useRef(false);
    const handleMouseDown = (e) => {
        e.preventDefault();
        // e.stopPropogation();
        isClicked.current = true;
        prevPos.current.top = e.clientY;
        prevPos.current.left = e.clientX;
    };

    const handleResizeMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizeClicked.current = true;
        prevPos.current.top = e.clientY;
        prevPos.current.left = e.clientX;
    };

    const handleClick = () => {
        //we'll update a prop passed down 
        // to let the presentationcompose know this
        // is the text to change??
        setOnFocus(id);
        // console.log('focused',id)
    }
    const handleMouseUp = (e) => {
        isClicked.current = false;
        isResizeClicked.current = false;
        setPresentationState(state=>{
            const tempLeft = left;
            const tempTop = top;
            const tempHeight = height;
            const tempWidth = width;
            setTop(0);
            setLeft(0);
            setHeight(0);
            setWidth(0);
            return {...state,
                [slideNumber]:
                {
                ...state[slideNumber],
                [id]:{
                    ...state[slideNumber][id],
                    startTop: startTop + tempTop/windowHeight,
                    startLeft: startLeft + tempLeft/windowWidth,
                    bg: bg,
                    id: id,
                    startHeight: startHeight + tempHeight/windowHeight,
                    startWidth: startWidth + tempWidth/windowWidth,
                    type: "rectangle"
                }
                }}
        })
    };

    const handleMouseLeave = (e) => {
        isClicked.current = false;
        isResizeClicked.current = false;
        setPresentationState(state=>{
            const tempLeft = left;
            const tempTop = top;
            const tempHeight = height;
            const tempWidth = width;
            setTop(0);
            setLeft(0);
            setHeight(0);
            setWidth(0);
            return {...state,
                [slideNumber]:
                {
                ...state[slideNumber],
                [id]:{
                    ...state[slideNumber][id],
                    startTop: startTop + tempTop/windowHeight,
                    startLeft: startLeft + tempLeft/windowWidth,
                    bg: bg,
                    id: id,
                    startHeight: startHeight + tempHeight/windowHeight,
                    startWidth: startWidth + tempWidth/windowWidth,
                    type: "rectangle"
                }
                }}
        })
    };

    const handleMouseMove = (e) => {
        if (isClicked.current) {
            setTop(e.clientY - prevPos.current.top);
            setLeft(e.clientX - prevPos.current.left);
        }
        if (isResizeClicked.current) {
            setHeight(e.clientY - prevPos.current.top);
            setWidth(e.clientX - prevPos.current.left);
        }
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            style={{
                    rotate: (rotate)+'deg',
                    position: "absolute", 
                    display: "flex",
                    "justify-content": "flex-end",
                    "align-items": "flex-end",
                    backgroundColor : bg,
                    top: (startTop*windowHeight + top) + "px", 
                    left: (startLeft*windowWidth + left) + "px", 
                    width: (startWidth*windowWidth + width) + "px",
                    height: (startHeight*windowHeight + height) + "px"}}
        >
            <div className="resize-area" style={{
                "background-color": "black",
                display: "block",
                height: "10px",
                width: "10px"
                }}
                onMouseDown={handleResizeMouseDown}
            >
            </div>
        </div>
    );
};