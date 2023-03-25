const ExpenseItems = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.getLeaderboard=async(req,res,next)=>{
   const users=await User.findAll({
    attributes:['id','name',[sequelize.fn('sum',sequelize.col('expense-items.expense')),'total']],
    include:[
        {
            model:ExpenseItems,
            attributes:[]
        }
    ],
    group:['user.id'],
    order:[['total','DESC']]
});
   res.status(200).json(users);
}