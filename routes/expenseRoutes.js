const express=require('express');
const expenseController=require('../controllers/expense')
const router=express.Router();

router.use('/add-expense',expenseController.postExpenses);

router.use('/get-expense',expenseController.getExpenses);

router.use('/delete-expense/:userId',expenseController.getDelete);

module.exports=router;