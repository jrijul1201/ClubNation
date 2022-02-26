const express = require("express");
const sessionRouter = express.Router();

const Session = require("../models/Event");

sessionRouter.post("/addevent", (req, res) => {
  const { title, date,time,mlink,description,rlink} = req.body;
  const newSession = new Session({
    title,
     date,
     time,
     mlink,
     description,
     rlink
  });
  newSession.save((err) => {
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

sessionRouter.post("/delevent", (req, res) => {
  Session.findByIdAndRemove(req.body._id, (err) => {
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

sessionRouter.get("/events", (req, res) => {
  console.log("Fetching Events");
  Session.find().exec((err, document) => {
    if (err) {
      console.log("Events failed to fetch");
      res.status(500).json({
        message: { msgBody: "Events failed to fetch", msgError: true },
      });
    } else {
      console.log("Sessions fetched successfully");
      res.status(200).json({ events: document });
    }
  });
});

module.exports = eventRouter;
