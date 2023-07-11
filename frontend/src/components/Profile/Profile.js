import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css';
import { fetchUserPresentations, clearPresentationErrors } from '../../store/presentations';
import { fetchUserLikes } from '../../store/likes';
import { fetchPresentations } from '../../store/presentations';
import StaticPresentation from '../StaticPresentation/StaticPresentation';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';
// import TweetBox from '../Tweets/TweetBox';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userPresentations = useSelector(state => Object.values(state.presentations))
  const scrollChecker = useRef();
  const [loadedLikes, setLoadedLikes] = useState(false);
  
  useEffect(() => {
    dispatch(fetchUserLikes(currentUser._id)).then(()=>{setLoadedLikes(true)}).catch((err)=>console.log(err));
    dispatch(fetchPresentations());
    return () => dispatch(clearPresentationErrors());
  }, [currentUser, dispatch]);

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


  let filteredPresentations = [];
  if (userPresentations && userPresentations.length > 0) {
    userPresentations.forEach(presentation=> {
      if (currentUser._id === presentation.author._id) {
        filteredPresentations.push(presentation);
      }
    })
  }

  if (filteredPresentations.length === 0) {
    return <div>{currentUser.username} has no Presentations</div>;
  } else {
    return (
      <>
      <div className='profile-container'>
      <script src="slider.js"></script>
          <section className='slider'>
            <div className='content_container'>
              <h1>{currentUser.username}</h1>
              <p>Explore your collection of presentations. Dont't forget to read comments, and feedback other users have left and update your presentation for even more likes! </p>

              <ul class="slide_navigation">
                <h3>Presentations</h3>
                
                {filteredPresentations.map(presentation => (
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
                  {filteredPresentations.map((presentation, idx) => (
                    <>
                    <div className='slide'>
                      {/* <PresentationBox key={presentation._id} presentation={presentation} /> */}
                      <div className='inner_content'>
                      <button className='edit-button-presentation'>
                        <Link to={`/presentations/${presentation._id}/edit`}>Edit</Link>
                      </button>
                        <StaticPresentation presentation={presentation} idx={idx} scrollChecker={scrollChecker} presentationSize={46/52} loadedLikes={loadedLikes}/>

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
}

export default Profile;