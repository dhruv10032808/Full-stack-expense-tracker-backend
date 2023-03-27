const express=require('express');
const passwordController=require('../controllers/forgotPassword')
const router=express.Router()

router.post('/updatepassword/:resetpasswordid',passwordController.updatePassword)

router.use('/resetpassword/:id',passwordController.resetPassword);

router.post('/forgotpassword',passwordController.forgotPassword)

module.exports=router;
