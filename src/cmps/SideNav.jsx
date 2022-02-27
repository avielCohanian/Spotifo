import React, { useEffect } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';

import { setLang } from '../services/i18nService';

import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { playlistService } from '../services/playlistService';
import { loadItems, saveItem } from '../store/actions/itemAction';
import { getLoggedinUser } from '../store/actions/userAction';

export const SideNav = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { currUser } = useSelector((state) => state.userModule);
  const { items } = useSelector((state) => state.itemModule);

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, []);

  const onSetLang = ({ target }) => {
    const lang = target.value;
    setLang(lang);
  };

  const playlistMove = async (playlistName) => {
    let playlist = items.find((i) => i.name === playlistName);
    if (!playlist) {
      await dispatch(loadItems());
      playlist = items.find((i) => i.name === playlistName);
    }
    // if (!playlist) {
    //   let newPlaylist = playlistService.getEmptyPlaylist();
    //   newPlaylist.name = playlistName;
    //   newPlaylist.description = playlistName;
    //   dispatch(saveItem(newPlaylist));
    // }
    history.push(`/item/${playlist._id}`);
  };
  const playlistMoveTo = async (currPlaylist) => {
    history.push(`/item/${currPlaylist.pId}`);
  };

  return (
    <section className="side-nav">
      <div className="side-container">
        <Link className="nav-icon" to="/">
          <img src={require('../assets/img/SpotifyLogo.svg').default} alt="" />
        </Link>

        <select id="inputState" className="form-control-xsm" onChange={(ev) => onSetLang(ev)}>
          <option value="en">English</option>
          <option value="he">עברית</option>
          <option value="es">Spanish</option>
        </select>

        <ul>
          <NavLink className={` ${location.pathname === '/item' ? 'active-txt' : ''}`} to="/item">
            {location.pathname === '/item' ? (
              <HomeIcon className="home icon" />
            ) : (
              <img src={require('../assets/img/home.svg').default} alt="" />
            )}
            <span className="txt" data-trans="home">
              Home
            </span>
          </NavLink>
          <NavLink className={` ${location.pathname === '/search' ? 'active-txt' : ''}`} to="/search">
            <SearchIcon className="search icon" />
            <span className="txt" data-trans="search">
              Search
            </span>
          </NavLink>
          <NavLink className={` ${location.pathname === '/lib' ? 'active-txt' : ''}`} to="/item">
            <img src={require('../assets/img/Library.svg').default} alt="" />
            <span className="txt" data-trans="your-library">
              Your library
            </span>
          </NavLink>
          <br />
          <NavLink to="/editItem">
            <span className="add-container">
              <AddIcon className="add" />
            </span>
            <span data-trans="create-a-playlist" className={`txt ${location.pathname === '/' ? 'active-txt' : ''}`}>
              Create a playlist
            </span>
          </NavLink>
          <a onClick={() => playlistMove('Liked Songs')}>
            <span className="add-container liked">
              <FavoriteSharpIcon className="favorite" />
            </span>
            <span data-trans="liked-songs" className={`txt ${location.pathname === '/' ? 'active-txt' : ''}`}>
              Liked Songs
            </span>
          </a>
          {currUser && currUser.yourPlaylist && currUser.yourPlaylist.length
            ? currUser.yourPlaylist.map((playlist, idx) => (
                <a key={idx} onClick={() => playlistMoveTo(playlist)}>
                  <span className="add-container liked">
                    <img src={playlist.img} alt="" />
                    {/* <FavoriteSharpIcon className="favorite" /> */}
                  </span>
                  <span className={`txt ${location.pathname === '/' ? 'active-txt' : ''}`}>{playlist.name}</span>
                </a>
              ))
            : null}
        </ul>
      </div>
    </section>
  );
};
