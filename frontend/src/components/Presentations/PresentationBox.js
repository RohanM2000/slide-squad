// import "./PresentationBox.css"
import StaticPresentation from "../StaticPresentation/StaticPresentation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { createLike } from "../../store/likes";

function PresentationBox ({presentation}) {
  const { username } = presentation.author;
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const HandleAddLike = (e) => {
    e.preventDefault();
     const like = {
        liker: presentation.author._id,
        likeId: presentation._id,
        likeType: 'Presentation'
     }

     dispatch(createLike(like))
  }

  return (
    <div className="presentation">
      <h3>{username}</h3>
      <p>{presentation.title}</p>
      <button onClick={HandleAddLike}>Like</button>
      <StaticPresentation presentationId={presentation._id} />
    </div>
  );
}

export default PresentationBox;