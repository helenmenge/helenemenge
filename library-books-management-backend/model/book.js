const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    bookId:{type:String, required: true, unique: true},
    isbn : { type: String, require: true, unique: true},
    title:{ type: String, require: true},
    author : { type: [{type: String}], require: true},
    publisher: {type: String, required: true},
    publicationDate: { type: String, required: true},
    bookAvaliability: { type: Number},
    penalityFee: { type: Number},
});

const BookModel = mongoose.model('book',BookSchema);

class Book{
    constructor(bookId, isbn, title, author, publisher,
         publicationDate, bookAvaliability, penalityFee){
            this.bookId = bookId;
            this.isbn = isbn;
            this.title = title;
            this.author = author;
            this.publisher = publisher;
            this.publicationDate = publicationDate;
            this.bookAvaliability = bookAvaliability;
            this.penalityFee = penalityFee;
         }
    
    async getAll(){
        const allBooks = await BookModel.find();
        return allBooks;
    }
    async getById(bookId){
        const singleBook = await BookModel.findOne({bookId:bookId});
        return singleBook;
    }
    async updateById(){
        const book = await this.getById(this.bookId);
        if(book){
            await BookModel.updateMany({bookId:this.bookId}, this);
            return true;
        }else{
            return false;
        }
    }
    async deleteById(bookId){
        const book = await this.getById(bookId);
        if(book){
            await BookModel.deleteOne({bookId:bookId});
            return true;
        }else{
            return false;
        }
    }
    async saveIt(newBook){
        await BookModel.insertMany(newBook);
        return true;
    }
}

module.exports = Book;