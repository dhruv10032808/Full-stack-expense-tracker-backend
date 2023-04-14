const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
exports.postSignup=(req,res,next)=>{
    console.log(req.body)
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        console.log(err);
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            totalExpense:0
        })
        user.save().then(result=>{
            res.status(201).json({newUserDetail:result});
        })
        .catch(err=>{
            res.json({newUserDetail:err})
            console.log(err)})
    })
}

const getAccessToken=(id)=>{
return jwt.sign({userId:id},process.env.TOKEN_SECRET)
}

exports.postLogin=(req,res,next)=>{
    console.log(req.body.email)
    User.find({email:req.body.email}).then(users=>{
        if(users.length>0){
            bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
                if(err){
                    throw new Error('Something went wrong');
                }
                if(result===true){
                    res.status(200).json({success:true,message:'User logged in successfully',token:getAccessToken(users[0]._id)})
                }else{
                    return res.status(400).json({success:false,message:'Password is incorrect'})
                }
            })
        }
    })
    .catch(err=>{
        res.status(500).json({success:false,message:err})
    })
}