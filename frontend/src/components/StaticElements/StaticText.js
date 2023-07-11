import './StaticText.css';
export default function StaticText ({fontsize,color='black', bold, startLeft=0, startTop=0, text, windowHeight, windowWidth, presentationSize}) {
    fontsize ||= 16/windowWidth;
   
    return (
        <div className='input-container'>
        <p
            // contentEditable='true'
            className='input-text-static'
            value={text}
            style={{position: "absolute", top: (startTop*windowHeight*presentationSize) + "px", left: (startLeft*windowWidth*presentationSize) + "px",
            fontWeight: bold ? '700' : 'normal',
            color: color,
            fontSize: (fontsize*windowWidth*presentationSize) + "px"
            }}
        >
            {text}
        </p>
        </div>
    );
};