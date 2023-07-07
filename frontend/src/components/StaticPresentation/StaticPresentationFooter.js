import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import CommentsIndex from "../Comments/CommentIndex";
import { useDispatch } from "react-redux";
import { fetchPresentationComments } from "../../store/comments";
import { createLike } from "../../store/likes";

const PresentationFooter =({presentation})=>{
    const presentationId = presentation._id
    const [showComments,setShowComments] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPresentationComments(presentationId));
    }, [dispatch, presentationId])

    const handleToggle=()=>{
        setShowComments(!showComments);
        // fetch comments for the post with presentationId
    }

    const [isLiked, setIsLiked] = useState(false);
    const HandleAddLike = (e) => {
        e.preventDefault();
         const like = {
            liker: presentation.author._id,
            likeId: presentation._id,
            likeType: 'Presentation'
         }
    
         dispatch(createLike(like))
         .then(() => {
            setIsLiked(true); 
          })
      }
    return (
        <div className='footer-container'>
            <div className="like-comment-buttons">

                <div className='add-like-button'>
                <button onClick={HandleAddLike}>
                <i className={`fa-regular fa-heart fa-xl ${isLiked ? 'fa-solid fa-heart' : ''}`}></i>
                </button>
                </div>
                { !showComments && <div onClick={handleToggle} className='footer-toggle'>
                    <i class="fa-regular fa-comment fa-lg"></i>
                </div>}
            </div>
            { showComments && <div onClick={handleToggle} className='footer-toggle up-arrow'>
                <i className="fa-solid fa-arrow-up"></i>
            </div>}
            {showComments && <CommentsIndex presentationId={presentationId} />}
        </div>
    )
}

export default PresentationFooter;