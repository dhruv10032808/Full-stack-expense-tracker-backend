const express=require('express');
const userController=require('../controllers/user')
const router=express.Router();

router.use('/signup',userController.postSignup);

router.use('/login',userController.postLogin);

module.exports=router;