// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const ForgotPassword=sequelize.define('forgotpasswordrequests',{
//     id:{
//         type:Sequelize.UUID,
//         allowNull:false,
//         primaryKey:true
//     },
//     active: Sequelize.BOOLEAN,
// })

// module.exports=ForgotPassword;

const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const forgotPasswordSchema=new Schema({
  id:{
    type:String,
    required:true
  },
  active:{
    type:Boolean,
    required:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
})

module.exports=mongoose.model('ForgotPassword',forgotPasswordSchema);