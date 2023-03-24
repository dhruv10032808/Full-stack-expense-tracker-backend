const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoutes=require('./routes/userRoutes')
const expenseRoutes=require('./routes/expenseRoutes')
const User=require('./models/user');
const Expense=require('./models/expense')
const sequelize=require('./util/database')
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(userRoutes);
app.use(expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User)

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))