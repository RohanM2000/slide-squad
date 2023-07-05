import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import PresentationCompose from './components/Presentations/PresentationCompose';
import { getCurrentUser } from './store/session';
import Presentations from './components/Presentations/Presentations';
import StaticPresentation from './components/StaticPresentation/StaticPresentation';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
    
  return loaded && (
    <>
    <div className='app-container'>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/presentations" component={Presentations} />
        <ProtectedRoute exact path="/presentations/compose" component={PresentationCompose} />
        <ProtectedRoute exact path="/presentations/compose-static-test" component={StaticPresentation} />
      </Switch>
    </div>
    </>
  );
}

export default App;