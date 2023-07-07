import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import CommentsIndex from "../Comments/CommentIndex";
import { useDispatch } from "react-redux";
import { fetchPresentationComments } from "../../store/comments";

const PresentationFooter =({presentationId})=>{
    // const {presentationId} = useParams();
    const [showComments,setShowComments] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPresentationComments(presentationId));
    }, [dispatch, presentationId])

    const handleToggle=()=>{
        setShowComments(!showComments);
        // fetch comments for the post with presentationId
    }
    return (
        <div className='footer-container'>
            { !showComments && <div onClick={handleToggle} className='footer-toggle'>
<<<<<<< HEAD
                <i class="fa-regular fa-comment fa-lg"></i>
=======
                <h4>Comments</h4>
                <i className="fa-solid fa-arrow-down"></i>
>>>>>>> 0c6f04d1770bc9701a4c96f132efddc972dd3e09
            </div>}
            { showComments && <div onClick={handleToggle} className='footer-toggle'>
                <i className="fa-solid fa-arrow-up"></i>
            </div>}
            {showComments && <CommentsIndex presentationId={presentationId} />}
        </div>
    )
}

export default PresentationFooter;