import { httpService } from './http.service';
import { songService } from './songService';

export const playlistService = {
  query,
  save,
  remove,
  getById,
  getEmptyPlaylist,
};

// Get playlist from data
function query(filterBy) {
  return httpService.get(`playlist`, filterBy);
}

// Save
async function save(playlist) {
  const playlistToSave = playlist._id
    ? await httpService.put(`playlist/ ${playlist._id}`, playlist)
    : await httpService.post('playlist', playlist);
  return playlistToSave;
}

// remove
function remove(id) {
  return httpService.delete(`playlist/${id}`);
}

// Get playlist by id
async function getById(id) {
  const playlist = await httpService.get(`playlist/${id}`);
  return playlist;
}

function getEmptyPlaylist() {
  return {
    name: '',
    description: '',
    imgUrl: require('../assets/img/music.png'),
    tags: [],
    genre: '',
    createdBy: {},
    songs: [],
  };
}
