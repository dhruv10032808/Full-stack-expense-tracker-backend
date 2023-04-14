// const Sequelize=require('sequelize');

// const sequelize=require('../util/database')

// const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     ispremiumuser:Sequelize.BOOLEAN,
//     totalExpense:{
//         type:Sequelize.INTEGER
//     }
// })

const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  ispremiumuser:{
    type:Boolean
  },
  totalExpense:{
    type:Number
  }
})

module.exports=mongoose.model('User',userSchema);