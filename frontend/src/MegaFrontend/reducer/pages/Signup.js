 
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState , useEffect} from "react";
import './Signup.css';
import { Navigate, useNavigate } from "react-router-dom";
import StudentImageDashboard from "../../component/Dashboard/Student/DashboardContent/StudentImageDashboard";
import InstructorDashboard from "../../component/Dashboard/Instructor/InstructorImageDashboard";
import { setUser } from "../../slice/profileSlice";
import { setToken } from "../../slice/authSlice";
import { hideLoader,showLoader } from "../../slice/loaderSlice";
 import { useDispatch } from "react-redux";
const SignupForm = () => {
   const dispatch=useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    accountType: "Student",
    otp: "",
    
  });

    const { firstName ,
    lastName ,
    email ,
    password ,
    confirmpassword  ,otp } = formData;


    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);


 useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    else if (timer === 0) {
    setResendDisabled(false); // ENABLE the resend button again
  }
    return () => clearInterval(interval);
  }, [timer]);

   

  function handleStartResendTimer() {
    setTimer(30); // 30 second countdown
    setResendDisabled(true);
  }

  async function handleResendOTP() {
       if (password !== confirmpassword) {
      toast.warn("Passwords do not match");
      return;
    }
    dispatch(showLoader())

    try {
    const res = await axios.post("http://localhost:4000/api/v1/auth/sendotp", {
        email: formData.email, });
        
      toast.success("OTP resent to your email");
      handleStartResendTimer();
      dispatch(hideLoader())
    } catch (err) {
      toast.error("Failed to resend OTP");
      dispatch(hideLoader())
    }
  }

  const sendOtp = async () => {
    if(!firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmpassword  ){
      toast.warn("All field are required")
      return;
    }

       if (password !== confirmpassword) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      dispatch(showLoader())
      const res = await axios.post("http://localhost:4000/api/v1/auth/sendotp", {
        email: formData.email,
      });
      toast.success("OTP sent to your email");

      setMessage(res.data.message);
      setOtpSent(true);
      dispatch(hideLoader())
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
      toast.error("Failed to send OTP");
      dispatch(hideLoader())

    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();  
    
    if (password !== confirmpassword) {
      toast.warn("Passwords do not match");
      return;
    }

    dispatch(showLoader())
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/signUp", formData);
      setMessage(res.data.message);
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success("User is registered successfully");
      // console.log(res.data.user.accountType);
      dispatch(hideLoader())
      if(res.data.user.accountType=="Instructor")
      navigate("/dashboardInstructor")
     else 
      navigate("/dashboardStudent")
    }
     catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
      dispatch(hideLoader())

    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>  
        <div className="toggle-buttons">
  <button
    type="button"
    className={formData.accountType === "Student" ? "active" : ""}
    onClick={() => setFormData((prev) => ({ ...prev, accountType: "Student" }))}
  >
    Student
  </button>
  <button
    type="button"
    className={formData.accountType === "Instructor" ? "active" : ""}
    onClick={() => setFormData((prev) => ({ ...prev, accountType: "Instructor" }))}
  >
    Instructor
  </button>
</div>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmpassword" placeholder="Confirm Password" onChange={handleChange} required />
      


        {!otpSent ? (
          <button type="button" onClick={sendOtp}>Send OTP</button>
        ) : (
          <>
            <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} required />
            <button type="submit">Sign Up</button>

              <div>
           <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendDisabled}
              >
                {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </div>
        
          </>
        )}
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SignupForm;
