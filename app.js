const express=require('express');
const fs=require('fs');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoutes=require('./routes/userRoutes')
const expenseRoutes=require('./routes/expenseRoutes')
const User=require('./models/user');
const Expense=require('./models/expense')
const dotenv=require('dotenv');
dotenv.config();
//const sequelize=require('./util/database');
const mongoose=require('mongoose')
const Order = require('./models/orders');
const purchaseRoutes=require('./routes/purchase')
const premiumRoutes=require('./routes/premium')
const forgotPasswordRoutes=require('./routes/forgotPassword');
const forgotPassword = require('./models/forgotPassword');
const DownloadData = require('./models/downloadData');
const helmet=require('helmet')
const morgan=require('morgan');
const path = require('path');
const app=express();
const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(cors());
app.use(helmet());
app.use(morgan('combined',{stream:accessLogStream}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use('/password',forgotPasswordRoutes)

mongoose.connect('mongodb+srv://dhruvbhanu1003:Dhruv2808@cluster0.0oqu9aj.mongodb.net/expense?retryWrites=true&w=majority').then((result)=>{
    app.listen(3000);
})
.catch(err=>console.log(err))