const AWS=require('aws-sdk');
exports.uploadToS3=(data,filename)=>{
    const BUCKET_NAME='expensetrackingapp1';
    const IAM_USER_KEY='AKIA3P7OB7TIB6ZDLXU6';
    const IAM_USER_SECRET='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';

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    })
        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log('something went wrong',err);
                    reject(err);
                }else{
                    console.log('success',s3response)
                    resolve(s3response.Location);
                }
            })
        })
}