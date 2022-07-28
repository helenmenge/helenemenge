const mongoose = require('mongoose');

const BorrowerSchema = mongoose.Schema({
    books: {
        type: [
            {
                bookId: { type: String },
                quantity: { type: Number }
            }
        ], required: true
    },
    userId: { type: String, required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, require: true },
    allowDuration: { type: Number, require: true },
    totalPenality: { type: Number},
    paymentMethod: { type: String}
});

const BorrowerModel = mongoose.model('borrower', BorrowerSchema);

class Borrower {
    constructor(books, userId, borrowDate, returnDate,
        allowDuration, totalPenality, paymentMethod) {
        this.books = books;
        this.userId = userId;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.allowDuration = allowDuration;
        this.totalPenality = totalPenality;
        this.paymentMethod = paymentMethod;
    }
    async getAll() {
        const allBorrowers = await BorrowerModel.find();
        return allBorrowers;
    }
    async getById(userId) {
        const singleBorrower = await BorrowerModel.findOne({ userId: userId });
        return singleBorrower
    }
    async updateById() {
        const borrowe = await this.getById(this.userId);
        if (borrowe) {
            await BorrowerModel.updateOne({ userId: this.userId},this);
            return true;
        } else {
            return false;
        }
    }
    async deleteById(userId) {
        const borrower = await this.getById(userId);
        if (borrower) {
            await BorrowerModel.deleteOne({ userId: userId });
            return true;
        } else {
            return true;
        }
    }
    async saveIt(newBorrower) {
        await BorrowerModel.insertMany(newBorrower);
        return true;
    }
}

module.exports = Borrower;