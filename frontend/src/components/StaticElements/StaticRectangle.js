export default function StaticRectangle ({startLeft, id, startTop, startWidth, startHeight, windowHeight, windowWidth, bg, presentationSize}) {
    return (
        <div
            style={{position: "absolute", 
                    display: "flex",
                    "justify-content": "flex-end",
                    "align-items": "flex-end",
                    backgroundColor: bg,
                    top: (startTop*windowHeight*presentationSize) + "px", 
                    left: (startLeft*windowWidth*presentationSize) + "px", 
                    width: (startWidth*windowWidth*presentationSize) + "px",
                    height: (startHeight*windowHeight*presentationSize) + "px"}}
        >
        </div>
    );
};