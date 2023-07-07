import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useSelector, useDispatch} from 'react-redux';
import { clearPresentationErrors, fetchPresentations } from '../../store/presentations';
import { useEffect } from "react";
import CarouselItem from "./Carouseltem";

export default function MainCarousel() {
    const dispatch = useDispatch();
    const presentations = useSelector(state => Object.values(state.presentations));
    
    useEffect(() => {
      dispatch(fetchPresentations());
      return () => dispatch(clearPresentationErrors());
    }, [dispatch])

    return (
        <div className="caro-wrapper">
        <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        partialVisbile
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 2,
              partialVisibilityGutter: 40
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 2,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 3,
              partialVisibilityGutter: 30
            }
          }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        >
            {presentations.map(presentation => (

                <div className="caro-presentation-slide">
                  <CarouselItem presentation={presentation} />
                   <div className="caro-presentation-card">
                       
                             
                    
                        <div className="caro-presentation-details">
                            <div className="caro-title">{presentation.title}</div>
                            <div className="caro-msg">*Must be a member to view full presentation</div>
                     
                        </div>
                    </div>     
               
                </div>
            
            ))}
      </Carousel>
 
        
        </div>
    )
}

