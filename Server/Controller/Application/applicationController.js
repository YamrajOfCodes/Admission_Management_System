import ApplicationDb from "../../Model/Application/applicationSchema.js"
import adminDb from "../..//Model/Admin/adminSchema.js"
import EnquiryDb from "../../Model/Enquire/enquireSchema.js"
import studentDb from "../../Model/Student/studentSchema.js"
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"


export const Register = async(req,res)=>{

    
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"all fields are required"})
        }

        const adminvalid = await adminDb.findOne({email});

        if(adminvalid){
           return res.status(400).json("admin is alreday an axist")
        }

           const newadmin = new adminDb({
            email,password
           })

           await newadmin.save();

           res.status(200).json(newadmin)

        
        
    } catch (error) {
        console.log(error);
    }

}


export const Login = async(req,res)=>{

  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Both fields are required" });
    }

    const validadmin = await adminDb.findOne({ email });
    if (!validadmin) {
        return res.status(400).json({ error: "invalid credentials" });
    }

    const validpassword = await bcrypt.compare(password, validadmin.password);
    console.log('Password comparison result:', validpassword);

    if (!validpassword) {
        return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = await validadmin.generateToken();
    console.log(token);
    
    const result = {
        validadmin,
        token
    };

    res.status(200).json(result);
} catch (error) {
    console.error('Error during login process:', error);
    res.status(500).json({ error: "Internal Server Error" });
}

    

}

 export const adminverify = async(req,res)=>{

    try {

        const validadmin = await adminDb.findOne({_id:req.userId});
        
        if(validadmin){
            res.status(200).json(validadmin)
        }else{
            res.status(400).json({error:"invalid admin"})
        }
        
    } catch (error) {
        console.log(error);
    }

}


 export const Logout = async(req,res)=>{


    try {
        
        req.rootUser.tokens = req.rootUser.tokens.filter((element)=>{
            return req.rootUser.tokens !== req.token
        })

        await req.rootUser.save();

        res.status(200).json("user is logout")

    } catch (error) {
        
    }
 
}


export const createApplication = async (req, res) => {
  const {  name,email,course } = req.body;

  if(!name || !email || !course ){
    return res.status(400).json({error:"all fields are required"});
  }

  const deleteEnquiry = await EnquiryDb.deleteOne({email:email});
  console.log(deleteEnquiry);
  

  const app = new ApplicationDb({ course,name,email });
  await app.save();
  res.status(201).json(app);
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationDb.find({})
    res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    
  }
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;

  const updatedApp = await ApplicationDb.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  )

  if(status == "approved"){
    const newStudent = await studentDb({
      name:updatedApp.name,
      email:updatedApp.email,
      course:updatedApp.course
    })

    await newStudent.save();

     const transporter = nodemailer.createTransport({
          service: 'kundanpatil0111@gmail.com',
          auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
        });
    
        await transporter.sendMail({
          from:"kundanpatil0111@gmail.com" ,
          to: updatedApp?.email,
          subject: 'Admission Confirmed',
          text: `Hi ${updatedApp.name}, Welcome to the ${updatedApp.course}}`
        });
  }else{
    const deleteapplication = ApplicationDb.findByIdAndDelete(req.params.id);
    console.log("application deleted");
    
  }

  res.json(updatedApp);
};


export const getAllStudents = async (req, res) => {
  const students = await studentDb.find().sort({ createdAt: -1 });
   return res.json(students);
};
