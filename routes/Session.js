const express = require("express");
const sessionRouter = express.Router();

const Session = require("../models/Session");

sessionRouter.post("/addsession", (req, res) => {
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
          msgBody: "Session successfully added",
          msgError: false,
        },
      });
  });
});

sessionRouter.post("/delsession", (req, res) => {
  Session.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Sessions failed to delete");
      res.status(500).json({
        message: { msgBody: "Sessions failed to delete", msgError: true },
      });
    } else {
      console.log("Sessions deleted successfully");
    }
  });
});

sessionRouter.get("/sessions", (req, res) => {
  console.log("Fetching Sessions");
  Session.find().exec((err, document) => {
    if (err) {
      console.log("Resources failed to fetch");
      res.status(500).json({
        message: { msgBody: "Sessions failed to fetch", msgError: true },
      });
    } else {
      console.log("Sessions fetched successfully");
      res.status(200).json({ sessions: document });
    }
  });
});

module.exports = sessionRouter;
