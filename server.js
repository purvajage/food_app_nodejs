const express=require('express');
const connectDb=require("../food_app_nodejs/config/db");
connectDb();
const app=express()
app.use(cors());
//route
app.use('/api/v1/test',require('./routes/testroutes'));
app.use("/api/v1/auth",require("./routes/authroutes"));
app.use("/api/v1/user",require("./routes/userroutes"));
app.use("/api/v1/resturant",require("./routes/resturentroutes"));
app.use("/api/v1/food",require("./routes/foodroutes"));
app.use("/api/v1/category",require("./routes/categoryroutes"));

app.get('/I',(req,res)=>
   {
    return res
    .status(200)
    .send("<h1>welcome to server</h1>");
   });
   
   const port=2000

   app.listen(port,()=>{
    console.log("server running");
   })