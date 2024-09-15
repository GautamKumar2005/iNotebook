const mongoose=require("mongoose")
const mongURI="mongodb://localhost:27017/iNotebook"

const connectmongo=async ()=>{
        await mongoose.connect(mongURI)
        console.log("Successfully connected to MongoDB");
    
}
module.exports=connectmongo;