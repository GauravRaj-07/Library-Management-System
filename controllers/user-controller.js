const models=require('../models/export-models');
const {userModel}=models;

exports.getAllUsers=async (req,res)=>{
    const users=await userModel.find();
    if(!users){
        return res.status(404).json({success:false,message:"No users found"});
    }
    return res.status(200).json({success:true,message:"All users",data:users});
}

exports.getUserById=async (req,res)=>{
    const {id}=req.params;
    const user=await userModel.findById(id);
    if(!user){
        return res.status(404).json({success:false,message:`User not found with id ${id}`});
    }
    return res.status(200).json({success:true,message:"User found",data:user});
}

exports.addNewUser=async (req,res)=>{
    const {data}=req.body;
    if(!data){
        return res.status(400).json({success:false,message:"No data provided"});
    }
    const user=new userModel(data);
    await user.save();
    return res.status(201).json({success:true,message:"User added successfully",data:user});
}

exports.updateUserById=async (req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user=await userModel.findById(id);
    if(!user){
        return res.status(404).json({success:false,message:`User not found with id ${id}`});
    }
    const updatedUser=await userModel.findByIdAndUpdate(id,data,{new:true});
    return res.status(200).json({success:true,message:"User updated successfully",data:updatedUser});
}

exports.deleteUserById=async (req,res)=>{
    const {id}=req.params;
    const user=await userModel.findById(id);
    if(!user){
        return res.status(404).json({success:false,message:`User not found with id ${id}`});
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"User deleted successfully",data:user});
}

exports.getSubscriptionDetails=async (req,res)=>{
    const {id}=req.params;
    const user=await userModel.findById(id);
    if(!user){
        return res.status(404).json({success:false,message:`User not found with id ${id}`});
    }
    const getDateInDays=(data='')=>{
        let date;
        if(data){
            date=new Date(data);
        }
        else{
            date=new Date();
        }
        let days=Math.floor(date/(1000*60*60*24));
        return days;
    }
    const subscriptionType=(date)=>{
        if(user.subscriptionType=="Basic"){
            date=date+90;
        }
        else if(user.subscriptionType=="Standard"){
            date=date+180;
        }
        else if(user.subscriptionType=="Premium"){
            date=date+365;
        }
        return date;
    }
    let returnDate=getDateInDays(user.returnDate);
    let currentDate=getDateInDays();
    let subscriptionDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiryDate=subscriptionType(subscriptionDate);
    
    const data={
        ...user,
        subscriptionExpired:subscriptionExpiryDate<currentDate,
        subscriptionDaysLeft:subscriptionExpiryDate-currentDate,
        daysLeftForExpiration:returnDate-currentDate,
        returnDate:returnDate<currentDate?"Book is overdue":returnDate,
        fine:returnDate<currentDate?subscriptionExpiryDate<=currentDate?200:100:0

    }
    res.status(200).json({success:true,data,message:"User found"});
}


