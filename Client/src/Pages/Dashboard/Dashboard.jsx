import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Users, 
  FileText, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowUpRight,
  Mail,
  Phone,
  BookOpen,
  Filter,
  Search,
  MoreVertical,
  Eye
} from 'lucide-react';
import { CreateApplication, getAllStudents, getApplication, getEnquiry, Logout, updateStatus } from '../../Redux/Slices/User/userSlice';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [counts, setCounts] = useState({ enquiries: 0, applications: 0, students: 0 });
  const [enquiries, setEnquiries] = useState([{name:"df",id:"we",phone:"334343",course:'ds',status:"343e"}]);
  const [applications, setApplications] = useState([]);
  const [permission,setpermission] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {getenquires,createapplication,getallapplications,updatestatus,getallstudents} = useSelector((state)=>state.user);
  // console.log(getallstudents);
  

  useEffect(() => {
    getallStudents();
    fetchEnquiries();
    fetchApplications();
  }, [createapplication,updatestatus,getallstudents]);

 const getallStudents = async () => {
    dispatch(getAllStudents())
  };

  const fetchEnquiries = async () => {
     dispatch(getEnquiry())
  };

  const fetchApplications = async () => {
    dispatch(getApplication());
  };

  const convertToApplication = async (enquiry) => {
    dispatch(CreateApplication(enquiry))
  };

  const updateApplicationStatus = async (id, status,email,course) => {
    let data = {
        id,status,permission,email,course
    }
    dispatch(updateStatus(data))
  };


  const handleLogout = ()=>{
    dispatch(Logout()).then((res)=>{
      if(res.payload){
        navigate("/")
      }
    });
  }

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg  hover:cursor-pointer  transition-all duration-300" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <FileText className="w-8 h-8" />
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-3xl font-bold mb-2">{getenquires?.[0]?.length || 0}</div>
              <div className="text-blue-100">Total Enquiries</div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Clock className="w-8 h-8" />
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-3xl font-bold mb-2">{getallapplications?.[0]?.length || 0}</div>
              <div className="text-purple-100">Total Applications</div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-3xl font-bold mb-2">{getallstudents?.[0]?.length || 0}</div>
              <div className="text-green-100">Total Students</div>
            </div>
          </div>
        </div>

        {/* Enquiries Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Recent Enquiries</h2>
                <p className="text-gray-600">Manage and convert enquiries to applications</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student Info</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {getenquires?.[0]?.map((enquiry, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {enquiry?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{enquiry?.name}</div>
                            <div className="text-sm text-gray-500">{enquiry?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{enquiry?.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-purple-500" />
                          <span className="font-medium text-gray-900">{enquiry?.course}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => convertToApplication(enquiry)}
                          className="group relative px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                        >
                          Convert to App
                          <ArrowUpRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!getenquires?.[0] || getenquires?.[0]?.length === 0) && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <Mail className="w-12 h-12 text-gray-300" />
                          <span>No enquiries found</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Applications</h2>
                <p className="text-gray-600">Review and manage student applications</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {getallapplications?.[0]?.map((application, index) => (
                    <tr key={index} className="hover:bg-purple-50/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {application?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{application.name}</div>
                            <div className="text-sm text-gray-500">{application.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-purple-500" />
                          <span className="font-medium text-gray-900">{application.course}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                          {application.status === 'approved' && <CheckCircle className="w-4 h-4 mr-1" />}
                          {application.status === 'rejected' && <XCircle className="w-4 h-4 mr-1" />}
                          {application.status === 'pending' && <Clock className="w-4 h-4 mr-1" />}
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!["approved", "rejected"].includes(application?.status) && (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => updateApplicationStatus(application._id, 'approved',application.email,application.course)}
                              className="group px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(application._id, 'rejected')}
                              className="group px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                              <XCircle className="w-4 h-4 inline mr-1" />
                              Reject
                            </button>
                          </div>
                        )} 
                      </td>
                    </tr>
                  ))} 
                  {(!getallapplications?.[0] || getallapplications?.[0]?.length === 0) && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <Clock className="w-12 h-12 text-gray-300" />
                          <span>No applications found</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Students Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Enrolled Students</h2>
                <p className="text-gray-600">Currently enrolled students in various courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {getallstudents?.[0]?.map((student, index) => (
                    <tr key={index} className="hover:bg-green-50/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {student?.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-gray-900">{student.course}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!getallstudents?.[0] || getallstudents?.[0]?.length === 0) && (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <GraduationCap className="w-12 h-12 text-gray-300" />
                          <span>No students found</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;