import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Playlists } from '../cmps/playlist/Playlists';

export const Genre = (props) => {
  const { genrePlaylists } = useSelector((state) => state.itemModule);
  const [playlistGenre, setPlaylistGenre] = useState([]);

  useEffect(() => {
    const currGenre = props.match.params.id;
    setPlaylistGenre(genrePlaylists[currGenre]);
  }, [genrePlaylists]);

  return (
    <div className="genre">
      <Playlists page="genre-page" playlists={playlistGenre} header={props.match.params.id}></Playlists>
    </div>
  );
};
