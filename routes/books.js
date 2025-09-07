const express = require("express");
const app = express();
const booksData = require("../data/books.json");
let books = booksData.books;  // Now you can safely reassign

const models = require("../models/export-models");
const { userModel, bookModel } = models;

const {getAllBooks,getBookById, getAllIssuedBooks,addNewBook,updateBookById,deleteBookById}=require("../controllers/book-controller");

const usersData = require("../data/users.json");
let users = usersData.users;


app.get("/",getAllBooks);

app.get("/:id",getBookById);

app.post("/",addNewBook);

app.put("/:id",updateBookById);
app.delete("/:id",deleteBookById)

app.get("/issued/for-users",getAllIssuedBooks);

module.exports=app;