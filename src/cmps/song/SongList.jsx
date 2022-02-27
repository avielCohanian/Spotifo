import React from 'react';
import { SongPreview } from './SongPreview';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const SongList = ({ songs, playlistName, selectSong, toggleFavorite, favoriteSong }) => {
  return (
    <>
      <ul className="song-list">
        <div className="list-title">
          {playlistName ? (
            <div className="title-container">
              <AccessTimeIcon className="clock" />
              {playlistName ? <p data-trans="date-added">Date added</p> : <p></p>}
              {playlistName ? <p data-trans="album">album</p> : <p></p>}
              <p data-trans="title">title #</p>
            </div>
          ) : null}
          <span></span>
        </div>
        {songs.map((song, idx) => (
          <SongPreview
            song={song}
            key={song + idx}
            songNum={idx + 1}
            playlistName={playlistName}
            selectSong={selectSong}
            toggleFavorite={toggleFavorite}
            favoriteSong={favoriteSong}
          ></SongPreview>
        ))}
      </ul>
    </>
  );
};
