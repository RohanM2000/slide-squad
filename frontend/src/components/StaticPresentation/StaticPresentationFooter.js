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
                <i class="fa-regular fa-comment fa-lg"></i>
            </div>}
            { showComments && <div onClick={handleToggle} className='footer-toggle'>
                <i className="fa-solid fa-arrow-up"></i>
            </div>}
            {showComments && <CommentsIndex presentationId={presentationId} />}
        </div>
    )
}

export default PresentationFooter;