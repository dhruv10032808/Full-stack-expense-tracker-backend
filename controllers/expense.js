const ExpenseItems=require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');
const S3Service=require('../services/S3services');
const DownloadData = require('../models/downloadData');

exports.getExpenses=(req,res,next)=>{
    const limit=(req.query.limit) ? parseInt(req.query.limit) : 2;
    const page=(req.query.page) ? parseInt(req.query.page) : 1;
    const skip=(page-1)*limit;
    console.log(skip)
    //console.log(limit);
    //console.log(page);
    ExpenseItems.count({userId:req.user._id})
    .then((data) => {
        const pages = Math.ceil((data) / (limit));
        ExpenseItems.find({userId:req.user._id}).skip(skip).limit(limit).then(result=>{
            console.log(result)
      res.status(201).json({newExpenseDetail:result,ispremiumuser:req.user.ispremiumuser,pages:pages})
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))
}

exports.postExpenses=async(req,res,next)=>{
    try{
    console.log(req.body);
    const expense =new ExpenseItems({
        expense:req.body.expense,
        description:req.body.description,
        category:req.body.category,
        userId:req.user._id
    })
        const result=await expense.save();
        const totalExpense=Number(req.user.totalExpense)+Number(req.body.expense)
        console.log(totalExpense);
        req.user._id=req.user._id;
        req.user.name=req.user.name;
        req.user.email=req.user.email;
        req.user.password=req.user.password;
        req.user.ispremiumuser=req.user.ispremiumuser;
        req.user.totalExpense=totalExpense;
        await req.user.save();
        res.status(201).json({newExpenseDetail:result})
        console.log(result)
    }
    catch(err){
        res.status(403).json({success:true,message:'Something went wrong'})
    }
}

exports.getDelete=async(req,res,next)=>{
    try{
    //const tr=await sequelize.transaction()
    const userId=req.params.userId;
    console.log(userId)
    console.log(req.user.id)
    const result=await ExpenseItems.findByIdAndRemove(userId)
    console.log(result)
    console.log('deleted')
    const totalExpense=Number(req.user.totalExpense)-Number(result.expense)
    req.user._id=req.user._id;
    req.user.name=req.user.name;
    req.user.email=req.user.email;
    req.user.password=req.user.password;
    req.user.ispremiumuser=req.user.ispremiumuser;
    req.user.totalExpense=totalExpense;
    await req.user.save()
        }catch(err){
            console.log(err)
            res.status(403).json({success:false,message:'Expense not deleted'})
        }
}

exports.downloadExpenses=async(req,res,next)=>{
    try{
    const expenses=await ExpenseItems.find({userId:req.user._id});
    console.log(expenses)
    const stringifiedExpenses=JSON.stringify(expenses);
    const userId=req.user._id;
    const filename=`Expense${userId}/${new Date()}.txt`;
    const fileURL=await S3Service.uploadToS3(stringifiedExpenses,filename);
    const data=new DownloadData({fileURL,createdAt:new Date(),userId:req.user._id})
    await data.save()
    res.status(201).json({fileURL,success:true});
    }catch(err){
        res.status(500).json({fileURL:'',success:false,err:err})
    }
}

exports.downloadDataExpenses=(req,res,next)=>{
    DownloadData.find({userId:req.user.id}).then((data)=>{
        res.status(201).json({data:data,success:true})
    }).catch(err=>{
        res.status(201).json({err:err,success:false})
    })
}