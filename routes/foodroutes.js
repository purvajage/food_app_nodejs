const express=require("express");
const authmiddleware=require("../middleware/authmiddleware");
const 
{
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController,
}=require("../controller/foodcontroller");
const adminmiddleware=require("../middleware/adminmiddleware");
const router=express.Router();
//CREATE FOOD
router.post("/create", authmiddleware, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

// GET  FOOD by rest
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD
router.put("/update/:id", authmiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authmiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authmiddleware, placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authmiddleware,
  adminmiddleware,
  orderStatusController
);

module.exports = router;