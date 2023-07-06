import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import CommentsIndex from "../Comments/CommentIndex";

const PresentationFooter =()=>{
    const {presentationId} = useParams();
    const [showComments,setShowComments] = useState(false);

    const handleToggle=()=>{
        setShowComments(!showComments);
        // fetch comments for the post with presentationId
    }
    return (
        <div className='footer-container'>
            { !showComments && <div onClick={handleToggle} className='footer-toggle'>
                <i className="fa-solid fa-arrow-down"></i>
            </div>}
            { showComments && <div onClick={handleToggle} className='footer-toggle'>
                <i className="fa-solid fa-arrow-up"></i>
            </div>}
            {showComments && <CommentsIndex />}
        </div>
    )
}

export default PresentationFooter;