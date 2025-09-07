const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//Database Connection
const connectToDatabase = require("./databaseConnection");
connectToDatabase();

const app = express();

const port = 8081;

app.use(express.json());

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

app.get("/", (req, res) => {
    res.status(200).json({success:true,message:"Welcome to the Library Management System"});
});

app.use("/users",usersRouter);
app.use("/books",booksRouter);


app.use((req, res) => {
    res.status(500).json({success:false,message:"Not Built Yet"});
});

app.listen(port, () => {
    console.log(`Library Management System app listening on port ${port}`);
});
