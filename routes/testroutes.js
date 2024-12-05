const express=require('express');
const { testcontroller } = require('../controller/testcontroller');

//router object
const router=express.Router()
//route get|post|delete|update
router.get('/test-user',testcontroller)
//export
module.exports=router