const express = require("express");
const resourceRouter = express.Router();

const Resource = require("../models/Resource");

resourceRouter.post("/addresource", (req, res) => {
  const { title, description, media } = req.body;

  const newResource = new Resource({
    title,
    description,
    media,
  });
  newResource.save((err) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Resource successfully added",
          msgError: false,
        },
      });
  });
});

resourceRouter.post("/delresource", (req, res) => {
  Resource.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Resources failed to delete");
      res.status(500).json({
        message: { msgBody: "Resources failed to delete", msgError: true },
      });
    } else {
      console.log("Resources deleted successfully");
    }
  });
});

resourceRouter.get("/resources", (req, res) => {
  console.log("Fetching Resources");
  Resource.find().exec((err, document) => {
    if (err) {
      console.log("Resources failed to fetch");
      res.status(500).json({
        message: { msgBody: "Resources failed to fetch", msgError: true },
      });
    } else {
      console.log("Resources fetched successfully");
      res.status(200).json({ resources: document });
    }
  });
});

module.exports = resourceRouter;
