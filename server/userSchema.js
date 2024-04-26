let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    UserId:{
        type:String,
        required:true,
        unique:true
  },
     
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
   
},{timestamps:true})

let user = new mongoose.model("user",userSchema)
module.exports = user;