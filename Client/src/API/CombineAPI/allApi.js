import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"



// Admin APIs

export const AdminLoginAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/api/admin-login`,data,header,"admin");
}

export const AdminVerifyAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/api/admin-verify`,"",header,"admin");
}


export const AdminLogoutAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/api/admin-logout`,{},header,"admin");
}

export const getEnquiryAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/user/enquiry/getallenquires`,"",header,"admin");
}


export const createApplicationAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/api/createapplication`,data,header,"admin");
}

export const getApplicationAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/api/getallapplications`,data,header,"admin");
}

export const updateStatusAPI = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/admin/api/updatestatus/${data.id}`,data,header,"admin");
}



export const getallstudentsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/api/getallstudents`,{},header,"admin");
}






// User APIs

export const EnquiryAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/enquiry/add-enquiry`,data,header,"user");
}










