import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate,NavLink } from "react-router-dom";
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
// import img1 from '../../../Images/img1.jpg';
import ForgetPassword  from './ForgetPassword'

 import { setUser } from "../../slice/profileSlice";
 import { setToken } from "../../slice/authSlice";
import { showLoader,hideLoader } from "../../slice/loaderSlice";
 import { useDispatch } from "react-redux";
import './Login.css'
const Login = () => {
  const navigate = useNavigate();
  
const dispatch = useDispatch();
  let [pass,showPass]=useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      dispatch(showLoader())
      console.log(email, password,);
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }  
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token));
        // dispatch(setUser1(res.populate("additionalDetail")));
        toast.success(res.data.message || "Login successful");
        // console.log(res.data.user.accountType)
        dispatch(hideLoader())
      if(res.data.user.accountType=="Instructor")
      navigate("/dashboardInstructor")
      else 
      navigate("/dashboardStudent")
      } 
      else { 
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong during login"
      );
      dispatch(hideLoader())
    }
  };
  
  // function resetPassword(){
  //   navigate("/ForgetPassword")
  // }

  return (
    <div className="login-container">
     
             <h1>Join the millions learning to code with StudyNotion for free</h1>
             <h3>Build skills for today,tommarow ,and beyond</h3>
             <h3>Education to future-proof your career</h3>
           {/* <img src={img1} height="200px" width="200px"></img> */}
         
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
        
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type={pass?("text"):("password")}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
          
          />
          <span className="seepass"
           onClick= {()=> showPass(pass=!pass)}
           >
                {pass ?(<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
             </span>
              
        </div>

        <div className="resetPassword">
          <NavLink to='/forgetPassword'>Reset Password</NavLink> 
        </div>

        <button type="submit">Login</button>
          
      </form>
    </div>
  );
};

export default Login;
