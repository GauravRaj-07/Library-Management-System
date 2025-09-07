const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    issuedBooks:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
            required:false
        },
    issuedDate:{
        type:String,
        required:false
    },
    returnDate:{
        type:String,
        required:false
    },
    subscriptionType:{
        type:String,
        required:true
    },
    subscriptionDate:{
        type:String,
        required:true
    },
    fine:{
        type:Number,
        required:false
    }    
},{timestamps:true})

module.exports = mongoose.model("User", userSchema);