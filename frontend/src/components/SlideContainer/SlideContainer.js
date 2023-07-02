// import { useState, useRef } from "react";
import SlideText from "../SlideElements/SlideText";

export default function SlideContainer () {
    // const [textInput, setTextInput] = useState("");
    // const textElements = useRef(  
    //     [
    //         {
    //         startTop: 0,
    //         startLeft: 0,
    //         text: "HELLO TESTING"
    //         },
    //         {
    //             startTop: 100,
    //             startLeft: 200,
    //             text: "HELLO TESTING #2"
    //         },
    //     ]
    // );

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     textElements.current.push({
    //         startTop: 0,
    //         startLeft: 0,
    //         text: textInput
    //     });
    //     setTextInput("");
    // };

    return (
        <div className="testing-div" width={100} height={100} overflow="none">
            <SlideText startTop={0} startLeft={100} text="HELLO#1" />
            <SlideText startTop={100} startLeft={0} text="HELLO#2" />
            <SlideText startTop={100} startLeft={100} text="HELLO#3" />
            <SlideText startTop={0} startLeft={0} text="HELLO#4" />
        </div>
    )
};