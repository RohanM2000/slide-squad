import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchPresentationComments } from "../../store/comments";
import { deleteComment,createComment,updateComment } from "../../store/comments";
import './Comments.css'



const CommentsIndex = ({presentationId}) => {
    const presentationComments = useSelector(state=> Object.values(state.comments));
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.session.user);

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
    let filteredComments = [];
    if (presentationComments) {
        presentationComments.forEach(comment=> {
            if (comment.presentation === presentationId) {
                filteredComments.push(comment);
            }
        })
    }
    return (
        <div className='comments-container'>
            {filteredComments.length > 0 && <div className='comments-body'>
                {filteredComments.map((comment,index)=>{
                    return (
                        <>
                            <CommentShow comment={comment} />
                        </>
                    )
                })}
            </div>}
            <CommentInput presentationId={presentationId} />
        </div>
    )
    // button to click to display comments
}
export default CommentsIndex;


export const CommentShow = (comment) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);
    const [edit,setEdit] = useState(false);
    const [updatedComment,setUpdatedComment]=useState(comment.comment.content);
    const currentUser = useSelector(state=> state.session.user);
    const handleUpdate = (event)=>{
        event.preventDefault();
        const body ={id: comment.comment.id, content: updatedComment};
        dispatch(updateComment(body));
    }
    // need to add a button to delete
    return show && (
        <>
        <div key={comment.id} className='comment-row'>
            <div className='comment-container'>
                <div className='commenter'>
                    <div>{comment.comment.user.username} </div>
                </div>
                <div className='comment-content'>
                    <div className='comment-body'>
                    {!edit &&
                        <p className='comment-text'>
                            {comment.comment.content}
                        </p>
                    }
                    {edit && 
                        <>
                        <div className='comment-edit-container'>
                        <input value={updatedComment}
                                onChange={event=>setUpdatedComment(event.target.value)}
                                className='comment-edit'>
                        </input>
                        <button className='update-comment-button' onClick={event=>handleUpdate(event)}>
                            Update
                        </button>
                        </div>
                        </>
                    }
                    </div>
                </div>
            </div>

            <div className='comment-buttons'>
                <button onClick={() => {
                    dispatch(deleteComment(comment.comment._id));
                    setShow(false);
                    }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={event=>setEdit(true)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
        </div>
        
        </>

    )
}

const CommentInput =({presentationId})=>{
    const dispatch = useDispatch();
    const currentUser = useSelector((state)=>state.session.user);
    const [content,setContent] = useState('');
    const handleSubmit = (event) =>{
        event.preventDefault();

        const body = {presentationId: presentationId, content: content}

        dispatch(createComment(body));

    }

    return (
        <>
            <div className='inputcomment-container'>
                <div className='right-side'>
                    <div className='user-info'>
                        <span>
                            {currentUser.username}
                        </span>
                    </div>
                    <input
                    value={content}
                    onChange={(event)=>setContent(event.target.value)
                    }>
                    </input>
                </div>
                <div className='left-side'>
                    <button className='create-comment' onClick={event=>handleSubmit(event)}>
                        Comment
                    </button>

                </div>
            </div>
        </>
    )
}


