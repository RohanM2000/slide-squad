import {useSelector, useDispatch} from 'react-redux';
import { clearPresentationErrors, fetchPresentations } from '../../store/presentations';
import { useEffect } from "react";
import CarouselItem from "./Carouseltem";

export default function HomeCarousel() {
    const dispatch = useDispatch();
    const presentations = useSelector(state => Object.values(state.presentations));
    
    useEffect(() => {
      dispatch(fetchPresentations());
      return () => dispatch(clearPresentationErrors());
    }, [dispatch])

    const featuredPresentations = presentations.slice(0, 9); 

    return (
        <div className="wrapper">

             <div className='carousel'>
               
            {featuredPresentations.map(presentation => (

                <div className="carousel__item">
                  <CarouselItem presentation={presentation} />
               
                        <div className="caro-presentation-details">
                            <div className="caro-title">{presentation.title}</div>
                     
                        </div>   
               
                </div>
            
            ))}
                
          

             {/* <div class='carousel__item'>
                    <div class='carousel__item-head'>
                        🐳
                    </div>
                    <div class='carousel__item-body'>
                        <p class='title'>spouting whale</p>
                        <p>Unicode: U+1F433</p>
                    </div>
            </div>
                  */}

            </div>

       

 
        
        </div>

    )
}


