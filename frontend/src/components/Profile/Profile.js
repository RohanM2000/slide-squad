import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css';
import { fetchUserPresentations, clearPresentationErrors } from '../../store/presentations';
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';
// import TweetBox from '../Tweets/TweetBox';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userPresentations = useSelector(state => Object.values(state.presentations))
  
  useEffect(() => {
    dispatch(fetchUserPresentations(currentUser._id));
    return () => dispatch(clearPresentationErrors());
  }, [currentUser, dispatch]);

  // return (
  //   <>
  //   <h1>{currentUser.username}</h1>
  //   </>
  // )

  if (userPresentations.length === 0) {
    return <div>{currentUser.username} has no Presentations</div>;
  } else {
    return (
      <>
        <h2>All of {currentUser.username}'s Presentations</h2>
        {userPresentations.map(presentation => (
          <div key={presentation._id} >
            {/* <PresentationShowPage
            
            /> */}
            <p key={presentation._id}>{presentation.title}</p>
          </div>
        ))}
        
      </>
    );
  }
}

export default Profile;