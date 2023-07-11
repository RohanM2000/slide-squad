import './Likes.css';
import { useState,useEffect,useRef } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { fetchPresentations } from '../../store/presentations';
import { fetchUserLikes, fetchLikes } from '../../store/likes';
import LikesIndexItem from './LikesIndexItem';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import '../Slider/Slider.css'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LikesIndex = () => {
  const currentUser = useSelector(state => state.session.user)
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [newLikes, setNewLikes] = useState([])
    const scrollChecker = useRef();
    const likes = useSelector(state => {
      // console.log(state.likes);
      if (Object.values(state.likes).length !== newLikes.length) {
        setNewLikes(Object.values(state.likes));
      }
      return state.likes
    });
    useEffect(() => {
      dispatch(fetchUserLikes(userId));
    }, [dispatch, userId])


    const vertical_slider = {

      slider_class: ".slider",
  
  
      show_slide: function (slide_id, context_item) {
        const slide_container = context_item
          .closest(this.slider_class)
          .querySelector(".slides");
        if (slide_container) {
          const slides = slide_container.querySelectorAll(".slide");
          if (slides && slides[slide_id]) {
           
            slide_container.scrollTo({
              top: slides[slide_id].offsetTop,
              behavior: "smooth"
            });
  
  
            const active_context_item = context_item
              .closest(".slide_navigation")
              .querySelector(".active");
            if (active_context_item) {
              active_context_item.classList.remove("active");
            }
  
            context_item.classList.add("active");
          }
        }
      },
  
  
      init_slider: function (slider) {
        const navigation_items = slider.querySelectorAll(".slide_navigation a");
  
        if (navigation_items) {
          Object.keys(navigation_items).forEach(function (key) {
            navigation_items[key].onclick = function (e) {
              e.preventDefault();
  
              vertical_slider.show_slide(key, navigation_items[key]);
            };
          });
        }
      },
  
    
      init: function () {
  
        document
          .querySelectorAll(this.slider_class)
          .forEach((slider) => this.init_slider(slider));
      }
    };
  
  
    vertical_slider.init();
    

  
    // console.log("RERENDERING RIGHT NOW")
    let filteredLikes = [];
    if (newLikes) {
      newLikes.forEach((like)=> {
        // console.log("like", like)
        if (like.liker._id === userId) {
          filteredLikes.push(like);
        }
      })
    }
    return (
      <div>
        <div className='likes-container'>
          
          <script src="slider.js"></script>
          <section className='slider'>
            <div className='content_container'>
            <h2>{currentUser.username}'s Liked Presentations</h2>
              <p>View all your liked presentations in one place for fast and easy access.</p>

              <ul class="slide_navigation">
                <h3>Presentations</h3>
                
                {filteredLikes.map(like => (
                    <>
                    <li>
                      <a href={`#slide_1`} className='active'>
                        {like.likeId.title}
                      </a>
                  </li>
                    
                    </>

                ))}
                  
              </ul>

            </div>
              <div className='slides'
               ref={scrollChecker}
              //  onScroll={()=>console.log(scrollChecker.current.scrollTop, 0.8 * window.innerHeight)}
              >
                  {filteredLikes.map((like, idx) => (
                    <>
                    <div className='slide'>
                      {/* <PresentationBox key={presentation._id} presentation={presentation} /> */}
                      <div className='inner_content'>
                        {/* <StaticPresentation presentation={presentation} idx={idx} scrollChecker={scrollChecker}/> */}
              
                        <LikesIndexItem key={like._id} like={like} swap={true} scrollChecker={scrollChecker} idx={idx}/>

                      </div>

                    </div>
                    </>
                  ))}
            </div>
         
          </section>
        </div>
       
            {/* {filteredLikes.map(like => (
              <>
                </>
            ))} */}
      </div>
    );
  };
  
  export default LikesIndex;