const express = require('express');
const router = express.Router();
 // Import controllers here...
const { protect, authorize } = require('../middleware/authMiddleware');
const { getAllRooms, createRoom } = require('../controllers/roomController');

 // ANYONE can get dishes
router.get('/', getAllRooms);
 // ONLY Admins and Managers can create dishes
router.post('/', protect, authorize('admin', 'manager'), createRoom);

module.exports = router;