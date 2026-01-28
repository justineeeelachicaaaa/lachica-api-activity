const express = require('express');
const router = express.Router();
const data = require('../models/roomModel');

// 1. GET (Read All with Filtering)
router.get('/rooms', (req, res) => {
    const { type, price, isBooked } = req.query;

    let filteredRooms = data.filter((room) => {
        return (
            (!type || room.type.toLowerCase() === type.toLowerCase()) &&
            (!price || room.price === parseFloat(price)) &&
            (isBooked === undefined || String(room.isBooked) === isBooked)
        );
    });

    if (filteredRooms.length === 0) {
        return res.status(404).json({
            status: 404,
            message: 'No rooms found matching the criteria',
        });
    }

    res.status(200).json({
        status: 200,
        message: 'Retrieved rooms successfully',
        data: filteredRooms,
    });
});

// 2. POST (Create)
router.post('/rooms', (req, res) => {
    const { type, price, isBooked, features } = req.body;

    // Validation
    if (!type || !price || isBooked === undefined) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: Type, Price, and IsBooked are required',
        });
    }

    const newItem = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 101, // Auto-increment ID based on last item
        type,
        price,
        isBooked,
        features: features || []
    };

    data.push(newItem);

    res.status(201).json({
        status: 201,
        message: 'Room created successfully',
        data: newItem,
    });
});

// 3. PUT (Update)
router.put('/rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Room with ID ${id} not found`,
        });
    }

    // Update the data preserving the ID
    data[index] = { id, ...req.body };

    res.status(200).json({
        status: 200,
        message: 'Room updated successfully',
        data: data[index],
    });
});

// 4. DELETE (Remove)
router.delete('/rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Room with ID ${id} not found`,
        });
    }

    data.splice(index, 1);

    res.status(203).json({
        status: 203,
        message: 'Room deleted successfully',
    });
});

module.exports = router;