import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { clearPresentationErrors, composePresentation } from '../../store/presentations';
import PresentationBox from './PresentationBox';
import './PresentationCompose.css';
import SlideText from '../SlideElements/SlideText';
import SlideRectangle from '../SlideElements/SlideRectangle';
import SlidePhoto from '../SlideElements/SlidePhotos';
import savePresentation from './presentationSave';
import Swatchy from './ColorSwatches';
import Swatches from './Swatches';
import Categories from './Categories';
function PresentationCompose () {
  const [errors,setErrors] = useState([]);
  const [onFocus,setOnFocus] = useState(null);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const [bold,setBold] = useState(false);
  const [stateCategories,setStateCategories] = useState(['']);
  const [showSwatch,setShowSwatch] = useState({
    reveal:false,
  type:null});
  const history = useHistory();

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  
  useEffect(()=>{
    //set button to display none
    
  },[onFocus])
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
   1:{ 1:{id:1, rotate:0,startLeft:0/windowWidth,startTop:0/windowHeight, text:'', type: "text",bold:false,color:'black',fontsize: 16/windowWidth}},
   2:{ 1:{id:1, rotate:0, startLeft:0/windowWidth,startTop:0/windowHeight, text:'', type: "text",bold:false,color:'black',fontsize: 16/windowWidth}}
  });
  useEffect(()=>{
    setTimeout(()=>{
      if (errors.length>0){
        setErrors([]);
      }
    },5000)

  },[errors]);
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

