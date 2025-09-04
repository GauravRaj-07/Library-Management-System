const express = require("express");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message:"Welcome to the Library Management System"});
});
app.use((req, res) => {
    res.status(500).json({message:"Not Built Yet"});
});

app.listen(port, () => {
    console.log(`Library Management System app listening on port ${port}`);
});
