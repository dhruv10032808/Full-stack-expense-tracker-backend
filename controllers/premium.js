const ExpenseItems = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.getLeaderboard=async(req,res,next)=>{
   const users=await User.find().sort({totalExpense:'desc'});
   res.status(200).json(users);
}