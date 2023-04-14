const jwt=require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate=(req,res,next)=>{
   const token=req.header('Authorization');
   console.log(token);
   const user=jwt.verify(token,'kufihwqfjiwhihinf984765gbemd');
   console.log(user.userId);
   User.findById(user.userId).then(user=>{
    req.user=user;
    next()
   })
   .catch(err=>{
    console.log(err);
    res.status(401).json({success:false});
   })
}