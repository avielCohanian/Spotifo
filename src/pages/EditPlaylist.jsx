import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { playlistService } from '../services/playlistService';
import { getLoggedinUser, updateUser, userFavoriteSong } from '../store/actions/userAction';
import { useInput } from '../hooks/useInput ';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import { SongList } from '../cmps/song/SongList';
import { addItem, loadSongs, setFilterBy } from '../store/actions/itemAction';
import { debounce } from '../services/utilService';

export const EditPlaylist = () => {
  const { currUser } = useSelector((state) => state.userModule);
  const { filterBy } = useSelector((state) => state.itemModule);
  const { songs } = useSelector((state) => state.itemModule);
  const search = useInput('');

  const dispatch = useDispatch();

  const [songsToShow, setSongsToShow] = useState([]);
  const [playlist, setPlaylist] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const playlistName = useInput('My Playlist#');
  const textarea = useInput('no description');
  const genre = useInput('');
  const tags = useInput('');
  const tagsToShow = ['Love', 'Happy', 'Sad', 'Chill', 'Curious', 'Original', 'Fantastic', 'Cool'];
  const genresToShow = ['Easy', 'Electronic', 'Hip Hop', 'Israeli', 'Pop', 'Rock'];

  useEffect(() => {
    setPlaylist(playlistService.getEmptyPlaylist());
  }, []);

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, []);

  useEffect(() => {
    if (!filterBy) return setSongsToShow([]);
    if (!songs.length) dispatch(loadSongs());
    let songsFilter = songs.filter((s) => {
      return s.title.toLowerCase().includes(filterBy.toLowerCase());
    });
    setSongsToShow(songsFilter);
  }, [songs, filterBy]);

  useEffect(() => {
    setSearch(search.value);
  }, [search]);

  const setSearch = debounce((search) => {
    dispatch(setFilterBy(search));
  }, 350);

  const upload = (ev) => {
    let reader = new FileReader();
    reader.onload = (event) => setPlaylist({ ...playlist, imgUrl: event.target.result });
    reader.readAsDataURL(ev.target.files[0]);
  };

  const save = (ev) => {
    ev.preventDefault();
    let playlistToSave = {
      ...playlist,
      name: playlistName.value,
      description: textarea.value,
      tags: [tags.value],
      genre: genre.value,
      createdBy: currUser ? { username: currUser.username, uId: currUser._id } : {},
    };
    setPlaylist(playlistToSave);
    setIsOpen(false);
  };

  const toggleFavorite = (song) => {
    dispatch(userFavoriteSong(song));
  };

  const create = async () => {
    if (!playlist.songs.length) return;
    let playlistToSave = playlist;
    playlistToSave.createdAt = Date.now();
    let playlistSaved = await dispatch(addItem(playlistToSave));
    let userToSave = { ...currUser };
    userToSave.yourPlaylist.push({
      pId: playlistSaved.ops[0]._id,
      name: playlistToSave.name,
      img: playlistToSave.imgUrl,
      description: playlistToSave.description,
    });
    dispatch(updateUser({ ...userToSave }));
  };

  const selectSong = (song) => {
    let currPlaylist = playlist;
    if (currPlaylist.songs.some((s) => s === song.youtubeId)) {
      currPlaylist.songs.filter((s) => s !== song.youtubeId);
    } else currPlaylist.songs.push(song.youtubeId);
    setPlaylist({ ...currPlaylist });
  };

  return (
    <>
      {!isOpen ? (
        <section className="edit-playlist">
          <header>
            <div className="edit-img-container">
              <img src={playlist.imgUrl} alt="" />
              <p>Click to add image or drag it here </p>
            </div>
            <div className="header-details">
              <span className=" edit-icon pointer" onClick={() => setIsOpen(!isOpen)}>
                <EditSharpIcon />
              </span>
              <h1>{playlist.name ? playlist.name : 'My Playlist'}</h1>
              <h3>{playlist.description ? playlist.description : 'Description'}</h3>
              {playlist.tags && playlist.tags.length ? (
                <h4>
                  <b> Tags: </b>
                  {playlist.tags.map((t, idx) => (
                    <span key={idx}>{t} </span>
                  ))}
                </h4>
              ) : null}
              <h4 className="created">
                <span> {currUser.username} </span>
                <button onClick={create}> CREATE </button>
              </h4>
            </div>
          </header>
          <div className="options">
            <MoreHorizIcon className="more-horiz" />
          </div>
          <hr />
          <section className="search-edit">
            <h2 className="search-title">Let's find something for your playlist</h2>
            <label>
              <SearchIcon className="search-icon" />
              <input type="text" {...search} />
            </label>

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
        </section>
      ) : (
        <form className="modal-wrapper">
          <section className="modal-content">
            <section className="head">
              <h1>Edit Details</h1>
              <a onClick={() => setIsOpen(!isOpen)}>X</a>
            </section>
            <section className="edit-container">
              <label htmlFor="file">
                <div className="edit-img-container">
                  <input id="file" name="file" type="file" accept="image/*" onChange={upload} hidden />
                  <img src={playlist.imgUrl} alt="" />
                  <p>Click to add image or drag it here </p>
                </div>
              </label>
              <div className="input-container">
                <input type="text" placeholder="Playlist name" {...playlistName} />
                <div className="select-container">
                  <select {...tags}>
                    <option>Choose Tags </option>
                    {tagsToShow.map((tag, idx) => (
                      <option key={idx} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                  <select {...genre}>
                    <option>Genre </option>
                    {genresToShow.map((genre, idx) => (
                      <option key={idx} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea placeholder="Description" cols="30" rows="10" {...textarea}></textarea>
              </div>
            </section>
            <div className="footer-modal">
              <div className="save-container">
                <h3>Tags:{tags.value} </h3>
                <button onClick={save}>SAVE</button>
              </div>
              <p>
                By proceeding, you agree to give Patefon access to the image you choose to upload. Please make sure you
                have the right to upload the image.
              </p>
            </div>
          </section>
        </form>
      )}
    </>
  );
};
