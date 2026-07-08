const Booking = require("../models/Booking");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Bookings
const getAllBookings = async (req, res) => {
  try {
    const { userId } = req.query;

    let filter = {};

    if (userId) {
      filter.user = userId;
    }

    const bookings = await Booking.find(filter)
      .populate("user", "name email")
      .populate("house", "title location price");

    res.status(200).json({
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
};