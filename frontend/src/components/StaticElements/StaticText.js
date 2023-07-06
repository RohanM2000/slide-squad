import './StaticText.css';
export default function StaticText ({fontsize,color='black', bold, startLeft=0, startTop=0, text, windowHeight, windowWidth}) {
    fontsize ||= 16/windowWidth;
    console.log(text);
    return (
        <div className='input-container'>
        <p
            // contentEditable='true'
            className='input-text-static'
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