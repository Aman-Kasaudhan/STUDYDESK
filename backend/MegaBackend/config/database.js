const mongoose=require("mongoose");
require("dotenv").config();

exports.connect= ()=>{
    // to import DATABASE_URL run npm i .env in terminal
  mongoose.connect(process.env.DATABASE_URL,{
         useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then(()=>{console.log("✅ db Connection establish successfully")})
.catch((error)=>{console.log("kuch error hai");
     process.exit(1);});
}
