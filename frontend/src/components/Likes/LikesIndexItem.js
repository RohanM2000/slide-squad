import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Likes.css';
import { deleteLike } from '../../store/likes';
import { fetchPresentation } from '../../store/presentations';
import StaticPresentation from '../StaticPresentation/StaticPresentation';

const LikesIndexItem = ({ like, swap, scrollChecker, idx} ) => {
    const presentation = useSelector(state => state.presentations[like.likeId._id] );
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    useEffect(() => {
        dispatch(fetchPresentation(like.likeId._id))
    }, [dispatch, like.likeId._id])

    if (presentation === undefined) {
        return null 
    }
    

    return show && (
        <>
        <div className='presentation-container'>
            <StaticPresentation presentation={presentation} swap={swap} disappear={setShow} scrollChecker={scrollChecker} idx={idx}/>
            {/* <button 
                    className='delete-like-button'
                                   onClick={() => {
                                    dispatch(deleteLike(like._id));
                                    setShow(false);
                                   }}>Unlike
            </button> */}
        </div>
        </>
    )
}

export default LikesIndexItem;