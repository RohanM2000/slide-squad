import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Likes.css';
import { deleteLike } from '../../store/likes';
import { fetchPresentation } from '../../store/presentations';
import StaticPresentation from '../StaticPresentation/StaticPresentation';

const LikesIndexItem = ({ like } ) => {
    const presentation = useSelector(state => state.presentations[like.likeId] )
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPresentation(like.likeId))
    }, [dispatch, like.likeId])

    if (presentation === undefined) {
        return null 
    }

    return (
        <>
        <div className='presentation-container'>
            <StaticPresentation presentation={presentation} />
            <button onClick={() => dispatch(deleteLike(like._id))}>Delete</button>
        </div>
        </>
    )
}

export default LikesIndexItem;