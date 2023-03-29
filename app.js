const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoutes=require('./routes/userRoutes')
const expenseRoutes=require('./routes/expenseRoutes')
const User=require('./models/user');
const Expense=require('./models/expense')
const sequelize=require('./util/database');
const Order = require('./models/orders');
const purchaseRoutes=require('./routes/purchase')
const premiumRoutes=require('./routes/premium')
const forgotPasswordRoutes=require('./routes/forgotPassword');
const forgotPassword = require('./models/forgotPassword');
const DownloadData = require('./models/downloadData');
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use('/password',forgotPasswordRoutes)

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Expense);
Expense.belongsTo(User)

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

User.hasMany(DownloadData);
DownloadData.belongsTo(User);

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))