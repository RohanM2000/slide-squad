import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <NavLink to={'/tweets'} className='link-nav'>All Tweets</NavLink>
          <NavLink to={'/profile'} className='link-nav'>Profile</NavLink>
          <NavLink to={'/tweets/new'} className='link-nav'>Write a Tweet</NavLink>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
            <NavLink to={'/signup'} className='link-auth'>Signup</NavLink>
            <NavLink to={'/login'} className='link-auth'>Login</NavLink>
          
        </div>
      );
    }
  }

  return (
    <>
      <div className='nav-wrapper'>
        <div className='nav-container'>
          <NavLink to={'/'} className='home-link'>
            <h1>SlideSquad</h1>
          </NavLink>
          { getLinks() }
        </div>

      </div>
    </>
  );
}

export default NavBar;