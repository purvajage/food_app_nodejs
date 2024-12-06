const express = require("express");

const authmiddleware = require("../middleware/authmiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controller/resturantcontroller");

const router = express.Router();

//routes
// CRAETE RESTURANT || POST
router.post("/create", authmiddleware, createResturantController);

// GET ALL RESTURANTS || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", getResturantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authmiddleware, deleteResturantController);

module.exports = router;