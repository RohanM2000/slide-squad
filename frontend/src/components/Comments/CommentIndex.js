import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchComments, fetchPresentationComments } from "../../store/comments";

const CommentsIndex = ({presentationId}) => {
    const presentationComments = useSelector(state=> Object.values(state.comments));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPresentationComments(presentationId))
    }, [dispatch])

    if (!presentationComments) return(
        <div className='loading'>
            <div className='loading-animation'>
            <i className="fa-solid fa-spinner fa-spin"></i> 
            </div>
        </div>
    );

    return (
        <div className='comments-container'>
            <div className='comments-body'>
                {presentationComments.map((comment,index)=>{
                    return (
                        <>
                            <CommentShow comment={comment} />
                        </>
                    )
                })}
            </div>
        </div>
    )
    // button to click to display comments
}
export default CommentsIndex;


export const CommentShow = (comment) => {
    
    //dislay profile pic and comment 
    const {profilepic,content,username} = comment;
    // need to add a button to delete
    return (
        <div key={comment.id} className='comment-row'>
            <div className='comment-container'>
                <div className='commenter-profilepic'>
                    <img src={profilepic}></img>
                </div>
                <div className='comment-content'>
                    <div className='comment-body'>
                        <p className='comment-text'>
                            {content}
                        </p>
                    </div>
                </div>
            </div>

            <div className='comment-buttons'>
                <button>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>

            </div>
        </div>
    )
}