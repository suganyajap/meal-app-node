const express=require('express');
const authUser=require("./authUser");
const dotenv=require('dotenv');

const userRoutes=require("./userRoutes");
const cors=require('cors');
dotenv.config();
console.log(process.env);
const app=express();
const PORT=process.env.PORT;
require('./db');
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(userRoutes);



app.listen(PORT,()=>console.log("App is started in PORT",PORT))