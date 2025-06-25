import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  course:{
    type:String
  }
});

const EnquireModel =  mongoose.model('Enquiry', enquirySchema);
export default EnquireModel;
