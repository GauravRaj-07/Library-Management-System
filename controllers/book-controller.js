const models = require("../models/export-models");
const { userModel, bookModel } = models;

// const dtos = require("../dtos/book-dto");
// const { BookDto } = dtos;

const BookDto = require("../dtos/book-dto");


// const getAllBooks=()=>{
    
// }

// const getBookById=(id)=>{
    
// }

// module.exports={
//     getAllBooks,
//     getBookById
// }

exports.getAllBooks=async (req,res)=>{
    const books=await bookModel.find();
    if(!books){
        return res.status(404).json({success:false,message:"No books found"});
    }
    return res.status(200).json({success:true,message:"All books",data:books});
}   

exports.getBookById=async (req,res)=>{
    const {id}=req.params;
    const book=await bookModel.findById(id);
    if(!book){
        return res.status(404).json({success:false,message:`Book not found with id ${id}`});
    }
    return res.status(200).json({success:true,message:"Book found",data:book});
}

exports.getAllIssuedBooks=async (req,res)=>{
    const users=await userModel.find({issuedBooks:{$exists:true}}).populate("issuedBooks");
    const issuedBooks=users.map((each)=>{
        return new BookDto(each)
    });

    if(issuedBooks.length===0){
        return res.status(404).json({success:false,message:"No books issued"});
    }
    return res.status(200).json({success:true,message:"All issued books",data:issuedBooks});
}

exports.addNewBook=async (req,res)=>{
    const {data}=req.body;
    if(!data){
        return res.status(400).json({success:false,message:"No data provided"});
    }
    // const book=new bookModel(data);
    // await book.save();
    const book=await bookModel.create(data);
    return res.status(201).json({success:true,message:"Book added successfully",data:book});
}

exports.updateBookById=async (req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    if(!data){
        return res.status(400).json({success:false,message:"No data provided"});
    }
    // const book=await bookModel.findById(id);
    // if(!book){
    //     return res.status(404).json({success:false,message:`Book not found with id ${id}`});
    // }
    // Object.assign(book,data);
    // await book.save();

    const updatedBook=await bookModel.findByIdAndUpdate(id,data,{new:true});
    if(!updatedBook){
        return res.status(404).json({success:false,message:`Book not found with id ${id}`});
    }

    return res.status(200).json({success:true,message:"Book updated successfully",data:updatedBook});
}

exports.deleteBookById=async (req,res)=>{
    const {id}=req.params;
    const book=await bookModel.findById(id);
    if(!book){
        return res.status(404).json({success:false,message:`Book not found with id ${id}`});
    }
    await bookModel.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"Book deleted successfully",data:book});
}
