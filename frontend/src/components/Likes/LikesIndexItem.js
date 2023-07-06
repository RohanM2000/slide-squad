import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Likes.css';
import { deleteLike } from '../../store/likes';
import { fetchPresentation } from '../../store/presentations';

const LikesIndexItem = ({ like } ) => {
    const presentation = useSelector(state => state.presentations[like.likeId] )
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPresentation(like.likeId))
    }, [dispatch, like.likeId])

    if (presentation === undefined) {
        return null 
    }

    console.log(like);

    return (
        <>
        <div className='like-container'>
            <h3>{presentation.title}</h3>
            <button onClick={() => dispatch(deleteLike(like._id))}>Delete</button>
        </div>
        </>
    )
}

export default LikesIndexItem;