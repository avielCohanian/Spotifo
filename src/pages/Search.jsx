import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getItemById, loadItems, loadSongs, setCurrPlaylist, setCurrSong } from '../store/actions/itemAction';
import { userFavoriteSong } from '../store/actions/userAction';

import { SongList } from '../cmps/song/SongList';

export const Search = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { currUser } = useSelector((state) => state.userModule);
  const { filterBy } = useSelector((state) => state.itemModule);
  const { items } = useSelector((state) => state.itemModule);
  const { songs } = useSelector((state) => state.itemModule);

  const [playlists, setPlaylists] = useState(items);
  const [songsToShow, setSongsToShow] = useState([]);

  useEffect(() => {
    if (!items || !items.length) {
      dispatch(loadItems());
    }
    if (!songs || !songs.length) {
      dispatch(loadSongs());
    }
  }, []);

  useEffect(() => {
    if (!filterBy) return setPlaylists(items);
    let playlistFilter = items.filter((p) => {
      return (
        p.name.toLowerCase().includes(filterBy.toLowerCase()) || p.genre.toLowerCase().includes(filterBy.toLowerCase())
      );
    });
    setPlaylists(playlistFilter);
  }, [items, filterBy]);

  useEffect(() => {
    if (!filterBy) return setSongsToShow([]);
    let songsFilter = songs.filter((s) => {
      return s.title.toLowerCase().includes(filterBy.toLowerCase());
    });
    setSongsToShow(songsFilter);
  }, [songs, filterBy]);

  const toggleFavorite = (song) => {
    dispatch(userFavoriteSong(song));
  };

  const openPlaylist = (playlistId) => {
    history.push(`/item/${playlistId}`);
  };

  const selectSong = async (song) => {
    dispatch(setCurrSong(song));
    let currPlaylist = items.find((i) => i.songs.some((s) => s === song.youtubeId));
    currPlaylist = await dispatch(getItemById(currPlaylist._id));
    dispatch(setCurrPlaylist(currPlaylist));
  };

  return (
    <section className="search-page">
      <ul className="playlist-search">
        {playlists.map((playlist, idx) => (
          <li key={idx} onClick={() => openPlaylist(playlist._id)}>
            <h2>{playlist.name}</h2>
            <img src={playlist.imgUrl} alt="" />
          </li>
        ))}
      </ul>
      {songsToShow.length ? (
        <div className="song-search">
          <SongList
            songs={songsToShow.length > 100 ? songsToShow.slice(0, 100) : songsToShow}
            playlistName=""
            selectSong={selectSong}
            toggleFavorite={toggleFavorite}
            favoriteSong={currUser.favorite?.songs || []}
          />
        </div>
      ) : null}
    </section>
  );
};
