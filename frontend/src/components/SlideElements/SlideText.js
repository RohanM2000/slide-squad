import { useState, useRef,useEffect } from "react";
import myDebounce from "../Presentations/MyDebounce";
import './SlideText.css';
export default function SlideText ({slideNumber,fontsize,color,setOnFocus, bold, startLeft, id, startTop, text, setPresentationState, windowHeight, windowWidth}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [selected,setSelected] = useState(false);
    const preText = useRef(text);
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
    const reassignState = function () {
        setPresentationState(state=>{
            return {...state,
                [slideNumber]:{
                    ...state[slideNumber],
                    [id]: {
                        ...state[slideNumber][id],
                        text: preText.current,
                    }}
                }
            }) 
    }
    const handleMouseUp = (e) => {
        isClicked.current = false;
            setPresentationState(state=>{
                const tempLeft = left;
                const tempTop = top;
                setTop(0);
                setLeft(0);
                return {...state,
                    [slideNumber]:{
                        ...state[slideNumber],
                        [id]: {
                            ...state[slideNumber][id],
                            text: e.target.innerText,
                            startTop: startTop + tempTop/windowHeight,
                            startLeft: startLeft + tempLeft/windowWidth,
                            id: id,
                            type: "text"
                        }}
                    }
                })
            
    };

    const handleOnFocus = () => {
        //we'll update a prop passed down 
        // to let the presentationcompose know this
        // is the text to change??
        setOnFocus(id);
    }
    const handleInput = (e)=>{
        setPresentationState(state=>{
            const tempLeft = left;
            const tempTop = top;
            setTop(0);
            setLeft(0);
            let obj = JSON.parse(JSON.stringify(state));
            let ele = obj[slideNumber][id];
            return {...state,
                [slideNumber]:{
                    ...state[slideNumber],
                    [id]: {
                        ...state[slideNumber][id],
                        text: e.target.innerText,
                        startTop: startTop + tempTop/windowHeight,
                        startLeft: startLeft + tempLeft/windowWidth,
                        id: id,
                        type: "text"
                    }}
            }
        })
    }
    const handleMouseLeave = (e) => {
        isClicked.current = false;
        
        setPresentationState(state=>{
            const tempLeft = left;
            const tempTop = top;
            setTop(0);
            setLeft(0);
            return {...state,
                [slideNumber]:{
                    ...state[slideNumber],
                    [id]: {
                        ...state[slideNumber][id],
                        text: e.target.innerText,
                        startTop: startTop + tempTop/windowHeight,
                        startLeft: startLeft + tempLeft/windowWidth,
                        id: id,
                        type: "text"
                    }}
                }
            })
        

    };

    const handleMouseMove = (e) => {
        if (!isClicked.current) return;
        setTop(e.clientY - prevPos.current.top);
        setLeft(e.clientX - prevPos.current.left);
    };
    let stack = 0;

    const handleRefInput = function() {
        stack +=1
        setTimeout(()=>{
            stack -=1;
            if (stack === 0) {
                reassignState();
            }
        }, 700);
    }
    return (
        <div className='input-container'>
        <p

            contentEditable='true'
            className='input-text'
            value={text}
            // onInput={handleDebounceInput}
            onInput={(e)=> {
                preText.current=e.target.innerHTML;
                handleRefInput();
            }
            }
            // onChange={(e)=>{
            //     preText.current=e.target.innerHTML;
            //     console.log("Change received");
            // }}      
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onFocus={handleOnFocus}
            style={{position: "absolute", top: (startTop*windowHeight + top) + "px", left: (startLeft*windowWidth + left) + "px",
            fontWeight: bold ? '700' : 'normal',
            color: color,
            fontSize: (fontsize*windowWidth) + "px"
            }}
        >
        {preText.current}
        </p>
        </div>
    );
};