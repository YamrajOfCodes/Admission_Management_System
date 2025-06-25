import EnquiryDb from "../../Model/Enquire/enquireSchema.js";
import nodemailer from "nodemailer"

export const enquirySubmit = async (req,res)=>{
                        
    try {
    const { name, email, course,phone } = req.body;
    const enquiry = await EnquiryDb.create({ name, email, phone,course });

    
     const transporter = nodemailer.createTransport({
          service: 'kundanpatil0111@gmail.com',
          auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
        });

    await transporter.sendMail({
      from: 'kundanpatil0111@gmail.com',
      to: email,
      subject: 'Enquiry Received',
      text: `Hi ${name}, we have received your enquiry. We’ll get back to you soon.`
    });

    res.status(200).json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

 export const getallEnquiries = async(req,res)=>{
    try {
        const getallenquires = await EnquiryDb.find();
        return res.status(200).json(getallenquires);
    } catch (error) {
        console.log(error);
        
    }
}