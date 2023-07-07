import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Likes.css';
import { deleteLike } from '../../store/likes';
import { fetchPresentation } from '../../store/presentations';
import StaticPresentation from '../StaticPresentation/StaticPresentation';

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

    return show && (
        <>
        <div className='presentation-container'>
            <StaticPresentation presentation={presentation} />
            <button 
                    className='delete-like-button'
                                   onClick={() => {
                                    dispatch(deleteLike(like._id));
                                    setShow(false);
                                   }}>Unlike</button>
        </div>
        </>
    )
}

export default LikesIndexItem;