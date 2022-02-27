import React from 'react';
import { useHistory } from 'react-router-dom';
import { PlaylistPreview } from './PlaylistPreview';

export const Playlists = ({ playlists, header, page }) => {
  let history = useHistory();

  const openPlaylist = (playlistId) => {
    history.push(`/item/${playlistId}`);
  };

  return (
    <div className={`playlist ${page}`}>
      <div className="header">
        <h2>
          <a data-trans={header} onClick={() => history.push(`/genre/${header}`)} className="header-title-web">
            {header}
          </a>
          <a data-trans={header} className="header-title-mob">
            {header}
          </a>
        </h2>
        <p data-trans="see-all" onClick={() => history.push(`/genre/${header}`)}>
          see all
        </p>
      </div>
      <ul>
        {playlists &&
          playlists.length &&
          playlists.map((playlist) => (
            <PlaylistPreview playlist={playlist} key={playlist._id} openPlaylist={openPlaylist} />
          ))}
      </ul>
    </div>
  );
};
