const express = require("express");
const statsRouter = express.Router();
const User = require("../models/User");

statsRouter.get("/stats", (req, res) => {
    console.log("Fetching details");
    User.count({},(err, document) => {
      if (err) {
        console.log("failed to count Users ");
        res.status(500).json({
          message: { msgBody: " failed to count", msgError: true },
        });
      } else {
        console.log("count fetched successfully");
        res.status(200).json({ noOfUsers: document });
      }
    });
  });
  
  module.exports = statsRouter;
  
   