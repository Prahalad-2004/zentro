import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from 'cors'
import path from 'path'


//configure env
dotenv.config();

//database config
connectDB();

//rest object for creating api
 const app =express()

 //middlewares
 app.use(cors())
 app.use(express.json())
 app.use(morgan('dev'))
 app.use(express.static(path.join(__dirname,'./client/dist')))

 //routes
 app.use('/api/v1/auth',authRoutes)
 app.use('/api/v1/category',categoryRoute)
 app.use('/api/v1/product',productRoutes)
 app.use("/api/v1/payment", paymentRoutes);

 //rest  api
 app.use('*',function(req,res){
   res.sendFile(path.join(__dirname,'./client/dist/index.html'))
 })

 //port
 //const PORT =8080;
 const PORT = process.env.PORT || 8080;

 //run
 app.listen(PORT ,()=> {
    console.log(`server running on  ${process.env.DEV_MODE}mode on port ${PORT}`.bgCyan.white);
 });