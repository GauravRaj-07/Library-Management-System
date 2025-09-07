//DTO(Data Transfer Object)

class BookDto{
    _id;
    name;
    author;
    genre;
    price;
    stock;
    issuedBy;
    issuedDate;
    returnDate;
    fine;
    constructor(user){
        this._id=user.issuedBooks._id;
        this.name=user.issuedBooks.name;
        this.author=user.issuedBooks.author;
        this.genre=user.issuedBooks.genre;
        this.price=user.issuedBooks.price;
        this.stock=user.issuedBooks.stock;
        this.issuedBy=user.name;
        this.issuedDate=user.issuedDate;
        this.returnDate=user.returnDate;
        this.fine=user.fine;
    }
}


  
  module.exports = BookDto;
  
