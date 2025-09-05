const express = require("express");
const app = express();
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");


app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"All books",
        data:books
    });
})
app.get("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((book)=>book.id==id);
    if(!book){
        return res.status(404).json({success:false,message:`Book not found with id ${id}`});
    }
    res.status(200).json({
        success:true,
        message:"Book found",
        data:book
    });
})
app.post("/",(req,res)=>{
    const {id,name,author,genre,price,stock}=req.body;
    if(!id || !name || !author || !genre || !price || !stock){
        return res.status(400).json({success:false,message:"All fields are required"});
    }
    const book=books.find((book)=>book.id==id);
    if(book){
        return res.status(400).json({success:false,message:`Book with id ${id} already exists`});
    }
    books.push({id,name,author,genre,price,stock});
    res.status(201).json({success:true,message:"Book created successfully"});
})
app.put("/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    if(!data){
        return res.status(400).json({success:false,message:"No data provided"});
    }
    const book=books.find((book)=>book.id==id);
    if(!book){
        return res.status(404).json({success:false,message:`Book not found with id ${id}`});
    }
    const updatedBook=books.map((book)=>{
        if(book.id==id){
            return {...book,...data};
        }
        return book;
    });
    // books=updatedBook;
    res.status(200).json({success:true,data:updatedBook,message:"Book updated successfully"});    
})
app.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((book)=>book.id==id);
    if(!book){
        return res.status(404).json({success:false,message:`Book not found with id ${id}`});
    }
    const updatedBook=books.filter((book)=>book.id!=id);
    // books=updatedBook;
    res.status(200).json({success:true,data:updatedBook,message:"Book deleted successfully"});    
})

app.get("/issued/for-users",(req,res)=>{
    const userWithIssuedBooks=users.filter((user)=>{
        if(user.issuedBooks){
            return user;
        }
    })
    const issuedBooks=[];
    userWithIssuedBooks.map((user)=>{
        const book=books.find((book)=>book.id==user.issuedBooks);
        book.issuedBy=user.name;
        book.issuedDate=user.issuedDate;
        book.returnDate=user.returnDate;
        book.fine=user.fine;
        issuedBooks.push(book);
    })

    if(!issuedBooks){
        return res.status(404).json({success:false,message:"No books issued"});
    }
    res.status(200).json({success:true,data:issuedBooks,message:"All issued books"});
})

module.exports=app;