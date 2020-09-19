
require("./models/Track"); 
require("./models/User")
const express = require( "express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const authRoutes = require("./Routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth"); 
const trackRoutes = require("./Routes/trackRoutes");
const app = express();
 app.use(bodyParser.json());

app.use(authRoutes)
app.use(trackRoutes)
const mongoURL= "mongodb+srv://rahulramachandran:Sairam123@cluster0-gx4vd.mongodb.net/tracker-app?retryWrites=true&w=majority"

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
})


mongoose.connection.on("connected",()=>{
    console.log("connected to mongo instance")
})

mongoose.connection.on("error",(err)=>{
    console.log("error occured", err)
});






app.get("/",requireAuth,(req,res) =>{
    res.send(`your email: ${req.user.email}`);
});






app.listen(process.env.PORT || 3000,()=>{
    console.log("listening on port 3000")
});