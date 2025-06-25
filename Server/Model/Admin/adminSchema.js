import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const USER_SECRET = "djshdi"
import jwt from "jsonwebtoken"


const adminSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true
},
  password: { 
    type: String, 
    required: true 
},
tokens:[
    {
     token:{
        type:String
     }
    }
]
});


adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


adminSchema.methods.generateToken=async function(req,res){
    try {
     const newtoekn=jwt.sign({_id:this._id},USER_SECRET,{
       expiresIn:"1d"
     });
     this.tokens=this.tokens.concat({token:newtoekn})
     await this.save();
     return newtoekn
   
    } catch (errors) {
    console.log(errors);
    }
   }

const adminModel = mongoose.model('Admin', adminSchema);
export default adminModel;
