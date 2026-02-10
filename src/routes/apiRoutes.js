const express = require('express' );
const router = express.Router();

//Import Controller
const {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

const {
  getAllGuests,
  createGuest,
  getGuestById,
  updateGuest,
  deleteGuest,
} = require('../controllers/guestController');

//Routes
router.get('/rooms', getAllRooms);
router.post('/rooms', createRoom);
router.get('/rooms/:id', getRoomById);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

router.get('/guests', getAllGuests);
router.post('/guests', createGuest);
router.get('/guests/:id', getGuestById);
router.put('/guests/:id', updateGuest);
router.delete('/guests/:id', deleteGuest);

module.exports = router;