import { userService } from '../../services/userService';

export function logIn(user) {
  return async (dispatch) => {
    try {
      const currUser = await userService.logIn(user);
      dispatch({ type: 'SET_LOGIN_USER', currUser });
      return currUser;
    } catch (err) {
      console.log(err);
    }
  };
}
export function logInGoogle(user) {
  return async (dispatch) => {
    try {
      const currUser = await userService.logInGoogle(user);
      dispatch({ type: 'SET_LOGIN_USER', currUser });
      return currUser;
    } catch (err) {
      console.log(err);
    }
  };
}
export function SignUpGoogle(user) {
  return async (dispatch) => {
    try {
      const currUser = await userService.signupGoogle(user);
      dispatch({ type: 'SET_LOGIN_USER', currUser });
      return currUser;
    } catch (err) {
      console.log(err);
    }
  };
}
export function SignUp(user) {
  return async (dispatch) => {
    try {
      const currUser = await userService.signup(user);
      dispatch({ type: 'SET_LOGIN_USER', currUser });
      return currUser;
    } catch (err) {
      console.log(err);
    }
  };
}

export function LogOut() {
  return async (dispatch) => {
    try {
      const currUser = await userService.logout();
      dispatch({ type: 'SET_LOGIN_USER', currUser: null });
      return currUser;
    } catch (err) {
      console.log(err);
    }
  };
}

export function userFavoriteSong(song) {
  return async (dispatch) => {
    try {
      const currUser = await userService.changeFavoriteSong(song);
      dispatch({ type: 'SET_LOGIN_USER', currUser });
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateUser(user) {
  return async (dispatch) => {
    try {
      const currUser = await userService.updateUser(user);
      dispatch({ type: 'SET_LOGIN_USER', currUser });
    } catch (err) {
      console.log(err);
    }
  };
}

export function userFavoritePlaylist(playlist) {
  return async (dispatch) => {
    try {
      const currUser = await userService.changeFavoritePlaylist(playlist);
      dispatch({ type: 'SET_LOGIN_USER', currUser });
    } catch (err) {
      console.log(err);
    }
  };
}
export function getLoggedinUser() {
  return async (dispatch) => {
    try {
      const currUser = await userService.getLoggedinUser();
      dispatch({ type: 'SET_LOGIN_USER', currUser });
    } catch (err) {
      console.log(err);
    }
  };
}
