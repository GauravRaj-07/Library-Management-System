const express = require("express");
const app = express();
const {users} = require("../data/users.json");


app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"All users",
        data:users
    });
})
app.get("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((user)=>user.id==id);
    if(!user){
        return res.status(404).json({success:false,message:`User not found with id ${id}`});
    }
    res.status(200).json({
        success:true,
        message:"User found",
        data:user
    });
})
app.post("/",(req,res)=>{
    //     "id": 5,
    //     "name": "David Brown",
    //     "email": "david.brown@example.com",
    //     "subscriptionType": "Premium",
    //     "subscriptionDate": "2023-06-01",

    const {id,name,email,subscriptionType,subscriptionDate}=req.body;
    if(!id || !name || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({success:false,message:"All fields are required"});
    }
    const user=users.find((user)=>user.id==id);
    if(user){
        return res.status(400).json({success:false,message:`User with id ${id} already exists`});
    }
    users.push({id,name,email,subscriptionType,subscriptionDate});
    res.status(201).json({success:true,message:"User created successfully"});
})
app.put("/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user=users.find((user)=>user.id==id);
    if(!user){
        return res.status(404).json({success:false,message:`User not found with id ${id}`});
    }
    const updatedUser=users.map((user)=>{
        if(user.id==id){
            return {...user,...data};
        }
        return user;
    });
    // users=updatedUser;
    res.status(200).json({success:true,data:updatedUser,message:"User updated successfully"});    
})
app.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((user)=>user.id==id);
    if(!user){
        return res.status(404).json({success:false,message:`User not found with id ${id}`});
    }
    const updatedUser=users.filter((user)=>user.id!=id);
    // users=updatedUser;
    res.status(200).json({success:true,data:updatedUser,message:"User deleted successfully"});    
})

app.get("/subscription-details/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((user)=>user.id==id);
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
        let days=Math.floor(date.getTime()/(1000*60*60*24));
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
})

module.exports=app;

