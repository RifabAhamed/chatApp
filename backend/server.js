import express from "express";
import dotenv from "dotenv";

const app = express();

configDotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    //root route http://localhost:5000/
    res.send("Hello World!!");
});
app.use("/api/auth",authRoutes);

app.get("/api/auth/signup", (req,res)=>{
    console.log("signuproute");
});
app.get("/api/auth/login", (req,res)=>{
    console.log("loginroute");
});



app.listen(PORT,()=> console.log('Server Running on Port ${PORT}'));