import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPresentationErrors, fetchPresentations } from '../../store/presentations';
import PresentationBox from './PresentationBox';

function Presentations () {
  const dispatch = useDispatch();
  const presentations = useSelector(state => Object.values(state.presentations.all));
  
  useEffect(() => {
    dispatch(fetchPresentations());
    return () => dispatch(clearPresentationErrors());
  }, [dispatch])

  if (presentations.length === 0) return <div>There are no Presentations</div>;
  
  return (
    <>
      <h2>All Presentations</h2>
      {presentations.map(presentation => (
        <PresentationBox key={presentation._id} presentation={presentation} />
      ))}
    </>
  );
}

export default Presentations;