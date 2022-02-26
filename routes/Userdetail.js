const express = require("express");
const userdetailsRouter = express.Router();
const User = require("../models/User");

userdetailsRouter.get("/userdetails", (req, res) => {
  console.log("Fetching details");
  User.find().exec((err, document) => {
    if (err) {
      console.log("details failed to fetch");
      res.status(500).json({
        message: { msgBody: "details failed to fetch", msgError: true },
      });
    } else {
      console.log("details fetched successfully");
      res.status(200).json({ users: document });
    }
  });
});

module.exports = userdetailsRouter;

 