const ExpenseItems=require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');

exports.getExpenses=(req,res,next)=>{
    ExpenseItems.findAll({where:{userId:req.user.id}}).then(result=>{
      res.status(201).json({newExpenseDetail:result,ispremiumuser:req.user.ispremiumuser})
      console.log(result)
    })
    .catch(err=>console.log(err))
  }

exports.postExpenses=async(req,res,next)=>{
    try{
    const t=await sequelize.transaction()
    console.log(req.body);
    const result =await ExpenseItems.create({
        expense:req.body.expense,
        description:req.body.description,
        category:req.body.category,
        userId:req.user.id
    },{transaction:t})
        const totalExpense=Number(req.user.totalExpense)+Number(req.body.expense)
        console.log(totalExpense);
        await User.update({
            totalExpense:totalExpense
        },{
            where:{
                id:req.user.id
            },
            transaction:t
        })
            await t.commit();
            res.status(201).json({newExpenseDetail:result})
            console.log(result)
    }
    catch(err){
        await t.rollback();
        res.status(403).json({success:true,message:'Something went wrong'})
    }
}

exports.getDelete=async (req,res,next)=>{
    try{
    const t=await sequelize.transaction()
    const userId=req.params.userId;
    const results=await ExpenseItems.findAll({where:{id:userId,userId:req.user.id}},{transaction:t})
        await results[0].destroy()
            console.log('deleted')
            const totalExpense=Number(req.user.totalExpense)-Number(results[0].expense)
            await User.update({
                totalExpense:totalExpense
            },{where:{
                id:req.user.id
            },
            transaction:t
        })
            await t.commit();
        }catch(err){
            await t.rollback();
            res.status(403).json({success:false,message:'Expense not deleted'})
        }
}