import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getItemById, setCurrPlaylist, setCurrSong } from '../store/actions/itemAction';
import { getLoggedinUser, userFavoriteSong } from '../store/actions/userAction';

import { SongList } from '../cmps/song/SongList';
import { Loading } from '../cmps/global/Loading';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { songService } from '../services/songService';

export const ItemDetails = (props) => {
  const { currUser } = useSelector((state) => state.userModule);

  const [playlist, setPlaylist] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    loadItem();
    dispatch(getLoggedinUser());
  }, [props.match.params.id]);

  const loadItem = async () => {
    let playlist = await dispatch(getItemById(props.match.params.id));
    if (playlist.name === 'Liked Songs') {
      for (let i = 0; i < currUser.favorite.songs.length; i++) {
        let song = await songService.getById(currUser.favorite.songs[i]);
        playlist.songs.push(song);
      }
    }
    setPlaylist(playlist);
  };

  const selectSong = (song) => {
    dispatch(setCurrSong(song));
    dispatch(setCurrPlaylist(playlist));
  };

  const toggleFavorite = (song) => {
    dispatch(userFavoriteSong(song));
  };

  if (!playlist) return <Loading />;
  return (
    <section className="playlist-details">
      <header>
        {playlist.name !== 'Liked Songs' ? (
          <img src={playlist.imgUrl} alt="" />
        ) : (
          <img src={require('../assets/img/heart.jpg')} alt="" />
        )}
        <div className="header-details">
          <h1>{playlist.name}</h1>
          <h3>{playlist.description}</h3>
          {playlist.tags && playlist.tags.length ? (
            <h4>
              <b> Tags: </b>
              {playlist.tags.map((t, idx) => (
                <span key={idx}>{t} </span>
              ))}
            </h4>
          ) : null}
        </div>
      </header>
      <div className="playlist-menu">
        <MoreHorizIcon className="more-horiz" />
        <FavoriteBorderIcon className="favorite-border" />
        <button onClick={() => selectSong(playlist.songs[0])}>
          <ArrowRightIcon className="arrow-right" />
        </button>
      </div>
      <SongList
        songs={playlist.songs}
        playlistName={playlist.name}
        selectSong={selectSong}
        toggleFavorite={toggleFavorite}
        favoriteSong={currUser?.favorite?.songs}
      />
    </section>
  );
};
