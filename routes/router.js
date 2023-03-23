const express=require('express');
const expenseController=require('../controllers/expense')
const router=express.Router();

router.use('/signup',expenseController.postSignup);

router.use('/login',expenseController.postLogin);

module.exports=router;