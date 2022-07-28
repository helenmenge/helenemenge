const Book = require('../model/book');
const dummy = new Book();

exports.addNewBook = async (req,res)=>{
    const {bookId, isbn, title, author, publisher,publicationDate,
        bookAvaliability, penalityFee} = req.body;
    const newBook = new Book(bookId, isbn, title, author, publisher,
        publicationDate, bookAvaliability,penalityFee);
    const allBooks = await newBook.getAll();
    const existBook = allBooks.find(book=>book.bookId === newBook.bookId);
    if(existBook){
        console.log(existBook.bookAvaliability);
         newBook.bookAvaliability=Number(existBook.bookAvaliability) + Number(newBook.bookAvaliability);
         console.log(newBook.bookAvaliability);
         console.log(existBook)
         await newBook.updateById()
        res.json({success:true,data:"newBook"});
    }else{
        await dummy.saveIt(newBook).then(()=>{
        res.json({success:true,data:"newBook"});
    }).catch((err)=>{
       res.json({success:false, data:"could not save the book "+err});
    })
    }
    
}

exports.getAllBooks = async (req,res)=>{
    const books = await dummy.getAll();
    res.json({success:true, data:books})
}

exports.getBookById= async (req,res)=>{
    const book = await dummy.getById(req.params.bookId);
    if(book){
        res.json({success:true,data:book})
    }else{
        res.json({success:false, data:"The book does not avaliable"})
    }
    
}

exports.updateBookById =async (req, res)=>{
    const {bookId, isbn, title, author, publisher,
        publicationDate, bookAvaliability, penalityFee} = req.body;
    const reqBook = new Book(bookId, isbn, title, author, publisher,
        publicationDate, bookAvaliability, penalityFee);
    await reqBook.updateById().then(()=>{
        res.json({success:true, data:reqBook})
    }).catch((err)=>{
        res.json({success:false, data:"Could not update the book "+err})
    })    
}

exports.deleteBookById = async (req, res)=>{
    const book = await dummy.deleteById(req.params.bookId);
    if(book){
        res.json({success:true, data:"Deleted"});
    }else{
        res.json({success:false, data:"Not Deleted"})
    }
}