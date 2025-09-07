const express = require("express");
const app = express();
const usersData = require("../data/users.json");
let users = usersData.users;
const {getAllUsers,getUserById,addNewUser,updateUserById,deleteUserById,getSubscriptionDetails}=require("../controllers/user-controller");

app.get("/",getAllUsers);

app.get("/:id",getUserById);

app.post("/",addNewUser);

app.put("/:id",updateUserById);

app.delete("/:id",deleteUserById);

app.get("/subscription-details/:id",getSubscriptionDetails)

module.exports=app;

