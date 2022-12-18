const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const {
  getPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
  addReview,
} = require('./playlist.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth);
router.get('/', log, getPlaylists);
router.get('/:id', getPlaylistById);
// router.post('/', requireAuth, requireAdmin, addPlaylist);
// router.put('/:id', requireAuth, requireAdmin, updatePlaylist);
// router.delete('/:id', requireAuth, requireAdmin, removePlaylist)
router.post('/', addPlaylist);
router.put('/:id', updatePlaylist);
router.delete('/:id', removePlaylist);

module.exports = router;
