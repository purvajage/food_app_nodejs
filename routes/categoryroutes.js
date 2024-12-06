const express=require("express");
const authmiddleware=require("../middleware/authmiddleware");
const{
    createcatcontroller,
    getallcategorycontroller,
    updatecatcontroller,
    deletecategorycontroller,
}=require("../controller/categorycontroller");
const router=express.Router();

router.post("/Create",authmiddleware,createcatcontroller);
router.get("/getAll",getallcategorycontroller);
router.put("/update/:id",authmiddleware,updatecatcontroller);
router.delete("/delete/:id",authmiddleware,deletecategorycontroller);
module.exports=router;