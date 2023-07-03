import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPresentationErrors, composePresentation } from '../../store/presentations';
import PresentationBox from './PresentationBox';
// import './PresentationCompose.css';

function PresentationCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newPresentation = useSelector(state => state.presentations.new);
  const errors = useSelector(state => state.errors.presentations);

  useEffect(() => {
    return () => dispatch(clearPresentationErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composePresentation({ text })); 
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <form className="compose-presentation" onSubmit={handleSubmit}>
      {/* decide how the input will be taken */}
        <input 
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your tweet..."
          required
        />
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="tweet-preview">
        <h3>Presentation Preview</h3>
        {text ? <PresentationBox presentation={{text, author}} /> : undefined}
      </div>
      <div className="previous-presentation">
        <h3>Previous Presentation</h3>
        {newPresentation ? <PresentationBox presentation={newPresentation} /> : undefined}
      </div>
    </>
  )
}

export default PresentationCompose;