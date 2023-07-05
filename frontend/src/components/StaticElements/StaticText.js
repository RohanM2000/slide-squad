import '../SlideElements/SlideText.css';
export default function StaticText ({fontsize,color,setOnFocus, bold, startLeft, id, startTop, text, setPresentationState, windowHeight, windowWidth}) {
    return (
        <div className='input-container'>
        <p
            // contentEditable='true'
            className='input-text'
            value={text}
            style={{position: "absolute", top: (startTop*windowHeight) + "px", left: (startLeft*windowWidth) + "px",
            fontWeight: bold ? '700' : 'normal',
            color: color,
            fontSize: (fontsize*windowWidth) + "px"
            }}
        >
            {text}
        </p>
        </div>
    );
};