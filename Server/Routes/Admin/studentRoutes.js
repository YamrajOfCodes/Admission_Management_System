import express from "express";
import { adminverify, createApplication, getAllApplications,updateStatus, Login, Logout, Register, getAllStudents } from "../../Controller/Application/applicationController.js";
import authenticate from "../../Middleware/adminAuthenticate.js"
const router = express.Router();

router.post("/admin-register",Register)
router.post('/admin-login',Login);
router.get('/admin-verify',authenticate,adminverify);
router.post("/admin-logout",authenticate,Logout);


router.post("/createapplication",authenticate,createApplication);
router.get("/getallapplications",authenticate,getAllApplications);
router.put("/updatestatus/:id",authenticate,updateStatus);
router.get("/getallstudents",authenticate,getAllStudents);



export default router;