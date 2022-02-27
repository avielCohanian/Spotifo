import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useForm } from '../hooks/useForm';
import { logIn, logInGoogle, LogOut, SignUp, SignUpGoogle } from '../store/actions/userAction';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { clientId } from '../secreat.js';

export const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoginBtnShow, setIsLoginBtnShow] = useState(true);

  const [user, handleChange] = useForm({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const isSignUp = props.match.params.status ? true : false;
    setIsLogin(isSignUp);
  }, [props]);

  const save = async (ev) => {
    ev.preventDefault();
    console.log(user);
    const currUser = isLogin ? await dispatch(SignUp(user)) : await dispatch(logIn(user));
    if (currUser) {
      history.push('/item');
    }
  };

  const onSuccess = async (res) => {
    console.log(res.profileObj);
    const user = { email: res.profileObj.email, username: res.profileObj.name, password: res.profileObj.googleId };
    const currUser = isLogin ? await dispatch(SignUpGoogle(user)) : await dispatch(logInGoogle(user));
    if (currUser) {
      setIsLoginBtnShow(false);
      history.push('/item');
    }
  };
  const onFailure = (res) => {
    console.log(res);
  };
  const logout = async (res) => {
    console.log(res);
    setIsLoginBtnShow(true);
    await dispatch(LogOut());
  };

  return (
    <section className="login-signup">
      <h1>{isLogin ? 'Sign up' : 'Login'}</h1>
      <form className="simple-form">
        {isLogin ? (
          <section className="input-container">
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              onChange={handleChange}
              value={user.username}
              placeholder="Name"
              id="username"
              name="username"
              title="Name"
            />
          </section>
        ) : null}
        <section className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={handleChange}
            value={user.email}
            placeholder="Email"
            id="email"
            name="email"
            title="Email"
          />
        </section>
        <section className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={handleChange}
            value={user.password}
            placeholder="Password"
            id="password"
            name="password"
            title="Password"
          />
        </section>
        <button onClick={save} className="simple-button">
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </form>
      {isLoginBtnShow ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logout}></GoogleLogout>
      )}
    </section>
  );
};
