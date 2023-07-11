import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPresentationErrors, fetchPresentations } from '../../store/presentations';
import StaticPresentation from '../StaticPresentation/StaticPresentation';
import '../Slider/Slider.css'
import { fetchLikes, fetchUserLikes } from '../../store/likes';





function Presentations () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const presentations = useSelector(state => Object.values(state.presentations));
  const scrollChecker = useRef();
  const [loadedLikes, setLoadedLikes] = useState(false);
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
  
  useEffect(() => {
    dispatch(fetchUserLikes(currentUser._id)).then(()=>setLoadedLikes(true)).catch((err)=>console.log(err));
    dispatch(fetchPresentations());
    return () => dispatch(clearPresentationErrors());
  }, [dispatch])
 

  if (presentations.length === 0) return <div>There are no Presentations</div>;
  // const tempSlideCheck = document.querySelector('.slides');
  // console.log(tempSlideCheck);
  // if (scrollChecker.current) {
  //   console.log(scrollChecker.current.scrollTop);
  // }
  return (
    <>
    <div className='all-presentations-container'>
          <script src="slider.js"></script>
          <section className='slider'>
            <div className='content_container'>
              <h1>Discover a treasure trove of knowledge and creativity!</h1>
              <p>From informative lectures to stunning visual journeys, each presentation is a gateway to inspiration. Explore, learn, and unlock new perspectives as you dive into the diverse world of presentations created and shared by our vibrant community of users.</p>

              <ul class="slide_navigation">
                <h3>Presentations</h3>
                
                {presentations.map(presentation => (
                    <>
                    <li><a href="#slide_1" className="active">{presentation.title}</a></li>
                    
                    </>

                ))}
                  
              </ul>

            </div>
              <div className='slides'
               ref={scrollChecker}
              //  onScroll={()=>console.log(scrollChecker.current.scrollTop, 0.8 * window.innerHeight)}
              >
                  {presentations.map((presentation, idx) => (
                    <>
                    <div className='slide'>
                      {/* <PresentationBox key={presentation._id} presentation={presentation} /> */}
                      <div className='inner_content'>
                        <StaticPresentation presentation={presentation} idx={idx} scrollChecker={scrollChecker} presentationSize={46/52} swap={false} loadedLikes={loadedLikes}/>

                      </div>

                    </div>
                    </>
                  ))}
            </div>
         
          </section>
    </div>
    </>
  );
}

export default Presentations;