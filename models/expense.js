// const Sequelize=require('sequelize');

// const sequelize=require('../util/database')

// const ExpenseItems=sequelize.define('expense-items',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     expense:{
//         type:Sequelize.INTEGER,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const expenseSchema=new Schema({
  expense:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
})

module.exports=mongoose.model('Expense-item',expenseSchema);