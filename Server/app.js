import express from 'express';
const app = express();
import cors from "cors"
import dbConnect from './Db/Dbconnection.js';
// const dotenv = require("dotenv").config({path:"./store.env"})
import dotenv from "dotenv";
dotenv.config({ path: "./store.env" });


app.use(express.json());
app.use(cors("*"));

import EnquiryRouter from "./Routes/Enquiry/enquireRoutes.js"
app.use("/user/enquiry",EnquiryRouter);


import applicationRouter from "./Routes/Admin/studentRoutes.js";
app.use("/admin/api",applicationRouter);



dbConnect();

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log("server is listening");
    
})