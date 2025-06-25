import React, { useState } from 'react';
import { GraduationCap, Users, Award, BookOpen, Star, Mail, Phone, User, ChevronRight, Flag, Lock, LockIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Enquiry, Login } from '../../Redux/Slices/User/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Landingpage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [islogin,setIslogin] = useState(false);
  const [faded,setfaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });

   const [login, setLogin] = useState({
    email: '',
    password:''
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e)=>{
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    const {name ,email, course , phone} = formData

     if(name === "" || name === " "){
      return toast.error("name is required");
     }else if(email === ""){
      return toast.error("email is mandatory");
     }else if(!email.includes("@")){
      return toast.error("please enter valid email");
     }else if(phone === ""){
       return toast.error("Phone number is required")
     }else if(phone.length< 10 || phone.length>10 ){
      return toast.error("please enter valid phone number");
     }else{
          try {
            setfaded(true);
      dispatch(Enquiry(formData)).then((res)=>{
        if(res.payload){
      setSuccessMsg(' Enquiry submitted successfully! We\'ll contact you soon.');   
      setFormData({ name: '', email: '', phone: '', course: '' });
     
      setfaded(false)
      setTimeout(() => {
         setSuccessMsg("")
      }, 3000);

      setTimeout(() => 
        setIsFormOpen(false)
      , 2000);
        }
      })
      
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
    }
     }
   

   
  };

   const handleLogin = async (e) => {
    e.preventDefault();
    const {email,password} = login


      if(email === ""){
      return toast.error("email is mandatory");
     }else if(!email.includes("@")){
      return toast.error("please enter valid email");
     }else if(password === ""){
      return toast.error("please enter password");
     }else{
      dispatch(Login(login)).then((res)=>{
      if(res.payload){
        navigate("/admin")
      }
    })
     }
    
  };

  const courses = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Medicine',
    'Arts & Design',
    'Law'
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Students' },
    { icon: Award, number: '95%', label: 'Success Rate' },
    { icon: BookOpen, number: '50+', label: 'Courses' },
    { icon: Star, number: '4.9', label: 'Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              EduVerse
            </span>
          </div>
         <span className='flex gap-10'>
             <button
            onClick={() => setIsFormOpen(true)}
            className="group relative px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Enquire Now</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>

            
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>


           <button
            onClick={() => setIslogin(true)}
            className="group relative px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <LockIcon className="w-4 h-4" />
              <span>Autherity Login</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>

            
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
         </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Shape Your
            </span>
            <br />
            <span className="text-white">Future Today</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful students who transformed their dreams into reality. 
            Your extraordinary journey begins with a single click.
          </p>
          
          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => setIsFormOpen(true)}
              className="group px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-bold text-lg shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-110 transition-all duration-300"
            >
              🚀 Enquire about course
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">World-Class Education</h3>
              <p className="text-gray-300">Learn from industry experts with cutting-edge curriculum designed for tomorrow's challenges.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Global Community</h3>
              <p className="text-gray-300">Connect with peers from around the world and build lifelong professional networks.</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Career Success</h3>
              <p className="text-gray-300">95% of our graduates land their dream jobs within 6 months of completion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"onClick={() => setIsFormOpen(false)}>
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md relative shadow-2xl border border-white/20 transform animate-in slide-in-from-bottom-5 duration-300">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Begin?</h2>
              <p className="text-gray-600">we'll create application and we'll get back to you within 24 hours!</p>
            </div>

            {successMsg && (
              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4 text-center">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4" onClick={(e)=>{e.stopPropagation()}}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                />
              </div>

              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white/80 appearance-none"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>{course}</option>
                  ))}
                </select>
              </div>

             <button
  type="button"
  onClick={handleSubmit}
  className={`w-full text-white py-4 rounded-xl font-semibold transform transition-all duration-300 shadow-lg
    ${faded 
      ? 'bg-gradient-to-r from-purple-900 to-pink-900 hover:cursor-not-allowed' 
      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-xl'}
  `}
>
  Enquiry Now
</button>

            </div>
          </div>
        </div>
      )}





      {islogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"  onClick={() => setIslogin(false)}>
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md relative shadow-2xl border border-white/20 transform animate-in slide-in-from-bottom-5 duration-300">
            <button
              onClick={() => setIslogin(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors"
            >
              ×
            </button>

            <div className="text-center mb-6">
            
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
             
            </div>

            <div className="space-y-4" onClick={(e)=>{e.stopPropagation()}}>
            

              <div className="relative" >
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleLoginChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                  required
                />
              </div>



              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
               Login
              </button>
            </div>

           
          </div>
        </div>
      )}
    </div>
  );
};

export default Landingpage;