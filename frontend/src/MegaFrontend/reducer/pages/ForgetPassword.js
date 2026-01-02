import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./ForgetPassword.css";
import { showLoader,hideLoader } from "../../slice/loaderSlice";
import { useDispatch } from "react-redux";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
const dispatch=useDispatch()
  const sendMail = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email id");
      return;
    }

    try {
              dispatch(showLoader())
      
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/resetPasswordToken`,
        { email }
      );
      toast.success(res.data.message);
      setEmailSent(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send reset password link"
      );
    } finally {
      setLoading(false);
              dispatch(hideLoader())
      
    }
  };

  return (
    <div className="reset">
      <div className="resetBox">
        <h2>{!emailSent ? "Reset your Password" : "Check Your Email"}</h2>

        <div className="emailText">
          {!emailSent
            ? "We'll email you instructions to reset your password. If you don’t have access to your email we can try account recovery."
            : `We have sent a reset link to ${email}`}
        </div>

        {!emailSent && (
          <div className="email">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        )}

        <div>
          <button onClick={sendMail} disabled={loading}>
            {loading
              ? "Sending..."
              : !emailSent
              ? "Reset Password"
              : "Resend Email"}
          </button>
        </div>

        <div>
          <NavLink to="/login">
            <p>Back to login</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
