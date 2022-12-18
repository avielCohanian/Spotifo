const playlistService = require('./playlist.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getPlaylists(req, res) {
  try {
    var queryParams = req.query;
    const playlists = await playlistService.query(queryParams);
    res.json(playlists);
  } catch (err) {
    logger.error('Failed to get playlists', err);
    res.status(500).send({ err: 'Failed to get playlists' });
  }
}

// GET BY ID
async function getPlaylistById(req, res) {
  try {
    const playlistId = req.params.id;
    const playlist = await playlistService.getById(playlistId);
    res.json(playlist);
  } catch (err) {
    logger.error('Failed to get playlist', err);
    res.status(500).send({ err: 'Failed to get playlist' });
  }
}

// POST (add playlist)
async function addPlaylist(req, res) {
  try {
    const playlist = req.body;
    const addedPlaylist = await playlistService.add(playlist);
    res.json(addedPlaylist);
  } catch (err) {
    logger.error('Failed to add playlist', err);
    res.status(500).send({ err: 'Failed to add playlist' });
  }
}

// PUT (Update playlist)
async function updatePlaylist(req, res) {
  try {
    const playlist = req.body;
    let songs = playlist.songs.map((s) => s.youtubeId);
    const updatedPlaylist = await playlistService.update({ ...playlist, songs });
    res.json(updatedPlaylist);
  } catch (err) {
    logger.error('Failed to update playlist', err);
    res.status(500).send({ err: 'Failed to update playlist' });
  }
}

// DELETE (Remove playlist)
async function removePlaylist(req, res) {
  try {
    const playlistId = req.params.id;
    const removedId = await playlistService.remove(playlistId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to remove playlist', err);
    res.status(500).send({ err: 'Failed to remove playlist' });
  }
}

module.exports = {
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
};
