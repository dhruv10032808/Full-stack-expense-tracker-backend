const Razorpay=require('razorpay');
const Order = require('../models/orders');

exports.purchasepremium=async(req,res)=>{
  try{
    console.log(process.env.RAZORPAY_KEY_ID);
    var rzp=new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET
    })
    const amount=2500;

    rzp.orders.create({amount,currency:'INR'},(err,order)=>{
      if(err){
        throw new Error(JSON.stringify(err));
      }
      const newOrder=new Order({
        orderid:order.id,
        status:'PENDING',
        userId:req.user._id
      })
      newOrder.save().then(()=>{
        return res.status(201).json({order,key_id:rzp.key_id});
      }).catch(err=>{
        throw new Error(err)
      })
    })
  }
  catch(err){
     console.log(err);
     res.status(403).json({message:'Something went wrong',error:err})
  }
}

exports.updateTransactionStatus=async(req,res,next)=>{
    try{
    const {order_id,payment_id}=req.body
    const order= await Order.find({orderid:order_id})
    //console.log(order)
    order[0].orderid=order[0].orderid;
    order[0].paymentid=payment_id;
    order[0].status='SUCCESSFUL';
    order[0].userId=req.user._id;
    console.log(order[0]);
    //console.log(updatedOrder)
    req.user._id=req.user._id;
    req.user.name=req.user.name;
    req.user.email=req.user.email;
    req.user.password=req.user.password;
    req.user.ispremiumuser=true
    console.log(req.user)
        order[0].save().then((result)=>{
          console.log(result)
          req.user.save().then(()=>{
            return res.status(201).json({success:true,message:'Transaction Successful',ispremiumuser:req.user.ispremiumuser});
          }).catch(err=>consol.log(err))
        }).catch(err=>{
            throw new Error(err);
        })
}catch(err){
    return res.status(403).json({success:false,message:'Something went wrong'});
}
}

exports.updateIncompleteTransactionStatus=async(req,res,next)=>{
    try{
    const {order_id}=req.body
    const order= await Order.find({orderid:order_id})
    order[0].orderid=order[0].orderid;
    order[0].status='UNSUCCESSFUL';
    order[0].userId=req.user._id;
    console.log(order[0]);
    req.user._id=req.user._id;
    req.user.name=req.user.name;
    req.user.email=req.user.email;
    req.user.password=req.user.password;
    req.user.ispremiumuser=false;
    order[0].save().then(()=>{
          req.user.save().then(()=>{
            return res.json({success:false,message:'Transaction Unsuccessful'});
          })
        }).catch(err=>{
            throw new Error(err);
        })
}catch(err){
    return res.status(403).json({success:false,message:'Something went wrong'});
}
}