export default function StaticRectangle ({startLeft, id, startTop, startWidth, startHeight, setPresentationState, windowHeight, windowWidth}) {
    return (
        <div
            style={{position: "absolute", 
                    display: "flex",
                    "justify-content": "flex-end",
                    "align-items": "flex-end",
                    "background-color": "gray",
                    top: (startTop*windowHeight) + "px", 
                    left: (startLeft*windowWidth) + "px", 
                    width: (startWidth*windowWidth) + "px",
                    height: (startHeight*windowHeight) + "px"}}
        >
        </div>
    );
};