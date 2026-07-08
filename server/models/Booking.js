const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House",
      required: true,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);