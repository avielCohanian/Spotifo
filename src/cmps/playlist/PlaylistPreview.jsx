import React from 'react';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';

export const PlaylistPreview = ({ playlist, openPlaylist }) => {
  return (
    <article className="playlist-preview" onClick={() => openPlaylist(playlist._id)}>
      <div className="img-container">
        {playlist.name !== 'Liked Songs' ? (
          <img src={playlist.imgUrl} alt="" />
        ) : (
          <img src={require('../../assets/img/heart.jpg')} alt="" />
        )}
        <span>
          <PlayArrowSharpIcon className="play" />
        </span>
      </div>
      <div className="txt-container">
        <a>{playlist.name}</a>
        <p>{playlist.description}</p>
      </div>
    </article>
  );
};
