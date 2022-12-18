const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy) {
  try {
    // const criteria = _buildCriteria(filterBy)
    const criteria = {};
    const collection = await dbService.getCollection('song');
    var songs = await collection.find(criteria).toArray();
    return songs;
  } catch (err) {
    logger.error('cannot find songs', err);
    throw err;
  }
}

async function getById(songId) {
  try {
    const collection = await dbService.getCollection('song');
    // const song = collection.findOne({ _id: ObjectId(songId) });
    const song = collection.findOne({ youtubeId: songId });
    return song;
  } catch (err) {
    logger.error(`while finding song ${songId}`, err);
    throw err;
  }
}

async function remove(songId) {
  try {
    const collection = await dbService.getCollection('song');
    await collection.deleteOne({ _id: ObjectId(songId) });
    return songId;
  } catch (err) {
    logger.error(`cannot remove song ${songId}`, err);
    throw err;
  }
}

async function add(song) {
  try {
    const collection = await dbService.getCollection('song');
    const addedSong = await collection.insertOne(song);
    return addedSong;
  } catch (err) {
    logger.error('cannot insert song', err);
    throw err;
  }
}
async function update(song) {
  try {
    var id = ObjectId(song._id);
    // delete song._id;
    song._id = id;
    const collection = await dbService.getCollection('song');
    await collection.updateOne({ _id: id }, { $set: { ...song } });
    return song;
  } catch (err) {
    logger.error(`cannot update song ${songId}`, err);
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
