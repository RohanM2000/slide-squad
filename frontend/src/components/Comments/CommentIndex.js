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
        // console.log('fetched');
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
    const [updatedComment,setUpdatedComment] = useState(comment.comment.content);
    const sessionUser = useSelector(state=> state.session.user);
    const handleUpdate =(event) =>{
        event.preventDefault();
        dispatch(updateComment(comment.comment._id,updatedComment));
        setEdit(false);
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
                        {!edit && <p className='comment-text'>
                            {comment.comment.content}
                        </p>}
                        {edit &&
                        <>
                            <div className='comment-edit-body'>
                                <input 
                                    value={updatedComment}
                                    onChange={event=> setUpdatedComment(event.target.value)}
                                    className='update-comment-input'
                                >
                                </input>
                                <div className='update-comment-buttons-body'>
                                    <button className='update-comment-buttons' onClick={event=>handleUpdate(event)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button className='update-comment-buttons' onClick={()=>setEdit(false)}>
                                        <i class="fa-solid fa-x"></i>
                                    </button>
                                </div>

                            </div>
                        </>
                        }

                    </div>
                </div>
            </div>
            {!edit && sessionUser._id === comment.comment.user._id &&
            <div className='comment-buttons'>
                <button onClick={() => {
                    dispatch(deleteComment(comment.comment._id));
                    setShow(false);
                    }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={()=>setEdit(true)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
            }
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
        setContent("");

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


