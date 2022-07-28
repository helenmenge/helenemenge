const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId:{ type: String, require: true, unique:true },
    name: { type: String, require: true},
    phone: { type: String},
    email: { type: String, require: true, unique:true },
    password: { type: String, require: true},
    role: { type: String, reqired: true}
});

const UserModel = mongoose.model('user',UserSchema);

class User{
    constructor(userId,name,phone,email,password,role){
        this.userId= userId;
        this.name= name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    async getAll(){
       const allUsers= await UserModel.find();
       return allUsers;
    }
    async getById(userId){
        const singleUser = await UserModel.findOne({userId:userId});
        return singleUser;
    }
    async updateById(){
        const user = this.getById(this.userId);
        if(user){
            await UserModel.updateOne({userId:this.userId}, this);
            return true;
        }else{
            return false;
        }
        
    }
    async deleteById(userId){
        const user = this.getById(userId);
        if(user){
            await UserModel.deleteOne({userId:userId});
            return true;
        }else{
            return false;
        }
    }
    async saveIt(newUser){
        await UserModel.insertMany(newUser);
        return true;
    }
}

module.exports = User;