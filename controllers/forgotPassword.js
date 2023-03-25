const sgMail = require('@sendgrid/mail');

exports.forgotPassword=(req,res,next)=>{
    const {email}=req.body
    sgMail.setApiKey('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')

            const msg = {
                to: email, // Change to your recipient
                from: 'dhruv.bhanu.1003@gmail.com', // Change to your verified sender
                subject: 'forgot password',
                text: 'we will contact you soon'
            }

            sgMail
            .send(msg)
            .then(response=>console.log(response))
            .catch(err=>console.log(err))
}

