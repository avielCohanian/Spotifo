const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

const songService = require('../song/song.service.js');

async function query(filterBy) {
  try {
    // const criteria = _buildCriteria(filterBy)
    const criteria = {};
    const collection = await dbService.getCollection('playlist');
    var playlists = await collection.find(criteria).toArray();
    return playlists;
  } catch (err) {
    logger.error('cannot find playlists', err);
    throw err;
  }
}

async function getById(playlistId) {
  try {
    const collection = await dbService.getCollection('playlist');
    const playlist = await collection.findOne({ _id: ObjectId(playlistId) });

    for (let i = 0; i < playlist.songs.length; i++) {
      playlist.songs[i] = await songService.getById(playlist.songs[i]);
    }
    return playlist;
  } catch (err) {
    logger.error(`while finding playlist ${playlistId}`, err);
    throw err;
  }
}

async function remove(playlistId) {
  try {
    const collection = await dbService.getCollection('playlist');
    await collection.deleteOne({ _id: ObjectId(playlistId) });
    return playlistId;
  } catch (err) {
    logger.error(`cannot remove playlist ${playlistId}`, err);
    throw err;
  }
}

async function add(playlist) {
  try {
    const collection = await dbService.getCollection('playlist');
    const addedPlaylist = await collection.insertOne(playlist);
    return addedPlaylist;
  } catch (err) {
    logger.error('cannot insert playlist', err);
    throw err;
  }
}
async function update(playlist) {
  try {
    var id = ObjectId(playlist._id);
    // delete playlist._id;
    playlist._id = id;
    const collection = await dbService.getCollection('playlist');
    await collection.updateOne({ _id: id }, { $set: { ...playlist } });
    return playlist;
  } catch (err) {
    logger.error(`cannot update playlist ${playlistId}`, err);
    throw err;
  }
}

function _buildCriteria(filterBy) {}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
};
