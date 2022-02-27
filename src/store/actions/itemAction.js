import { playlistService } from '../../services/playlistService';
import { songService } from '../../services/songService';

export function loadItems() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().itemModule;
    try {
      const items = await playlistService.query(filterBy);
      dispatch({ type: 'SET_ITEMS', items });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadSongs() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().itemModule;
    try {
      const songs = await songService.query(filterBy);
      dispatch({ type: 'SET_SONGS', songs });
    } catch (err) {
      console.log(err);
    }
  };
}
export function updateItem(itemToUpdate) {
  return async (dispatch) => {
    try {
      const item = await playlistService.save(itemToUpdate);
      dispatch({ type: 'UPDATE_ITEM', item });
    } catch (err) {
      console.log(err);
    }
  };
}
export function addItem(itemToSave) {
  return async (dispatch) => {
    try {
      const item = await playlistService.save(itemToSave);
      dispatch({ type: 'ADD_ITEM', item });
      return item;
    } catch (err) {
      console.log(err);
    }
  };
}

export function setCurrSong(song) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_CURR_SONG', song });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setCurrPlaylist(playlist) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_CURR_PLAYLIST', playlist });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setGenrePlaylists(genrePlaylists) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_GENRE_PLAYLISTS', genrePlaylists });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeItem(itemId) {
  return async (dispatch) => {
    try {
      await playlistService.remove(itemId);
      dispatch({ type: 'REMOVE_ITEM', itemId });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy });
  };
}

export function getItemById(itemId) {
  return async () => {
    return await playlistService.getById(itemId);
  };
}
