import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Likes.css';
import { deleteLike } from '../../store/likes';
import { fetchPresentation } from '../../store/presentations';

const LikesIndexItem = ({ like } ) => {
    const presentation = useSelector(state => state.presentations[like.likeId] );
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    useEffect(() => {
        dispatch(fetchPresentation(like.likeId))
    }, [dispatch, like.likeId])

    if (presentation === undefined) {
        return null 
    }
    // console.log("like", like);

    return like && show && (
        <>
        <div className='like-container'>
            <h3>{presentation.title}</h3>
            <button onClick={() => {
                dispatch(deleteLike(like._id));
                setShow(false);
            }}>Delete</button>
        </div>
        </>
    )
}

export default LikesIndexItem;