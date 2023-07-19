import { useState, useRef,useEffect } from "react";
import myDebounce from "../Presentations/MyDebounce";
import './SlideText.css';
export default function SlideText ({rotate,slideNumber,fontsize,color,setOnFocus, bold, startLeft, id, startTop, text, setPresentationState, windowHeight, windowWidth, dragFunctions, dragTarget}) {
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [selected,setSelected] = useState(false);
    const preText = useRef(text);
    const typedYet = useRef(false);
    const prevPos = useRef({
        top: 0,
        left: 0
    });
    const isClicked = useRef(false);
    const textArea = useRef();
    // const assignedLocation = useRef(false);
    const handleMouseDown = (e) => {
        // e.preventDefault();
        isClicked.current = true;
        dragTarget.current = id;
        prevPos.current.top = e.clientY;
        prevPos.current.left = e.clientX;
        setSelected(true);
        // if (!assignedLocation.current) {
        // }
        // assignedLocation.current = true;
    };
    const reassignState = function () {
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
                        text: preText.current,
                        startTop: startTop + tempTop/windowHeight,
                        startLeft: startLeft + tempLeft/windowWidth
                    }}
                }
            }) 
    }
    // const handleKeyDown = (e)=> {
    //     // e.preventDefault();
    //     console.log("state save");
    //     // if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    //     //     reassignState();
    //     //     console.log("getting here")
    //     // }
    // }
    // useEffect(()=>{
    //     document.addEventListener("keydown", handleKeyDown);
    //     return ()=> document.removeEventListener("keydown", handleKeyDown);
    // })
    const handleMouseUp = (e) => {
        e.preventDefault();
        isClicked.current = false;
        // handleRefInput(true);     
        reassignState();
    };

    const handleOnFocus = (e) => {
        e.preventDefault();
        //we'll update a prop passed down 
        // to let the presentationcompose know this
        // is the text to change??
        setOnFocus(id);
    }
    const handleMouseLeave = (e) => {
        isClicked.current = false;
        // handleRefInput(true);
        reassignState();
    };

    const handleMouseMove = (e) => {

        e.preventDefault();
        if (isClicked.current || dragTarget.current === id) {
            setTop(e.clientY - prevPos.current.top);
            setLeft(e.clientX - prevPos.current.left);
        }
    };
    useEffect(()=>{
        if (!dragFunctions.current[slideNumber]) {
            dragFunctions.current[slideNumber] = {};
        }
        dragFunctions.current[slideNumber][id] = {move: handleMouseMove, leave: handleMouseLeave};
    })
    const populateText = ()=> {
        textArea.current.innerText = text;
    }
    useEffect(()=>{
        populateText();
    },[]);
    return (
        <div className='input-container'>
        <p
            suppressContentEditableWarning='true'
            contentEditable='true'
            className='input-text'
            value={preText.current}
            ref={textArea}
            // onInput={handleDebounceInput}
            onInput={(e)=> {
                // typedYet.current = true;
                preText.current=e.target.innerText;
                // handleRefInput();
                reassignState();
                // console.log(preText.current);
                // console.log(text);
            }
            }
            // onChange={(e)=>{
            //     preText.current=e.target.innerHTML;
            //     console.log("Change received");
            // }}      
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onFocus={handleOnFocus}
            style={{rotate: (rotate)+'deg', position: "absolute", top: (startTop*windowHeight + top) + "px", left: (startLeft*windowWidth + left) + "px",
            fontWeight: bold ? '700' : 'normal',
            color: color,
            fontSize: (fontsize*windowWidth) + "px"
            }}
        >
        {/* {!typedYet.current && preText.current} */}
        </p>
        </div>
    );
};