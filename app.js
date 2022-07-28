const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/user');
const bookRouter = require('./routers/book');
const borrowersRouter = require('./routers/borrowers');


mongoose.connect('mongodb://localhost:27017/LibraryBooksMangement', err=>{
    if(err){
        console.log('DB Error')
    }else{
        console.log('DB Connected')
    }
});

const server= express();
  
server.use(cors());
server.use(express.json());

server.use('/users',userRouter);
server.use('/books', bookRouter);
server.use('/borrowers',borrowersRouter);

server.use((req,res,next)=>{
    res.send('The API is not supported')
})

server.use((err,req,res,next)=>{
    if(err & err.message){
        res.send(err.message)
    }else{
        res.send('Internal Server Error')
    }
})

server.listen(3000,()=> console.log('listening on 3000.....'))
