import React from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Moment from 'react-moment';

export const SongPreview = ({ song, songNum, playlistName, selectSong, toggleFavorite, favoriteSong }) => {
  const favorite = (ev) => {
    ev.stopPropagation();
    toggleFavorite(song);
  };

  return (
    <div className="song-preview" onClick={() => selectSong(song)}>
      <div className="time-container">
        <MoreHorizIcon className="more-horiz" />
        <b>{song.duration}</b>
        {favoriteSong && favoriteSong.some((f) => f === song.youtubeId) ? (
          <FavoriteSharpIcon className="heart favorite" onClick={(ev) => favorite(ev)} />
        ) : (
          <FavoriteBorderIcon className="heart" onClick={(ev) => favorite(ev)} />
        )}
      </div>
      {playlistName ? (
        <Moment className="time" fromNow>
          {song.createdAt}
        </Moment>
      ) : (
        <p></p>
      )}
      <a className="playlist-name">{playlistName}</a>

      <div className="title-container">
        <div className="title">
          <MoreHorizIcon className="title-more-horiz" />
          <span>
            <h2>{song.title}</h2>
            <a className="title-playlist-name">{playlistName}</a>
          </span>
          <img src={song.imgUrl} alt="" />
        </div>

        <div className="idx-container">
          <span className="song-idx">{songNum}</span>
          <ArrowRightIcon className="arrow-right" />
        </div>
      </div>
    </div>
  );
};
