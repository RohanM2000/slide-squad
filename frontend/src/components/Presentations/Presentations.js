import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPresentationErrors, fetchPresentations } from '../../store/presentations';
import './PresentationBox.css';
import StaticPresentation from '../StaticPresentation/StaticPresentation';

function Presentations () {
  const dispatch = useDispatch();
  const presentations = useSelector(state => Object.values(state.presentations));
  
  useEffect(() => {
    dispatch(fetchPresentations());
    return () => dispatch(clearPresentationErrors());
  }, [dispatch])

  if (presentations.length === 0) return <div>There are no Presentations</div>;
  
  return (
    <>
    <div className='all-presentations-container'>
      <h2>All Presentations</h2>
      {presentations.map(presentation => (
        <>
          {/* <PresentationBox key={presentation._id} presentation={presentation} /> */}
          <div className='presentation-container'>
            <StaticPresentation presentation={presentation} />
          </div>
        </>
      ))}
    </div>
    </>
  );
}

export default Presentations;