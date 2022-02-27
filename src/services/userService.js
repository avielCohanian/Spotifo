// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
import { httpService } from './http.service.js';
const AUTH_URL = process.env.NODE_ENV !== 'development' ? '/api/auth' : 'http://localhost:3030/api/auth';
const USER_URL = process.env.NODE_ENV !== 'development' ? '/api/user' : 'http://localhost:3030/api/user';
const STORAGE_KEY = 'loggedinUser';

export const userService = {
  signupGoogle,
  logInGoogle,
  logIn,
  logout,
  signup,
  updateUser,
  remove,
  changeFavoritePlaylist,
  getLoggedinUser,
  getUsers,
  changeFavoriteSong,
  updateUserBoard,
};

async function remove(userId) {
  try {
    return httpService.delete(`user/${userId}`);
  } catch (err) {
    console.log(err);
  }
}

function getUsers() {
  return httpService.get(`user/`, getUsers);
}

async function logInGoogle(user) {
  try {
    const loginUser = await httpService.post('auth/loginGoogle', user);
    console.log('loginUser', loginUser);
    if (loginUser) return _saveLocalUser(loginUser);
    return loginUser;
  } catch (err) {
    console.log(err);
  }
}
async function logIn(user) {
  try {
    const loginUser = await httpService.post('auth/login', user);
    console.log('loginUser', loginUser);
    if (loginUser) return _saveLocalUser(loginUser);
    return loginUser;
  } catch (err) {
    console.log(err);
  }
}
async function logout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    return await httpService.post('auth/logout');
  } catch (err) {
    console.log(err);
  }
}

async function signupGoogle(user) {
  try {
    const newUser = await httpService.post('auth/signupGoogle', user);
    console.log('newUser', newUser);
    return _saveLocalUser(newUser);
  } catch (err) {
    console.log(err);
  }
}
async function signup(user) {
  try {
    const newUser = await httpService.post('auth/signup', user);
    console.log('newUser', newUser);
    return _saveLocalUser(newUser);
  } catch (err) {
    console.log(err);
  }
}
async function updateUser(user) {
  try {
    const CurrUser = await httpService.put(`user/${user._id}`, user);
    if (getLoggedinUser()._id === CurrUser._id) _saveLocalUser(CurrUser);
    return CurrUser;
  } catch (err) {
    console.log(err);
  }
}
function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
}
async function getById(userId) {
  try {
    const user = await httpService.get(`user/${userId}`);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function changeFavoriteSong(song) {
  let user = getLoggedinUser();
  if (user.favorite.songs.some((s) => s === song.youtubeId)) {
    user.favorite.songs = user.favorite.songs.filter((s) => s !== song.youtubeId);
  } else user.favorite.songs.push(song.youtubeId);
  try {
    return await updateUser(user);
  } catch (err) {
    throw err;
  }
}

async function changeFavoritePlaylist(playlist) {
  let user = getLoggedinUser();
  if (user.favorite.playlists.some((s) => s._id === playlist._id)) {
    user.favorite.playlists = user.favorite.playlists.filter((s) => s._id !== playlist._id);
  } else user.favorite.playlists.push(playlist._id);
  try {
    return await updateUser(user);
  } catch (err) {
    throw err;
  }
}

async function updateUserBoard(update) {
  try {
    const user = await getById(update.userId);
    if (update.type) {
      user.boards.boards.push(update.boardId);
    } else {
      const idx = user.boards.boards.findIndex((board) => board === update.boardId);
      if (idx || idx === 0) {
        user.boards.boards.splice(idx, 1);
      } else {
        const idx = user.boards.starBoard.findIndex((board) => board === update.boardId);
        user.boards.starBoard.splice(idx, 1);
      }
    }
    console.log(user);
    return await updateUser(user);
  } catch (err) {
    throw err;
  }
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}
