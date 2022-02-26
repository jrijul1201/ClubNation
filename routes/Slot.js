const express = require("express");
const slotRouter = express.Router();
const passport = require("passport");

const Slot = require("../models/Slot");

slotRouter.post("/addslot", (req, res) => {
  const { day, time, isAvailable, isBooked } = req.body;

  const newSlot = new Slot({
    day,
    time,
    isAvailable,
    isBooked,
  });
  newSlot.save((err) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Slot successfully added",
          msgError: false,
        },
      });
  });
});

slotRouter.post(
  "/updslot",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body.user);
    Slot.findByIdAndUpdate(
      req.body.slot._id,
      {
        isAvailable: req.body.isAvailable,
        isBooked: req.body.isBooked,
        user: req.user._id,
      },
      (err) => {
        if (err) {
          console.log("Slots failed to updated");
          res.status(500).json({
            message: { msgBody: "Slots failed to updated", msgError: true },
          });
        } else {
          console.log("Slots updated successfully");
        }
      }
    );
  }
);

slotRouter.get("/slots", (req, res) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const today = d.getDay();

  // slots.map((slot, index) =>
  //   slot.day === days[today + 5] || slot.day === days[today + 6]
  //     ? updateSlot(slot, true, false, user, index)
  //     : null
  // );
  Slot.updateMany(
    { day: days[today + 5] },
    { isAvailable: true, isBooked: false, user: null }
  ).exec();
  Slot.updateMany(
    { day: days[today + 6] },
    { isAvailable: true, isBooked: false, user: null }
  ).exec();
  console.log("Slots cleared");
  console.log("Fetching Slots");
  Slot.find().exec((err, document) => {
    if (err) {
      console.log("Slots failed to fetch");
      res.status(500).json({
        message: { msgBody: "Slots failed to fetch", msgError: true },
      });
    } else {
      console.log("Slots fetched successfully");
      res.status(200).json({ slots: document });
    }
  });
});

module.exports = slotRouter;
