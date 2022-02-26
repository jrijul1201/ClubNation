const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// name : "", username : "", phone : ""
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 13,
  },
  phone: {
    type: String,
    required: true,
    min: 10,
    max: 13,
  },
  univ: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role : {
  //     type : String,
  //     enum : ['user','admin'],
  //     required: true
  // },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) {
        // if (
        //   this.phone.substring(this.phone.length - 10) ===
        //   phone.substring(phone.length - 10)
        // )
        //   return cb(null, this);
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
