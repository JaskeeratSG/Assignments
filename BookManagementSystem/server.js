const express= require('express');
const bookRouter = require('./routes');
const pool = require("./db")

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    console.log("Successfull connection");
    res.send('sent by node');
})

app.use('/api',bookRouter);
app.listen(3000,()=>(console.log("server running on port 3000")));
