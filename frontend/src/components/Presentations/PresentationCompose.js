import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { clearPresentationErrors, composePresentation } from '../../store/presentations';
import PresentationBox from './PresentationBox';
import './PresentationCompose.css';
import SlideText from '../SlideElements/SlideText';
import SlideRectangle from '../SlideElements/SlideRectangle';
import savePresentation from './presentationSave';
import Swatchy from './ColorSwatches';
import Swatches from './Swatches';
function PresentationCompose () {
  const [onFocus,setOnFocus] = useState(null);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [bold,setBold] = useState(false);
  const [showSwatch,setShowSwatch] = useState({
    reveal:false,
  type:null});
  
  // const author = useSelector(state => state.session.user);
  // const newPresentation = useSelector(state => state.presentations.new);
  // const errors = useSelector(state => state.errors.presentations);
  const [presentationState, setPresentationState] =useState({
    1:{id:1, startLeft:0,startTop:0, text:'', type: "text",bold:false,color:'black',fontsize:'16px'}
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
  console.log(presentationState);
  const nextId = Object.values(presentationState).length+1;
  const addTextElement = (event) =>{
  event.preventDefault();
  setPresentationState(state=>{
    return {...state,[nextId]: {text: 'added text',startLeft:0,startTop:0,id: nextId, type: "text"}}
  })
  } 

  const addRectangleElement = (event) =>{
    event.preventDefault();
    setPresentationState(state=>{
      return {...state,[nextId]: { bg:'grey',startWidth:50,startHeight:50,startLeft:0,startTop:0,id: nextId, type: "rectangle"}}
    })
    } 
 
  const handleSave = ()=>{
    console.log('saved');
    let savedObject={};
    Object.values(presentationState).forEach((ele)=>{
      savedObject[ele.id] = ele;
    })
    // console.log(savedObject);
    savePresentation(savedObject, dispatch);
  }
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

        <div className='selection'>
          <button onClick={event=>addTextElement(event)}>
            add a text element
          </button>
          <button onClick={event=>addRectangleElement(event)}>
            add a rectangle element
          </button>
          <button onClick={()=>setPresentationState(
            {...presentationState,[onFocus]:{...presentationState[onFocus],bold: !presentationState[onFocus].bold}}
          )}>
            Bold
          </button>
          <button onClick={()=>setShowSwatch({reveal:true,type:'text'})}>
            Set Text Color
          </button>
          {showSwatch.reveal && showSwatch.type==='text' && <Swatches type='text' onFocus={onFocus} setPresentation={setPresentationState} setShowSwatch={setShowSwatch}/>}
          <button onClick={()=>setPresentationState(
            {...presentationState,[onFocus]:{...presentationState[onFocus],fontsize: '2.5vw'}}
          )}>
            48px
          </button>
          <button onClick={()=>setShowSwatch({reveal:true,type:'shape'})}>
            Set shape Color
          </button>
          {showSwatch.reveal && showSwatch.type==='shape' && <Swatches type='shape' onFocus={onFocus} setPresentation={setPresentationState} setShowSwatch={setShowSwatch}/>}
        </div>
        {/* canvas frame to house the canvas and display possible overflows */}
        <div className='canvas-frame'>
          <div className='presentation-canvas' >
              {Object.values(presentationState).map((obj)=>{
                if (obj.type === "text") return <SlideText fontsize={obj.fontsize} color={obj.color} bold={obj.bold} setOnFocus={setOnFocus} setPresentationState={setPresentationState} id={obj.id} text={obj.text} startLeft={obj.startLeft} startTop={obj.startTop} />
                if (obj.type === "rectangle") return <SlideRectangle setOnFocus={setOnFocus} bg={obj.bg} setPresentationState={setPresentationState} id={obj.id} startHeight={obj.startHeight} startWidth={obj.startWidth} startLeft={obj.startLeft} startTop={obj.startTop} />
              })}
          </div>
        </div>
        <button className='save-button'onClick={handleSave}>
          save
        </button>
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
}

export default PresentationCompose;