function handleRotate(type){
    switch (type) {
      case 'minus':
          if(onFocus){
            setPresentationState(state=>{
              return{
                ...state,
                [slideNumber]:{...state[slideNumber],
                [onFocus]:{...state[slideNumber][onFocus],
                  rotate: (presentationState[slideNumber][onFocus].rotate-1)}
                }
              }
            })
            }
          break;
      case 'plus':
        if(onFocus){
        setPresentationState(state=>{
          return{
            ...state,
            [slideNumber]:{...state[slideNumber],
            [onFocus]:{...state[slideNumber][onFocus],
              rotate: (presentationState[slideNumber][onFocus].rotate+1)}
            }
          }
        })
      }
        break;
      default:
          break;
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
  const nextId = Object.values(presentationState[slideNumber]).length+1;
  const addTextElement = (event) =>{
    // event.preventDefault();
    setPresentationState(state=>{
      return {...state,[slideNumber]:{...state[slideNumber],[nextId]: {text: '',startLeft:0/windowWidth,startTop:0/windowHeight,id: nextId, type: "text", bold:false,color:'black',fontsize: 16/windowWidth}}
    }})
  } 

  const addRectangleElement = (event) =>{
    // event.preventDefault();
    setPresentationState(state=>{
     return {...state,[slideNumber]: {...state[slideNumber],[nextId]: {rotate:0,startWidth:50/windowWidth,startHeight:50/windowHeight,startLeft:0,startTop:0,id: nextId, type: "rectangle", bg:'grey'}}}
    })
    } 
  const handleFontChange = (type) =>{
      
      switch (type) {
          case 'minus':
              if(onFocus){
                setPresentationState(state=>{
                  return{
                    ...state,
                    [slideNumber]:{...state[slideNumber],
                    [onFocus]:{...state[slideNumber][onFocus],
                      fontsize: (presentationState[slideNumber][onFocus].fontsize*windowWidth-1)/windowWidth}} }
                })
              } 
              break;
          case 'plus':
            if(onFocus){
            setPresentationState(state=>{
              return{
                ...state,
                [slideNumber]:{...state[slideNumber],
                [onFocus]:{...state[slideNumber][onFocus],
                  fontsize: (presentationState[slideNumber][onFocus].fontsize*windowWidth+1)/windowWidth}}}  
            })
          }
            break;
          default:
              break;
      }
  }
  const handleFile =(event) =>{
    const file = event.currentTarget.files[0];
    setPresentationState(state=>{
        return {...state,
          [slideNumber]: {...state[slideNumber],
            [nextId]: {startWidth:50/windowWidth,
            startHeight:50/windowHeight,
            startLeft:0,startTop:0,
            id: nextId, 
            type: "photo",
            photo: file}}}
      }
    )
  }
  const prepareCategories = ()=>{
    if (stateCategories.length>1){
      return stateCategories.join('#');
    }else if (stateCategories.length===1){
      return stateCategories[0];
    } else{
      return '';
    }
  }
  const handleSave = async ()=>{
    console.log('saved');
    const saveButton = document.querySelector(".save-button");
    
    const categories = prepareCategories();
    console.log(categories);
    saveButton.disabled = true;
    let savedObject=JSON.parse(JSON.stringify(presentationState));
    const res = await savePresentation(savedObject, dispatch, title,categories);
    if (res.ok) {
      history.push('/presentations');
      console.log("successful creation");
    } else {
      setErrors(["Presentation title must be at least 5 characters"]);
      console.log("did not work here")
      saveButton.disabled = false;
    }
    
    // [1:{},2:{}]
    // Object.values(presentationState).forEach((ele)=>{
    //   savedObject[ele.id] = ele;
    // })
    // console.log(savedObject);
  }
  const handleEleRemove = () =>{
    const newState = {
      ...presentationState
    }
    const newPage={}
    delete newState[slideNumber][onFocus];
    Object.values(newState[slideNumber]).forEach((ele,index)=>{
      ele.id = index+1;
      newPage[index+1]=ele
    })
    setOnFocus(null);
    setPresentationState({...newState,[slideNumber]: newPage});
  }
  const nextPage = Object.values(presentationState).length+1;
  const handlePageAdd = ()=>{
    setPresentationState(state=>{
      return {...state,[nextPage]:{}}
    })
  }

  const handlePageRemove = () =>{
    const deletePage = slideNumber;
    const newState={...presentationState}
    delete newState[slideNumber];
    const updatedPages={};
    Object.values(newState).forEach((page,index)=>{
        updatedPages[index+1]=page;
    })
    if(deletePage>Object.keys(updatedPages).length){
      setSlideNumber(deletePage-1);
    } else {
    setSlideNumber(deletePage);
    }
    setPresentationState(updatedPages);
    
    
  }
  // slidetext: click and drag, when placed within the presentation canvas (top > canvas top, bottom < canvas bottom, right < canvas right, left > canvas left)
  // spawn it into the center
  // when SlideText is out of the slidetext container, render a new one
  // when dragged into canvas, append to the canvas, then onChange, we can iterate through the canvas's children to record changes to presentation state? 
  // check children right, left, top, bottom, type, width, height, (rotation??)
  // console.log(presentationState[slideNumber]);
  const intObjects = Object.values(presentationState[slideNumber]);
  return (
    <>
  
      {/* <form className="compose-presentation" onSubmit={handleSubmit}> */}
      {/* decide how the input will be taken */}
      
      <div className='compose-container'>
        <div className="title-compose">
          <h3> Presentation Title: </h3>
      {errors.length>0 && 
      <div className='error-container'>
        <div className='error-body'>
          <span className='error-content'>
            {errors[0]}
          </span>
        </div>
      </div>}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter presentation title"
            className="presentation-title-input"
          />
        </div>
        <Categories setStateCategories={setStateCategories}/>

        <div className='selection'>
          <button onClick={event=>addTextElement(event)}>
            <img src='../icons/text-box.png'></img>
            Text-Box
          </button>
          <button onClick={event=>addRectangleElement(event)}>
            <img src='../icons/rectangle-vector.png'></img>
            Rectangle
          </button>
          <button disabled='true' className='photo-upload-container' onClick={()=>document.getElementById('photo-input').click()} >
            <i className="fa-solid fa-image fa-xl"></i>
            <span className='photo-text'>Photo (work in progress) </span>
            <input style={{display: 'none'}} type='file' id='photo-input' onChange={event=>handleFile(event)}></input>
          </button>
          <button onClick={()=>setPresentationState(
            state=>{
              return {...state,[slideNumber]:{...state[slideNumber],[onFocus]:{...state[slideNumber][onFocus],bold: !presentationState[slideNumber][onFocus].bold}}}
            }
          )}>
            <i class="fa-solid fa-bold fa-xl"></i>
            Bold
          </button>
          <div className='color-dropdown'>
            <button onMouseEnter={()=>setShowSwatch({reveal:true,type:'text'})} className='color-button'>
              <img src='../icons/color-text.png'></img>
              Text Color
            </button>
            <div className='color-dropdown-content'>
              {showSwatch.reveal && showSwatch.type==='text' && <Swatches slideNumber={slideNumber} type='text' onFocus={onFocus} setPresentation={setPresentationState} setShowSwatch={setShowSwatch}/>}
            </div>
          </div>
          <div className='fontsize-container'>
              <button onClick={()=>handleFontChange('plus')} className='font-buttons' o>
                  <i className="fa-solid fa-plus"></i>
              </button>
              <div>
                {presentationState[slideNumber][onFocus] && 
                presentationState[slideNumber][onFocus].type==='text'&& 
                <span>{Math.round(presentationState[slideNumber][onFocus].fontsize*windowWidth)}</span>}
              </div>
              <button onClick={()=>handleFontChange('minus')} className='font-buttons'>
                <i className="fa-solid fa-minus"></i>
              </button>
          </div>
          <div className='rotate-container'>
              <button 
              onMouseDown={()=>handleRotate('minus')} 
              className='rotate-buttons' o>
                  <i className="fa-solid fa-rotate-left"></i>
              </button>
              <div>
              {presentationState[slideNumber][onFocus] && 
                <input className='rotate-input' type='number' value={presentationState[slideNumber][onFocus].rotate}
                onChange={(e)=>setPresentationState(state=>{
              return{
                ...state,
                [slideNumber]:{...state[slideNumber],
                [onFocus]:{...state[slideNumber][onFocus],
                  rotate: e.target.value}
                }
              }
                })}
                ></input>
              }
                {/* {presentationState[slideNumber][onFocus] && 
                <span>{Math.round(presentationState[slideNumber][onFocus].rotate)} deg</span>} */}
              </div>
              <button onClick={()=>handleRotate('plus')} className='rotate-buttons'>
                <i className="fa-solid fa-rotate-right"></i>
              </button>   
          </div>
          <div className='color-dropdown'>
            <button onMouseEnter={()=>setShowSwatch({reveal:true,type:'shape'})}>
              <img src='../icons/bucket.png'></img>
              Shape Color
            </button>
            <div className='color-dropdown-content'>
              {showSwatch.reveal && showSwatch.type==='shape' && <Swatches slideNumber={slideNumber} type='shape' onFocus={onFocus} setPresentation={setPresentationState} setShowSwatch={setShowSwatch}/>}
            </div>

          </div>
        </div>
        {/* canvas frame to house the canvas and display possible overflows */}
        <div className='canvas-frame'>
          <div className='presentation-canvas' >
              {intObjects.map((obj)=>{
                if (obj.type === "text") return <SlideText 
                                                key={`${slideNumber}-${obj.id}`}
                                                slideNumber={slideNumber}
                                                fontsize={obj.fontsize} 
                                                color={obj.color} 
                                                bold={obj.bold} 
                                                setOnFocus={setOnFocus} 
                                                setPresentationState={setPresentationState} 
                                                id={obj.id} 
                                                text={obj.text} 
                                                startLeft={obj.startLeft} 
                                                startTop={obj.startTop} 
                                                windowHeight={windowHeight}
                                                windowWidth={windowWidth}
                                                rotate={obj.rotate}
                                                />
                if (obj.type === "rectangle") return <SlideRectangle 
                                                key={`${slideNumber}-${obj.id}`}
                                                slideNumber={slideNumber}
                                                setPresentationState={setPresentationState} 
                                                startHeight={obj.startHeight} 
                                                id={obj.id} 
                                                startWidth={obj.startWidth} 
                                                startLeft={obj.startLeft} 
                                                startTop={obj.startTop} 
                                                windowHeight={windowHeight}
                                                windowWidth={windowWidth}
                                                setOnFocus={setOnFocus}
                                                bg={obj.bg}
                                                rotate={obj.rotate}
                                                />
                if (obj.type === "photo") return <SlidePhoto
                                                key={`${slideNumber}-${obj.id}`}
                                                slideNumber={slideNumber}
                                                setPresentationState={setPresentationState} 
                                                id={obj.id} 
                                                startHeight={obj.startHeight} 
                                                startWidth={obj.startWidth} 
                                                startLeft={obj.startLeft} 
                                                startTop={obj.startTop} 
                                                windowHeight={windowHeight}
                                                windowWidth={windowWidth}
                                                setOnFocus={setOnFocus}
                                                photo= {obj.photo}
                                                />
              })}
          </div>
        </div>
        <div>
        <button className='button-remove-ele' onClick={handleEleRemove}>
              Delete Selected Item
        </button>
        <button onClick={handlePageAdd} className='button-add-page'>
          Add Page
        </button>
        <button disabled={Object.keys(presentationState).length===1}  className='button-remove-page' onClick={handlePageRemove}>
          Remove Page
        </button>
        <div className='slide-number-container'>
          <span className='slide-number'>
            {`page ${slideNumber}/${Object.keys(presentationState).length}`}
          </span>
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