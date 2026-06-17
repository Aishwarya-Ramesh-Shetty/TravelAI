const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  extractedData: {
    flights: Array,
    hotels: Array,
    transportation: Array
  },
  itinerary: {
    tripSummary: String,
    days: [{
      day: Number,
      title: String,
      activities: [{ time: String, activity: String }]
    }],
    travelTips: [String]
  },
  shareToken: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);