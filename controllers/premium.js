const ExpenseItems = require("../models/expense");
const User = require("../models/user")

exports.getLeaderboard=async(req,res,next)=>{
   const users=await User.findAll();
   const expenses=await ExpenseItems.findAll();
   const combined={};
   expenses.forEach(expense=>{
    if(combined[expense.userId]){
        combined[expense.userId]+=expense.expense
    }else{
        combined[expense.userId]=expense.expense
    }
   })
   const entireUserDetails=[];
   users.forEach(user=>{
      entireUserDetails.push({name:user.name,total:combined[user.id]})
   })
   console.log(combined);
   entireUserDetails.sort((a,b)=>{
    return b.total-a.total
   })
   res.status(200).json(entireUserDetails);
}