const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const { getSongs, getSongById, addSong, updateSong, removeSong, addReview } = require('./song.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth);
router.get('/', log, getSongs);
router.get('/:id', getSongById);
// router.post('/', requireAuth, requireAdmin, addSong);
// router.put('/:id', requireAuth, requireAdmin, updateSong);
// router.delete('/:id', requireAuth, requireAdmin, removeSong)
router.post('/', addSong);
router.put('/:id', updateSong);
router.delete('/:id', removeSong);

module.exports = router;
