import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import CommentsIndex from "../Comments/CommentIndex";
import { useDispatch } from "react-redux";
import { fetchPresentationComments } from "../../store/comments";
import { createLike, deleteLike, fetchLikes } from "../../store/likes";

const PresentationFooter =({presentation, swap, disappear})=>{

    const likes = useSelector(state => Object.values(state.likes))
    const presentationId = presentation._id
    const [showComments,setShowComments] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPresentationComments(presentationId));
    }, [dispatch, presentationId])

    useEffect(() => {
      fetchLikes()
    })

 console.log(likes);

    const handleToggle=()=>{
        setShowComments(!showComments);
        // fetch comments for the post with presentationId
    }
    const [show, setShow] = useState(true);
    const [isLiked, setIsLiked] = useState(swap);
    const HandleAddLike = (e) => {
        e.preventDefault();
        
        if (isLiked) {
          const likeToDelete = likes.find((like) => like.likeId._id === presentation._id);
          console.log(likeToDelete);
          if (likeToDelete) {
            dispatch(deleteLike(likeToDelete._id)).then(() => {
              setIsLiked(false);
              setShow(false);
            });
          }
        } else {
        
          const like = {
            liker: presentation.author._id,
            likeId: presentation._id,
            likeType: 'Presentation'
          };
      
          dispatch(createLike(like))
            .then(() => {
              setIsLiked(true);
            });
        }
      };
      
      
      
      
      
      
      
    return (
        <div className='footer-container'>
            <div className="like-comment-buttons">

                <div className='add-like-button'>
                <button onClick={HandleAddLike}>
                <i className={`fa-regular fa-heart fa-xl ${isLiked ? 'fa-solid fa-heart' : ''}`}></i>
                </button>
                </div>
                { !showComments && <div onClick={handleToggle} className='footer-toggle'>
                    <i class="fa-regular fa-comment fa-lg" id='comment-icon'></i>
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