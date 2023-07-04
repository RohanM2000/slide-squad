import { useState, useRef } from "react";
import './SlideText.css';
export default function SlideText ({fontsize,color,setOnFocus, bold, startLeft, id, startTop, text, setPresentationState}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [selected,setSelected] = useState(false);
    const [currentText,setCurrentText] = useState(text);
    const [textStyles,setTextStyles] = useState({
        bold: '700'
    });
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
        setSelected(true);
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
                ...state[id],
                text: e.target.innerText,
                startTop: startTop + tempTop,
                startLeft: startLeft + tempLeft,
                id: id,
                type: "text"
            }}
        })
    };

    const handleOnFocus = () => {
        //we'll update a prop passed down 
        // to let the presentationcompose know this
        // is the text to change??
        setOnFocus(id);
        console.log('focused',id)
    }
   
    const handleMouseLeave = (e) => {
        isClicked.current = false;
        setPresentationState(state=>{
            const tempLeft = left;
            const tempTop = top;
            setTop(0);
            setLeft(0);
           return {...state,
            [id]: {
                ...state[id],
                text: e.target.innerText,
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
        <div className='input-container'>
        <p
            contentEditable='true'
            className='input-text'
            value={currentText}
            onChange={event=>setCurrentText(event.currentTarget.value)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onFocus={handleOnFocus}
            style={{position: "absolute", top: (startTop + top) + "px", left: (startLeft + left) + "px",
            fontWeight: bold ? '700' : 'normal',
            color: color,
            fontSize: fontsize
            }}
        >
            
        </p>
        </div>
    );
};