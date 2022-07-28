const Borrower = require('../model/borrowers');
const dummy = new Borrower();

exports.addNewBorrower = async (req,res)=>{
    const {books, userId, borrowDate, returnDate, 
        allowDuration,totalPenality,paymentMethod} = req.body;
    const reqBorrower = new Borrower(books, userId, borrowDate, returnDate, 
        allowDuration,totalPenality,paymentMethod);
    const borrow = await dummy.saveIt(reqBorrower);
    if(borrow){
        res.json({success:true, data:reqBorrower})
    }else{
        res.json({success:false,data:"Could not save Borrower"})
    }
}

exports.getAllBorrowers = async (req,res)=>{
    const borrowers = await dummy.getAll();
    res.json({success:true, data:borrowers})
}

exports.getBorrowerById = async (req,res)=>{
    const borrower = await dummy.getById(req.params.userId);
    if(borrower){
        res.json({success:true, data:borrower});
    }else{
        res.json({success:false, data:"Borrower does Not Avaliable"})
    }
}

exports.updateBorrowerById = async (req, res)=>{
    const {books, userId, borrowDate, returnDate, 
        allowDuration,totalPenality,paymentMethod}= req.body;
    const reqBorrower = new Borrower(books, userId, borrowDate, returnDate, 
        allowDuration,totalPenality,paymentMethod);
    const borrower = await reqBorrower.updateById();
    if(borrower){
        res.json({success:true, data:"Updated!"})
    }else{
        res.json({success:false, data:"Not updated"})
    }

}

exports.deleteBorrowerById= async(req,res)=>{
    const borrower = await dummy.deleteById(req.params.userId);
    if(borrower){
        res.json({success:true, data:"Deleted"});
    }else{
        res.json({success:false})
    }
}