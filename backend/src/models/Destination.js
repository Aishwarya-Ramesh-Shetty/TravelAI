const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    bestTimeToVisit: {
      type: String,
    },

    currency: {
      type: String,
    },

    language: {
      type: String,
    },

    travelTips: {
      type: [String],
      default: [],
    },

    topAttractions: [
      {
        name: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Destination",
  destinationSchema
);