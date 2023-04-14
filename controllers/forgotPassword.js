const sgMail = require('@sendgrid/mail');
const uuid=require('uuid');
const ForgotPassword=require('../models/forgotPassword')
const User=require('../models/user');
const bcrypt=require('bcrypt')
exports.forgotPassword=async(req,res,next)=>{
    try{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(user){
        const id=uuid.v4();
        ForgotPassword.create({id:id,active:true,userId:user._id})
        .catch(err=>{
            throw new Error(err)
        })
    sgMail.setApiKey(process.env.API_KEY)

            const msg = {
                to: email, // Change to your recipient
                from: 'dhruv.bhanu.1003@gmail.com', // Change to your verified sender
                subject: 'forgot password',
                text: 'we will contact you soon',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`
            }

            sgMail
            .send(msg)
            .then(response=>{
                console.log(response)
                return res.status(response[0].statusCode).json({message:'Link to reset password sent to your mail',success:true})
            })
            .catch(err=>{
                throw new Error(err)})
            }else{
                throw new Error('User does not exist')
            }
        }catch(err){
            console.log(err);
            res.json({message:err,success:false})
        }
}

exports.resetPassword=async(req,res,next)=>{
    const id =  req.params.id;
    //console.log(id);
    ForgotPassword.findOne({ id }).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.id=forgotpasswordrequest.id,
            forgotpasswordrequest.active=false,
            forgotpasswordrequest.userId=forgotpasswordrequest.userId
            forgotpasswordrequest.save().then(()=>{
                res.status(200).send(`<html>
                <script>
                    function submitHandler(e){
                        e.preventDefault();
                        console.log('changed')
                    }
                </script>
                <form action="/password/updatepassword/${id}" method="POST">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button>Reset password</button>
                </form>
            </html>`
            )
        res.end()
            })
        }
    })
}

exports.updatePassword=(req,res,next)=>{
    const resetpasswordid=req.params.resetpasswordid;
    console.log(resetpasswordid)
    const updatedPassword=req.body.newpassword;
    ForgotPassword.findOne({id:resetpasswordid}).then(resetpasswordrequest=>{
        User.findOne({_id:resetpasswordrequest.userId}).then(user=>{
            console.log(user);
            if(user){
            bcrypt.hash(updatedPassword,10,(err,hash)=>{
              if(err){
                return res.status(403).json({message:err, success: false } )
              }
              user._id=user._id;
              user.name=user.name;
              user.password=hash;
              user.email=user.email;
              user.ispremiumuser=user.ispremiumuser;
              user.totalExpense=user.totalExpense;
              user.save().then(()=>{
                res.status(201).json({message: 'Successfuly update the new password'})
              })
            })
        }else{
            return res.status(404).json({message: 'No user Exists', success: false})
        }
        })
    })
}

