const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const tripController = require('../controllers/tripController');
const { protect } = require('../middleware/auth');
const Trip = require('../models/Trip');
const { generateTripPDF } = require('../services/pdfService');

router.use(protect);
router.get(
    "/place-details",
    protect,
    tripController.getPlaceDetails
);
router.post('/upload', upload.array('docs'), tripController.uploadAndExtract);
router.post('/generate', tripController.createTrip);
router.get('/', tripController.getUserTrips);

router.get('/:id', tripController.getTripById);
router.delete('/:id', async (req, res) => {
    await Trip.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.status(204).send();
});

router.get('/:id/pdf', async (req, res) => {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).send('Not found');
    res.setHeader('Content-Type', 'application/pdf');
    generateTripPDF(trip, res);
});



module.exports = router;