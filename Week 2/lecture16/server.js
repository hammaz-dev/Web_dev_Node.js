const express = require("express")
const morgan=require("morgan")
const app = express();
const PORT = 3000

app.use(morgan())

// const logMiddleware=(req,res,next)=>{
//     req.data="this is from the middleware"
//     console.log("Request url:",req.url,"Method:",req.method,"Time:",new Data().toLocalString());
//     // res.send("mujhe nhi bhejna aage")
//     next();
// }

const apiMiddleware=(req,res,next)=>{
    const API_KEY=req.query.API_KEY;
    if(API_KEY!=="1234"){
        res.send("API key is not valid")
    }
    console.log("authentication");
    next();
    
}

// app.use(logMiddleware);//global middleware
// app.use(apiMiddleware);//global middleware

app.get("/",(req,res)=>{
    console.log("Request data:",req.data);
    console.log("Homepage");
    res.send("hello from server")
})

app.get("/weather-data/",apiMiddleware,(req,res)=>{   // route level middleware
    console.log("Weather data");
    res.json({
        city:"Delhi",
        weather:"sunny",
        temp:32
    })
    
})






app.listen(PORT,()=>console.log("server is runnign onn port 3000"));