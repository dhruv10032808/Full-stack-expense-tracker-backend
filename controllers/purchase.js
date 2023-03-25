const Razorpay=require('razorpay');
const Order = require('../models/orders');

exports.purchasepremium=async(req,res)=>{
  try{
    console.log(process.env.RAZORPAY_KEY_ID);
    var rzp=new Razorpay({
        key_id:'rzp_test_5WunS2bO8WweUy',
        key_secret:'sOYaXYB5hkFMlg0e3QEKsIHt'
    })
    const amount=2500;

    rzp.orders.create({amount,currency:'INR'},(err,order)=>{
      if(err){
        throw new Error(JSON.stringify(err));
      }
      req.user.createOrder({
        orderid:order.id,
        status:'PENDING'
      }).then(()=>{
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
    const order= await Order.findOne({where:{orderid:order_id}})
        const promise1=order.update({paymentid:payment_id,status:'SUCCESSFUL'})
        const promise2=req.user.update({ispremiumuser:true})
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(201).json({success:true,message:'Transaction Successful',ispremiumuser:req.user.ispremiumuser});
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
    const order= await Order.findOne({where:{orderid:order_id}})
        const promise1=order.update({status:'UNSUCCESSFUL'})
        const promise2=req.user.update({ispremiumuser:false})
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(403).json({success:false,message:'Transaction Unsuccessful'});
        }).catch(err=>{
            throw new Error(err);
        })
}catch(err){
    return res.status(403).json({success:false,message:'Something went wrong'});
}
}