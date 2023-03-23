const express=require('express');
const expenseController=require('../controllers/expense')
const router=express.Router();

router.use('/signup',expenseController.postSignup);

module.exports=router;