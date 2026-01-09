const express = require('express');
const router = express.Router();
const { createNote, getMyNotes, getNoteById, updateNote, deleteNote, pinnedNote, getNoteStats } = require('../controllers/noteController');
const { protect } = require('../auth/authMiddleware');

router.post('/notes', protect, createNote);
router.get('/notes', protect, getMyNotes);
router.get('/notes/stats', protect, getNoteStats);
router.patch('/notes/:id/pin', protect, pinnedNote);
router.get('/notes/:id', protect, getNoteById);
router.put('/notes/:id', protect, updateNote);
router.delete('/notes/:id', protect, deleteNote);

module.exports = router;