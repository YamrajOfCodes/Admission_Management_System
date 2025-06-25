const SECRET_KEY = "djshdi";
import jwt from "jsonwebtoken"
import adminDb from "../Model/Admin/adminSchema.js"

const adminauthenticate = async(req,res,next)=>{
  
    const token = req.headers.authorization;
    
    const verifyToken = jwt.verify(token,SECRET_KEY);
    
    const rootUser = await adminDb.findOne({_id:verifyToken._id});
    
    if(!rootUser){throw new Error("user not found")}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    next();

   
} 

export default adminauthenticate