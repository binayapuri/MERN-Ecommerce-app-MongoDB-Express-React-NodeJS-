import express from "express";
import colors from "colors";
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"



 
//configure env kaha chha env vanera
dotenv.config();

//data base config
connectDB();


// REST OBJECT
const app = express()

// middleware morgan
app.use(express.json())
app.use(morgan('dev'))

// routes 

app.use("/api/v1/auth", authRoutes);


// rest api
app.get ('/' , (req,res)=>{
    res.send ( '<h1>welcome to e commerce app</h1>')
})
 
// PORT
const PORT = process.env.PORT ||8080;


// run or listen 
app.listen(PORT , ()=>{
    console.log(`server is running on ${process.env.DEV_MODE} mode on port${PORT}`.bgCyan.white)
})


