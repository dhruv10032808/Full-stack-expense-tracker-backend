const Sequelize=require('sequelize');

const sequelize=new Sequelize('full-stack-expense','root','Dhruv@2808',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;