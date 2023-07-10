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
      <NavLink to={'/profile'} className='link-nav'>
      <i class="fa-solid fa-circle-user"></i>
      <p>{user.username}</p>

      </NavLink>
        
      </button>
    
        {/* <ul className="dropdown-content">
            <div className="links-nav">
            <NavLink to={'/profile'} className='link-nav'>Profile</NavLink>
            <NavLink to={`/likes/user/${user._id}`} className='link-nav'>Likes</NavLink>
            <NavLink to={'/presentations/compose'} className='link-nav'>Compose a Presentation</NavLink>
            <button onClick={logoutUser}>Logout</button>
            </div>
            {/* <li className="logout-button">
                <button onClick={logoutUser}>Log Out</button>
            </li> */}
        {/* </ul> */} 
  
    </div>
    <div className='compose-button'>
      <NavLink to={'/presentations/compose'} className='link-nav'>Compose</NavLink>
    </div>
    <div className='compose-button'>
      <NavLink to={`/likes/user/${user._id}`} className='link-nav'>{user.username}'s Likes</NavLink>
    </div>

    <div className='logout-button'>
     <button onClick={logoutUser} className='compose-button'>Logout</button>

    </div>
   
    </>
  );
}

export default ProfileButton;