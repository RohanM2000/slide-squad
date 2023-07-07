import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css';
import { fetchUserPresentations, clearPresentationErrors } from '../../store/presentations';
import { fetchPresentations } from '../../store/presentations';
import StaticPresentation from '../StaticPresentation/StaticPresentation';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';
// import TweetBox from '../Tweets/TweetBox';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userPresentations = useSelector(state => Object.values(state.presentations))
  
  useEffect(() => {
    dispatch(fetchPresentations());
    return () => dispatch(clearPresentationErrors());
  }, [currentUser, dispatch]);


  // return (
  //   <>
  //   <h1>{currentUser.username}</h1>
  //   </>
  // )
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
      <div className='all-presentations-container'>
        <h2>All of {currentUser.username}'s Presentations</h2>
        {filteredPresentations.map(presentation => (
          <div key={presentation._id} >
            {/* <PresentationShowPage
            
            /> */}
              <div key={presentation._id} className='presentation-container'>
                <Link to={`/presentations/${presentation._id}/edit`}>Edit</Link>
                <StaticPresentation presentation={presentation} />
              </div>
          </div>
        ))}
      </div>
        
      </>
    );
  }
}

export default Profile;