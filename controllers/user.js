const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const dummy = new User();
const PRIVATE_KEY = "mykey";

exports.signUp = async (req,res)=>{
    const {userId,name,phone,email,password,role} = req.body;
    const hashPassword = bcrypt.hashSync(password,8);
    const newUser = new User(userId,name,phone,email,hashPassword,role);
    const allUsers = await newUser.getAll();
    const existingUser = allUsers.find((user)=>user.userId===userId);
    if(existingUser){
        res.json({success:false})
    }else{
        await dummy.saveIt(newUser).then(()=>{
            res.json({success:true, data:newUser});
        })
        .catch((err)=>{
            res.json({success:false})
        });
    }
}

exports.getAllUsers = async (req, res)=>{
    const allUsers = await dummy.getAll();
    if(allUsers){
        res.json({success:true,data:allUsers});
    }else{
        res.json({success:false})
    }
}

exports.getUserById = async (req,res)=>{
    const singleUser =  await dummy.getById(req.params.userId);
    if(singleUser){
        res.json({success:true, data:singleUser});
    }else{
        res.json({success:false})
    }
}

exports.updateUserById = async (req,res)=>{
    const {userId,name,phone,email,password,role} = req.body;
    const reqUser = new User(userId,name,phone,email,password,role);
    const user = await reqUser.updateById();
    if(user){
        res.json({success:true, data:reqUser});
    }else{
        res.json({success:false})
    }
}

exports.deleteUserById= async (req, res)=>{
    const user = await dummy.deleteById(req.params.userId);
    if(user){
        res.json({success:true});
    }else{
        res.json({success:false});
    }
}

exports.signin = async(req, res)=>{
    const { userId,email,password,role } = req.body;
    const user = await dummy.getById(userId);
    if((userId && email) && (password && role)){
        if(user.userId===userId &&
            user.email===email &&
            user.role===role){
            if(bcrypt.compareSync(password,user.password)){
                const accessToken = jwt.sign({
                    userId:user.userId,name:user.name,
                    email:user.email,role:user.role
                },PRIVATE_KEY);
                res.json({success:true, data:accessToken});
            }else{
                res.json({success:false,data:"Wrong password"});
            }
        }else{
            res.send({success:false,data:"The user not found"});
        }
    }else{
        res.json({success:false,data:"Please provide right information"})
    }
}

exports.authorization = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,PRIVATE_KEY,(err,user)=>{
            if(err){
                res.json({success:false, data:"Forbiden"});
            }else{
               // res.json({success:true, data:token});
                next();
            }
        })
    }else{
        res.json({success:false, data:"Anauthenticated"})
    }
}

exports.adminAuthorization = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,PRIVATE_KEY,(err,user)=>{
            req.user = user;
            if(err){
                req.json({success:false, data:"Forbiden"});
            }else{
                if(req.user.role === "Admin"){
                    next();
                }else{
                    res.json({success:false, data:"Not allowed"});
                }
            }
        })
    }
}
exports.userAuthorization = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,PRIVATE_KEY,(err,user)=>{
            req.user = user;
            if(err){
                req.json({success:false, data:"Forbiden"});
            }else{
                if(req.user.role === "User"){
                    next();
                }else{
                    res.json({success:false, data:"Not allowed"});
                }
            }
        })
    }
}