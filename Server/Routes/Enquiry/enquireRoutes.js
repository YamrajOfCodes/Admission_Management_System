import express from 'express';
import { enquirySubmit, getallEnquiries } from '../../Controller/Enquiry/enquireController.js';
const router = express.Router();


router.post("/add-enquiry",enquirySubmit);
router.get("/getallenquires",getallEnquiries);




export default router;