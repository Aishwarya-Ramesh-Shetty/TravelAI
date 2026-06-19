const Trip = require('../models/Trip');
const ocrService = require('../services/ocrService');
const aiService = require('../services/aiService');
const { getPlaceImage } = require('../services/pexelsService');
const { v4: uuidv4 } = require('uuid');

exports.uploadAndExtract = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'No files uploaded'
      });
    }


    let combinedText = '';

    for (const file of req.files) {
      const text = await ocrService.processDocument(file);
      combinedText += ` ${text}`;
    }

    const extractedData =
      await aiService.extractDataFromText(combinedText);

    res.status(200).json(extractedData);


  } catch (error) {
    res.status(500).json({
      message: 'Extraction failed',
      error: error.message
    });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const {
      extractedData,
      destination,
      startDate,
      endDate
    } = req.body;


    const itinerary =
      await aiService.generateItinerary({
        destination,
        startDate,
        endDate,
        ...extractedData
      });

    // Attach images to activities
    if (itinerary.days && itinerary.days.length > 0) {
      for (const day of itinerary.days) {
        if (day.activities && day.activities.length > 0) {
          for (const activity of day.activities) {

            if (activity.placeName) {
              activity.imageUrl =
                await getPlaceImage(
                  activity.placeName,destination
                );
            } else {
              activity.imageUrl = null;
            }

          }
        }
      }
    }

    const trip = await Trip.create({
      user: req.user.id,
      destination,
      startDate,
      endDate,
      extractedData,
      itinerary,
      shareToken: uuidv4()
    });

    res.status(201).json(trip);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Itinerary generation failed',
      error: error.message
    });

  }
};

exports.getUserTrips = async (req, res) => {
  const trips = await Trip
    .find({ user: req.user.id })
    .sort('-createdAt');

  res.json(trips);
};

exports.getTripById = async (req, res) => {
  const trip = await Trip.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!trip) {
    return res.status(404).json({
      message: 'Trip not found'
    });
  }

  res.json(trip);
};
