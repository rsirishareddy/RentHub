const House = require("../models/House");

// Add House
const addHouse = async (req, res) => {
  try {
    const house = await House.create(req.body);

    res.status(201).json({
      message: "House added successfully",
      house,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Houses
const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();

    res.status(200).json({
      message: "Houses fetched successfully",
      houses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get House by ID
const getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    res.status(200).json({
      message: "House fetched successfully",
      house,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update House
const updateHouse = async (req, res) => {
  try {
    const house = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!house) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    res.status(200).json({
      message: "House updated successfully",
      house,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete House
const deleteHouse = async (req, res) => {
  try {
    const house = await House.findByIdAndDelete(req.params.id);

    if (!house) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    res.status(200).json({
      message: "House deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addHouse,
  getAllHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
};