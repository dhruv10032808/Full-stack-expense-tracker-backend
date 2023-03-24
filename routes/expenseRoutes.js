const express=require('express');
const expenseController=require('../controllers/expense')
const router=express.Router();
const userAuthentication=require('../middleware/auth');

router.use('/add-expense',userAuthentication.authenticate,expenseController.postExpenses);

router.use('/get-expense',userAuthentication.authenticate,expenseController.getExpenses);

router.use('/delete-expense/:userId',userAuthentication.authenticate,expenseController.getDelete);

module.exports=router;