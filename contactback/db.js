const mongoose=require("mongoose");

const URI="mongodb://localhost:27017/contactForm";

const ConnectDB=async()=>{
    try{
await mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

});

console.log("MongoDB Connected Successfully");
    }
    catch(error){
        console.log("MongoDB Connection failed",error);
        process.exit(1);

    }
};

module.exports=ConnectDB;