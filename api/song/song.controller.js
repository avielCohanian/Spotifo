const songService = require('./song.service.js');
const logger = require('../../services/logger.service');

// GET LIST
async function getSongs(req, res) {
  try {
    var queryParams = req.query;
    const songs = await songService.query(queryParams);
    res.json(songs);
  } catch (err) {
    logger.error('Failed to get songs', err);
    res.status(500).send({ err: 'Failed to get songs' });
  }
}

// GET BY ID
async function getSongById(req, res) {
  try {
    const songId = req.params.id;
    const song = await songService.getById(songId);
    res.json(song);
  } catch (err) {
    logger.error('Failed to get song', err);
    res.status(500).send({ err: 'Failed to get song' });
  }
}

// POST (add song)
async function addSong(req, res) {
  try {
    const song = req.body;
    const addedSong = await songService.add(song);
    res.json(addedSong);
  } catch (err) {
    logger.error('Failed to add song', err);
    res.status(500).send({ err: 'Failed to add song' });
  }
}

// PUT (Update song)
async function updateSong(req, res) {
  try {
    const song = req.body;
    const updatedSong = await songService.update(song);
    res.json(updatedSong);
  } catch (err) {
    logger.error('Failed to update song', err);
    res.status(500).send({ err: 'Failed to update song' });
  }
}

// DELETE (Remove song)
async function removeSong(req, res) {
  try {
    const songId = req.params.id;
    const removedId = await songService.remove(songId);
    res.send(removedId);
  } catch (err) {
    logger.error('Failed to remove song', err);
    res.status(500).send({ err: 'Failed to remove song' });
  }
}

module.exports = {
  getSongs,
  getSongById,
  addSong,
  updateSong,
  removeSong,
};
