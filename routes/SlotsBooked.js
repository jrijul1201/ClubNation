const express = require("express");
const slotsbookedRouter = express.Router();
const Slot = require("../models/Slot");
const User = require("../models/User");

slotsbookedRouter.get("/slotsbooked", (req, res) => {
  console.log("Fetching booking details");
  Slot.find( { isBooked: { $in: [ "true"] } } ,(err, document) => {
    if (err) {
      console.log("booking details failed to fetch");
      res.status(500).json({
        message: { msgBody: "booking details failed to fetch", msgError: true },
      });
    } else {
      console.log("booking details fetched successfully");
      res.status(200).json({ slotsbooked: document });
    }
  });
});

module.exports = slotsbookedRouter;

 