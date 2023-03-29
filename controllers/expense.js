const ExpenseItems=require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');
const S3Service=require('../services/S3services');
const DownloadData = require('../models/downloadData');

exports.getExpenses=(req,res,next)=>{
    const limit=(req.query.limit) ? parseInt(req.query.limit) : 2;
    const page=(req.query.page) ? parseInt(req.query.page) : 1;
    console.log(limit);
    console.log(page);
    ExpenseItems.findAndCountAll()
    .then((data) => {
        console.log(data.count)
        var pages = Math.ceil(data.count / limit);

    ExpenseItems.findAll({
        offset:(page-1)*limit,
        limit:limit
    },{where:{userId:req.user.id}}).then(result=>{
      res.status(201).json({newExpenseDetail:result,ispremiumuser:req.user.ispremiumuser,pages:pages})
      console.log(result)
    })
    .catch(err=>console.log(err))
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

exports.downloadExpenses=async(req,res,next)=>{
    try{
    const expenses=await ExpenseItems.findAll({where:{userId:req.user.id}});
    console.log(expenses)
    const stringifiedExpenses=JSON.stringify(expenses);
    const userId=req.user.id;
    const filename=`Expense${userId}/${new Date()}.txt`;
    const fileURL=await S3Service.uploadToS3(stringifiedExpenses,filename);
    await DownloadData.create({fileURL,userId:req.user.id})
    res.status(201).json({fileURL,success:true});
    }catch(err){
        res.status(500).json({fileURL:'',success:false,err:err})
    }
}

exports.downloadDataExpenses=(req,res,next)=>{
    DownloadData.findAll({where:{userId:req.user.id}}).then((data)=>{
        res.status(201).json({data:data,success:true})
    }).catch(err=>{
        res.status(201).json({err:err,success:false})
    })
}