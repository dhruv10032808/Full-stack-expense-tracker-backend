const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const DownloadData=sequelize.define('downloadData',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    fileURL:Sequelize.STRING,


})
module.exports=DownloadData;