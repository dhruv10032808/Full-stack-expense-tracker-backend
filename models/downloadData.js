// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const DownloadData=sequelize.define('downloadData',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     fileURL:Sequelize.STRING,


// })
// module.exports=DownloadData;

const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const downloadDataSchema=new Schema({
  fileURL:{
    type:String,
    required:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  createdAt:{
    type:String,
    required:true
  }
})

module.exports=mongoose.model('DownloadData',downloadDataSchema);