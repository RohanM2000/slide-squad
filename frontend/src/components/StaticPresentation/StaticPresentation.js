import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPresentation } from '../../store/presentations';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import { clearPresentationErrors, composePresentation } from '../../store/presentations';
import '../Presentations/PresentationCompose.css';
import StaticText from '../StaticElements/StaticText';
import StaticRectangle from '../StaticElements/StaticRectangle';
import PresentationFooter from './StaticPresentationFooter';
// import './Static.css'

function StaticPresentation ({presentation}) {
  const dispatch = useDispatch();
  const presentationId = presentation._id
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(()=>{
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    dispatch(fetchPresentation(presentationId));
    return ()=> window.removeEventListener("resize",handleResize);
  },[]);

  const presentationState = useSelector(state=>state.presentations[presentationId]?.slides);
  
  const [slideNumber,setSlideNumber] = useState(1);
  function handleSlideChange (e){
    if (e.key ==='ArrowLeft'){
      setSlideNumber(state=>{
        if(state===1){
          return state;
        } else {
          return state-1;
        }
      })
    }
    if(e.key==='ArrowRight'){
      setSlideNumber(state=>{
        if(state===Object.values(presentationState).length){
          return state;
        } else{
          return state+1;
        }
      })
    }

  }
  useEffect(()=>{
    document.addEventListener('keydown',handleSlideChange);
    return ()=>document.removeEventListener('keydown',handleSlideChange);
  },[presentationState])
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
  // console.log(presentationState[slideNumber]);
  // let intObjects = Object.values(presentationState[slideNumber]);
  // console.log(presentationState);
  return presentationState ? (
    <>
      {/* <form className="compose-presentation" onSubmit={handleSubmit}> */}
      {/* decide how the input will be taken */}
      <div className='presentation-show-container'>
        <b>Title:</b>
        <h3> {presentation.title}</h3>
        <div className='compose-container'>
          {/* canvas frame to house the canvas and display possible overflows */}
          <div className='canvas-frame'>
            <div className='presentation-canvas' >
                {presentationState[slideNumber]&& Object.values(presentationState[slideNumber]).map((obj)=>{
                  if (obj.type === "text") return <StaticText 
                                                  key={`${slideNumber}-${obj.id}`}
                                                  slideNumber={slideNumber}
                                                  fontsize={obj.fontsize} 
                                                  color={obj.color} 
                                                  bold={obj.bold} 
                                                  id={obj.id} 
                                                  text={obj.text} 
                                                  startLeft={obj.startLeft} 
                                                  startTop={obj.startTop} 
                                                  windowHeight={windowHeight}
                                                  windowWidth={windowWidth}
                                                  />
                  if (obj.type === "rectangle") return <StaticRectangle 
                                                  key={`${slideNumber}-${obj.id}`}
                                                  slideNumber={slideNumber}
                                                  id={obj.id} 
                                                  startHeight={obj.startHeight} 
                                                  startWidth={obj.startWidth} 
                                                  startLeft={obj.startLeft} 
                                                  startTop={obj.startTop} 
                                                  windowHeight={windowHeight}
                                                  windowWidth={windowWidth}
                                                  bg={obj.bg}
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
          <PresentationFooter />
      </div>
    </>
  ) : null;
}

export default StaticPresentation;