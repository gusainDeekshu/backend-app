const express=require('express');
const cors=require('cors');
const newLocal = `./db`;
const { connectMongodb } = require(newLocal);
const newLocal_1 = './routes/foodroutes';
const foodrouter=require(newLocal_1)


// app config
const app=express();
const port=4000;


// middleware
app.use(express.json());
app.use(cors());

//establishin db conex=ctions
connectMongodb('mongodb://127.0.0.1:27017/foodapp')

//api endpoint
app.use("/api/food",foodrouter)
app.use("/images",express.static("uploads"));
app.get("/",(req,res)=>{
    res.send("working api")
})



app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})