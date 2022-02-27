const INITIAL_STATE = {
  items: [],
  songs: [],
  genrePlaylists: {},
  currSong: {},
  currPlaylist: {},
  filterBy: null,
};

export function itemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: [...action.items],
      };
    case 'SET_SONGS':
      return {
        ...state,
        songs: [...action.songs],
      };

    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.itemId),
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) => (item._id === action.item._id ? action.item : item)),
      };
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: action.filterBy,
      };
    case 'SET_CURR_SONG':
      return {
        ...state,
        currSong: { ...action.song },
      };
    case 'SET_CURR_PLAYLIST':
      return {
        ...state,
        currPlaylist: { ...action.playlist },
      };
    case 'SET_GENRE_PLAYLISTS':
      return {
        ...state,
        genrePlaylists: { ...action.genrePlaylists },
      };

    default:
      return state;
  }
}
