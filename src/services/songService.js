import { httpService } from './http.service';

export const songService = {
  query,
  save,
  remove,
  getById,
  getEmptySong,
};

// Get songs from data
function query(filterBy) {
  return httpService.get(`song`, filterBy);
}

// Save
async function save(song) {
  const songToSave = song._id ? await httpService.put(`song/ ${song._id}`, song) : await httpService.post('song', song);
  return songToSave;
}

// Remove
function remove(id) {
  return httpService.delete(`song/${id}`);
}

// Get song by id
async function getById(id) {
  const song = await httpService.get(`song/${id}`);
  return song;
}

function getEmptySong() {
  return {
    youtubeId: '',
    title: '',
    imgUrl: '',
    duration: '',
    createdAt: '',
  };
}
