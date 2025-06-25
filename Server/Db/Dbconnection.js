import mongoose from "mongoose"


     
     const  dbConnect = async()=>{
       const connect =  await mongoose.connect(process.env.DATABASE_URL);

       if(connect){
        console.log("connected");
       }else{
        console.log("error while connect");
        
       }
    }
    

   export default dbConnect;