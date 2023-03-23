const Expense=require('../models/expense');

exports.postSignup=(req,res,next)=>{
    console.log(req.body)
    Expense.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(result=>{
        res.status(201).json({newUserDetail:result});
    })
    .catch(err=>{
        res.json({newUserDetail:err})
        console.log(err)})
}
