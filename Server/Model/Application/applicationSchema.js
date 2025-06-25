import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name:{ 
    type: String, 
    required: true 
   },
  email:{ 
    type: String, 
    required: true 
  },
  course: { 
   type: String, 
   required: true 
},
status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

const applicationModel = mongoose.model('Application', applicationSchema);
export default applicationModel;
