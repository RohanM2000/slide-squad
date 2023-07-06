import './Likes.css';
import { useState,useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { fetchPresentations } from '../../store/presentations';
import { fetchUserLikes, fetchLikes } from '../../store/likes';
import LikesIndexItem from './LikesIndexItem';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


const LikesIndex = () => {
  const currentUser = useSelector(state => state.session.user)
    const { userId } = useParams();
    const dispatch = useDispatch();
    const likes = useSelector(state => Object.values(state.likes));
    
    useEffect(() => {
      dispatch(fetchUserLikes(userId));
    }, [dispatch, userId])

  
    return (
      <div>
        <div className='likes-container'>
          <h2>{currentUser.username}'s Liked Presentations</h2>
            {likes.map(like => (
                <>
                <LikesIndexItem key={like._id} like={like}/>
                </>
            ))}
        </div>
       
      </div>
    );
  };
  
  export default LikesIndex;