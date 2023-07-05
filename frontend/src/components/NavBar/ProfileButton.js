import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import './NavBar.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();


  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
    <div className="profile-dropdown">
      <button className="profile-button">
    
          <span className="user-greeting">Hi, {user.username}</span>
        
      </button>
    
        <ul className="dropdown-content">
            <div className="links-nav">
            <NavLink to={'/profile'} className='link-nav'>Profile</NavLink>
            <NavLink to={'/presentations/likes'} className='link-nav'>Likes</NavLink>
            <NavLink to={'/presentations/compose'} className='link-nav'>Compose a Presentation</NavLink>
            <button onClick={logoutUser}>Logout</button>
            </div>
            {/* <li className="logout-button">
                <button onClick={logoutUser}>Log Out</button>
            </li> */}
        </ul>
  
    </div>
    </>
  );
}

export default ProfileButton;