const express = require("express");
const router = express.Router();

const {
  addHouse,
  getAllHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
} = require("../controllers/houseController");

const { ownerOnly } = require("../middleware/roleMiddleware");

// Add House
router.post("/add", ownerOnly, addHouse);

// Get All Houses
router.get("/", getAllHouses);

// Get House by ID
router.get("/:id", getHouseById);

// Update House
router.put("/:id", ownerOnly, updateHouse);

// Delete House
router.delete("/:id", ownerOnly, deleteHouse);

module.exports = router;