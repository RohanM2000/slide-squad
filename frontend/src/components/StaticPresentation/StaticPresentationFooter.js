import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import CommentsIndex from "../Comments/CommentIndex";
import { useDispatch } from "react-redux";
import { fetchPresentationComments } from "../../store/comments";
import { createLike, deleteLike, fetchUserLikes } from "../../store/likes";

const PresentationFooter =({presentation, swap, loadedLikes})=>{
    
    const currentUser = useSelector(state => state.session.user)
    const likes = useSelector(state => Object.values(state.likes))
    const presentationId = presentation._id
    const [showComments,setShowComments] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    // const [pushable, setPushable] = useState(true);
    // useEffect(() => {
    //     dispatch(fetchPresentationComments(presentationId));
    // }, [dispatch, presentationId])
    const [isLiked, setIsLiked] = useState(swap);

    // useEffect(() => {
    //   dispatch(fetchUserLikes(currentUser._id)).then(()=>{
    //     likes.forEach(like=>{
    //       if (like.likeId === presentationId) {
    //         setIsLiked(true);
    //       }
    //     })

    //   }).catch((err)=>console.log(err));
    // }, [dispatch, currentUser._id])

    if (loadedLikes && !checked) {
      // console.log(likes)
      likes.forEach(like=>{
              // console.log(like.likeId._id, presentationId);
              // console.log(like.likeId._id === presentation._id);
              if (like.likeId._id === presentationId) {
                setIsLiked(true);
              }
            })
      setChecked(true);
      // console.log(presentation.title, "isLiked", isLiked);
    }
    const handleToggle=()=>{
        setShowComments(!showComments);
        // fetch comments for the post with presentationId
    }

    const HandleAddLike = (e) => {
      e.preventDefault();
      // if (!pushable) return;
      // setPushable(false);
      // const alreadyLiked = likes.some(
      //   (like) => like.likeId._id === presentation._id && like.liker === currentUser._id
      // );
      if (isLiked) {
        const likeToDelete = likes.find((like) => like.likeId._id === presentation._id);
        if (likeToDelete) {
          dispatch(deleteLike(likeToDelete._id)).then(() => {
            // setIsLiked(false);
            // setPushable(true);
          });
          setIsLiked(false);
        }
      } else {
      
        const like = {
          liker: presentation.author._id,
          likeId: presentation._id,
          likeType: 'Presentation'
        };
    
        dispatch(createLike(like))
          .then(() => {
            // setIsLiked(true);
            // setPushable(true);
          });
        setIsLiked(true);
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