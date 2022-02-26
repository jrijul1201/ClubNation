const mongoose = require("mongoose");
const SlotSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    min: 5,
  },
  time: {
    type: String,
    required: true,
    min: 1,
  },
  // is admin available for this slot?
  isAvailable: {
    type: Boolean,
    required: true,
  },
  // is this slot booked by some user?
  isBooked: {
    type: Boolean,
    required: true,
  },
  user :{
    type : mongoose.Schema.Types.ObjectId,
    required : false
  }
});

module.exports = mongoose.model("Slot", SlotSchema);
