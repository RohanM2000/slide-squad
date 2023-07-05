export default function StaticRectangle ({startLeft, id, startTop, startWidth, startHeight, setPresentationState, windowHeight, windowWidth, bg}) {
    return (
        <div
            style={{position: "absolute", 
                    display: "flex",
                    "justify-content": "flex-end",
                    "align-items": "flex-end",
                    backgroundColor: bg,
                    top: (startTop*windowHeight) + "px", 
                    left: (startLeft*windowWidth) + "px", 
                    width: (startWidth*windowWidth) + "px",
                    height: (startHeight*windowHeight) + "px"}}
        >
        </div>
    );
};