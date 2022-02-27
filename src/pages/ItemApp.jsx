import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadItems, loadSongs, setGenrePlaylists } from '../store/actions/itemAction';

import { Playlists } from '../cmps/playlist/Playlists';
import { Loading } from '../cmps/global/Loading';
import { getLoggedinUser } from '../store/actions/userAction';
import { playlistService } from '../services/playlistService';

export const ItemApp = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.itemModule);
  const { currUser } = useSelector((state) => state.userModule);

  const [playlistsToShow, setPlaylistsToShow] = useState({});

  useEffect(() => {
    dispatch(loadItems());
    dispatch(loadSongs());
    dispatch(getLoggedinUser());
  }, []);

  useEffect(() => {
    userPlaylist();
    dataPlaylist();
  }, [items, currUser]);

  const dataPlaylist = () => {
    let genreMap = items.reduce((acc, item) => {
      if (!acc[item.genre]) acc[item.genre] = [item];
      else acc[item.genre].push(item);
      return acc;
    }, {});

    let dataPlaylist = [];
    for (const genre in genreMap) {
      dataPlaylist.push(<Playlists playlists={genreMap[genre]} page="item-app" header={genre} />);
    }

    dispatch(setGenrePlaylists(genreMap));
    setPlaylistsToShow(dataPlaylist);
  };

  const userPlaylist = async () => {
    // if (currUser) {
    //   let userPlaylist = [];
    //   for (let i = 0; i < currUser.yourPlaylist.length; i++) {
    //     const playlist = await playlistService.getById(currUser.yourPlaylist[i].pId);
    //     userPlaylist.push(playlist);
    //   }
    //   let userPlaylistToShow = [...playlistsToShow];
    //   console.log(userPlaylistToShow);
    //   userPlaylistToShow.push(<Playlists playlists={userPlaylist} page="item-app" header="Your Playlist" />);
    //   console.log(userPlaylistToShow);
    //   // dispatch(setGenrePlaylists(genreMap));
    //   setPlaylistsToShow([...userPlaylistToShow]);
    // }
  };

  return (
    <section className="item-app">
      <div className="color"></div>
      <div className="playlists-container">
        {playlistsToShow && playlistsToShow.length ? (
          playlistsToShow.map((p, idx) => <article key={idx}>{p}</article>)
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};
