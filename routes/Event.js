const express = require("express");
const eventRouter = express.Router();

const Event = require("../models/Event");

eventRouter.post("/addevent", (req, res) => {
  const { title, date,time,reglink,description} = req.body;
  const newEvent = new Event({
    title,
     date,
     time,
     reglink,
     description,
  });
  newEvent.save((err) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Event successfully added",
          msgError: false,
        },
      });
  });
});

eventRouter.post("/delevent", (req, res) => {
  Event.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Events failed to delete");
      res.status(500).json({
        message: { msgBody: "Events failed to delete", msgError: true },
      });
    } else {
      console.log("Events deleted successfully");
    }
  });
});

eventRouter.get("/events", (req, res) => {
  console.log("Fetching Events");
  Event.find().exec((err, document) => {
    if (err) {
      console.log("Events failed to fetch");
      res.status(500).json({
        message: { msgBody: "Events failed to fetch", msgError: true },
      });
    } else {
      console.log("Events fetched successfully");
      res.status(200).json({ events: document });
    }
  });
});

module.exports = eventRouter;
