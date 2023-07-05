export default function SlideRectangle ({startLeft, id, startTop, startWidth, startHeight, setPresentationState}) {
    return (
        <div
            style={{position: "absolute", 
                    display: "flex",
                    "justify-content": "flex-end",
                    "align-items": "flex-end",
                    "background-color": "gray",
                    top: (startTop) + "px", 
                    left: (startLeft) + "px", 
                    width: (startWidth) + "px",
                    height: (startHeight) + "px"}}
        >
        </div>
    );
};