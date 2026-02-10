const Guest = require('../models/guestModel');


//GET ALL
const getAllGuests = async (req, res) => {
    try {
        const guests = await Guest.find();
        res.status(200).json(guests);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//CREATE
const createGuest = async (req, res) => {
    try {
        const newGuest = await Guest.create(req.body);
        res.status(201).json(newGuest);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//GET ONE 
const getGuestById = async (req, res) => {
    try {
        const guest = await Guest.findById(req.params.id);
        if(!guest) return res.status(404).json({ message: 'Guest not found'});
        res.status(200).json(guest);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//UPDATE
const updateGuest = async (req, res) => {
    try {
        const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if(!guest) return res.status(404).json({ message: 'Guest not found'}); 
        res.status(200).json(guest);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//DELETE 
const deleteGuest = async (req, res) => {
    try {
        const guest = await Guest.findByIdAndDelete(req.params.id);
        if(!guest) return res.status(404).json({ message: 'Guest not found'}); 
        res.status(200).json({message: 'Guest deleted successfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    getAllGuests,
    createGuest,
    getGuestById,
    updateGuest,
    deleteGuest,
};