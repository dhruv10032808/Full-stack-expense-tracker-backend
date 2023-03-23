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

exports.postLogin=(req,res,next)=>{
    console.log(req.body.email)
    Expense.findAll({where:{email:req.body.email}}).then(users=>{
        if(users.length>0){
            if(users[0].password===req.body.password){
                res.status(200).json({success:true,message:'User logged in successfully'})
            }else{
                return res.status(400).json({success:false,message:'Password is incorrect'})
            }
        }else{
            return res.status(404).json({success:false,message:'User does not exist'})
        }
    })
    .catch(err=>{
        res.status(500).json({success:false,message:err})
    })
}