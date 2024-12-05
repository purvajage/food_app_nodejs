const express=require('express');
//rest object
const app=express()
//route
app.use('/api/v1/test',require('./routes/testroutes'));
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