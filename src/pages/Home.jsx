import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logIn } from '../store/actions/userAction';

export const Home = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    const user = {
      username: 'yosi',
      password: '123',
    };
    dispatch(logIn(user));
  };

  return (
    <div className="home-page">
      <h1>Welcome</h1>
      <Link to="/item" onClick={signIn} className="home-btn-container">
        <p className="outline-button home-btn">Try Demo</p>
      </Link>
      <div className="login-signup-container">
        <Link to="/login" className="login-btn pointer simple-button">
          <p>Login</p>
        </Link>
        <span>or</span>
        <Link to="/login/signUp" className="signup-btn pointer simple-button">
          <p>SignUp</p>
        </Link>
      </div>
    </div>
  );
};
