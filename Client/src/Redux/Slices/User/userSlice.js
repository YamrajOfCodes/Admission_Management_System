import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { AdminLoginAPI, AdminLogoutAPI, createApplicationAPI, EnquiryAPI, getallstudentsAPI, getApplicationAPI, getEnquiryAPI, updateStatusAPI } from "../../../API/CombineAPI/allApi";



export const Login = createAsyncThunk("login",async(data)=>{
    try {
        const response  = await AdminLoginAPI(data);
        if(response.status==200){
            toast.success("login successfull");
            localStorage.setItem("admin",response.data.token)
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const Logout = createAsyncThunk("logout",async(data)=>{
    try {
        const response  = await AdminLogoutAPI();
        if(response.status==200){
            toast.success("logout successfull");
            localStorage.removeItem("admin");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})







export const Enquiry = createAsyncThunk("addenquiry",async(data)=>{
    try {
        const response  = await EnquiryAPI(data);
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const getEnquiry = createAsyncThunk("getenquires",async(data)=>{
    try {
        const response  = await getEnquiryAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const CreateApplication = createAsyncThunk("createapplication",async(data)=>{
    try {
        const response  = await createApplicationAPI(data);
        if(response.status==200){
            toast.success("application is created")
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const getApplication = createAsyncThunk("getapplication",async()=>{
    try {
        const response  = await getApplicationAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})



export const updateStatus = createAsyncThunk("updatestatus",async(data)=>{
    try {
        const response  = await updateStatusAPI(data);
        if(response.status==200){
            toast.success("status updated successfully");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const getAllStudents = createAsyncThunk("getallstudents",async()=>{
    try {
        const response  = await getallstudentsAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})








  const userSlice  = createSlice({
    name:"userSlice",
    initialState:{
        login:[],
        logout:[],
        addenquiry:[],
        getenquires:[],
        createapplication:[],
        getallapplications:[],
        updatestatus:[],
        getallstudents:[],
        loader:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(Login.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Login.fulfilled,(state,action)=>{
            state.loader = false,
            state.login = [action.payload]
        })
        .addCase(Login.rejected,(state,action)=>{
            state.error = [action.payload]
        })



        builder.addCase(Logout.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Logout.fulfilled,(state,action)=>{
            state.loader = false,
            state.logout = [action.payload]
        })
        .addCase(Logout.rejected,(state,action)=>{
            state.error = [action.payload]
        })



          builder.addCase(Enquiry.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Enquiry.fulfilled,(state,action)=>{
            state.loader = false,
            state.addenquiry = [action.payload]
        })
        .addCase(Enquiry.rejected,(state,action)=>{
            state.error = [action.payload]
        })



        builder.addCase(getEnquiry.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getEnquiry.fulfilled,(state,action)=>{
            state.loader = false,
            state.getenquires = [action.payload]
        })
        .addCase(getEnquiry.rejected,(state,action)=>{
            state.error = [action.payload]
        })


         builder.addCase(CreateApplication.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(CreateApplication.fulfilled,(state,action)=>{
            state.loader = false,
            state.createapplication = [action.payload]
        })
        .addCase(CreateApplication.rejected,(state,action)=>{
            state.error = [action.payload]
        })



         builder.addCase(getApplication.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getApplication.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallapplications = [action.payload]
        })
        .addCase(getApplication.rejected,(state,action)=>{
            state.error = [action.payload]
        })


         builder.addCase(updateStatus.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(updateStatus.fulfilled,(state,action)=>{
            state.loader = false,
            state.updatestatus = [action.payload]
        })
        .addCase(updateStatus.rejected,(state,action)=>{
            state.error = [action.payload]
        })


          builder.addCase(getAllStudents.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getAllStudents.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallstudents = [action.payload]
        })
        .addCase(getAllStudents.rejected,(state,action)=>{
            state.error = [action.payload]
        })
    }
})

export default userSlice.reducer;