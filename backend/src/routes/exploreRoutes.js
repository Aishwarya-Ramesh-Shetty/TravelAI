const express = require("express");

const {
  getDestination,
} = require("../controllers/exploreController");

const router = express.Router();

router.get(
  "/:destination",
  getDestination
);

module.exports = router;