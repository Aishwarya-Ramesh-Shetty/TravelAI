const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/:token', async (req, res) => {
  try {
    const trip = await Trip.findOne({ shareToken: req.params.token });
    if (!trip) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;