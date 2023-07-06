import './Likes.css';
import { useState,useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { fetchPresentations } from '../../store/presentations';
import { fetchUserLikes, fetchLikes } from '../../store/likes';
import LikesIndexItem from './LikesIndexItem';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LikesIndex = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [newLikes, setNewLikes] = useState([])
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

    // console.log("likes", likes);
  
  
    console.log("RERENDERING RIGHT NOW")
    return (
      <div>
        <h2>Presentations Liked by User</h2>
        <div className='likes-container'>
            {newLikes.map(like => (
                <>
                  <LikesIndexItem key={like._id} like={like} />
                </>
            ))}
        </div>
       
      </div>
    );
  };
  
  export default LikesIndex;