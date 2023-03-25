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
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes)

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Expense);
Expense.belongsTo(User)

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))