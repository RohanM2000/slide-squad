import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../Presentations/PresentationCompose.css";
import StaticRectangle from '../StaticElements/StaticRectangle';
import StaticText from '../StaticElements/StaticText';
export default function StaticPresentation () {
  const dispatch = useDispatch();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(()=>{
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return ()=> window.removeEventListener("resize",handleResize);
  },[]);
  // const author = useSelector(state => state.session.user);
  // const newPresentation = useSelector(state => state.presentations.new);
  // const errors = useSelector(state => state.errors.presentations);
  const [presentationState, setPresentationState] =useState({
    1:{id:1, startLeft:0/windowWidth,startTop:0/windowHeight, text:'TYPE HERE', type: "text",bold:false,color:'black',fontsize: 16/windowWidth},
    2:{id:2, startLeft:100/windowWidth,startTop:200/windowHeight, startWidth:200/windowWidth, startHeight:200/windowHeight, type:"rectangle"}
  });
  const [slideNumber,setSlideNumber] = useState(1);
  // when the arrow is pressed, the next slide will be displayed
  // need to work out presentation preview or show presentaiton data

  

  // need to append child to div, that way when we submit, we can pass the children 
  // and parse the data into the backend
  // when user presses another page, add to the presentationState??
  
  // useEffect(() => {
  //   return () => dispatch(clearPresentationErrors());
  // }, [dispatch]);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   dispatch(composePresentation({ text })); 
  //   setText('');
  // };

  // slidetext: click and drag, when placed within the presentation canvas (top > canvas top, bottom < canvas bottom, right < canvas right, left > canvas left)
  // spawn it into the center
  // when SlideText is out of the slidetext container, render a new one
  // when dragged into canvas, append to the canvas, then onChange, we can iterate through the canvas's children to record changes to presentation state? 
  // check children right, left, top, bottom, type, width, height, (rotation??)

  return (
    <>
      {/* <form className="compose-presentation" onSubmit={handleSubmit}> */}
      {/* decide how the input will be taken */}
      <div className='present-compose-container'>
        {/* canvas frame to house the canvas and display possible overflows */}
        <div className='canvas-frame'>
          <div className='presentation-canvas' >
              {Object.values(presentationState).map((obj)=>{
                if (obj.type === "text") return <StaticText 
                                                fontsize={obj.fontsize} 
                                                color={obj.color} 
                                                bold={obj.bold} 
                                                setPresentationState={setPresentationState} 
                                                id={obj.id} 
                                                text={obj.text} 
                                                startLeft={obj.startLeft} 
                                                startTop={obj.startTop} 
                                                windowHeight={windowHeight}
                                                windowWidth={windowWidth}
                                                />
                if (obj.type === "rectangle") return <StaticRectangle 
                                                setPresentationState={setPresentationState} 
                                                id={obj.id} 
                                                startHeight={obj.startHeight} 
                                                startWidth={obj.startWidth} 
                                                startLeft={obj.startLeft} 
                                                startTop={obj.startTop} 
                                                windowHeight={windowHeight}
                                                windowWidth={windowWidth}
                                                />
              })}
          </div>
        </div>
          {/* <input 
            type="textarea"
            value={text}
            onChange={update}
            placeholder="Write your tweet..."
            required
          />
          <div className="errors">{errors?.text}</div>
          <input type="submit" value="Submit" />
        </form>
        <div className="presentation-preview">
          <h3>Presentation Preview</h3>
          {text ? <PresentationBox presentation={{text, author}} /> : undefined}
        </div>
        <div className="previous-presentation">
          <h3>Previous Presentation</h3>
          {newPresentation ? <PresentationBox presentation={newPresentation} /> : undefined}
        </div> */}
      </div>
    </>
  )
};