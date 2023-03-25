const ExpenseItems=require('../models/expense');

exports.getExpenses=(req,res,next)=>{
    ExpenseItems.findAll({where:{userId:req.user.id}}).then(result=>{
      res.status(201).json({newExpenseDetail:result,ispremiumuser:req.user.ispremiumuser})
      console.log(result)
    })
    .catch(err=>console.log(err))
  }

exports.postExpenses=(req,res,next)=>{
    console.log(req.body);
    ExpenseItems.create({
        expense:req.body.expense,
        description:req.body.description,
        category:req.body.category,
        userId:req.user.id
    }).then(result=>{
        res.status(201).json({newExpenseDetail:result})
        console.log(result)
    })
    .catch(err=>console.log(err))
}

exports.getDelete=(req,res,next)=>{
    const userId=req.params.userId;
    ExpenseItems.destroy({where:{id:userId,userId:req.user.id}}).then((result)=>{
       console.log(result)
       console.log('deleted')
    })
    .catch(err=>console.log(err))
}