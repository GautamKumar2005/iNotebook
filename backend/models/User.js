const mongoose=require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
  }
);
const User=mongoose.model('user',userSchema);
module.exports=User;