import React, { useState } from "react";
import './Contact.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
 import axios from "axios";
 import { showLoader,hideLoader } from "../../slice/loaderSlice";
import { useDispatch } from "react-redux";
function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    message: "",
  });
  const dispatch =useDispatch()
const navigate=useNavigate()
  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  

async function submitHandler(e) {
  e.preventDefault();
  dispatch(showLoader())
  try {
    await axios.post("http://localhost:4000/api/v1/contact/admin", formData);
    await axios.post("http://localhost:4000/api/v1/contact/send/whatsapp", formData);

    toast.success("Message sent successfully!");
    dispatch(hideLoader())
  } catch (error) {
    toast.error("Failed to send message");
    dispatch(hideLoader())
  }
}



  return (
    <div className="contact"> 
    <div className="contact1">
      <div className="contactText">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you, please fill out this form</p>
      </div>

      <form onSubmit={submitHandler}>
        {/* Name */}
        <div className="contacName">
          <div className="firstName">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="lastName">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="contactEmail">
          <label>Email Address<sup>*</sup></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number</label>
          <div style={{ display: "flex", gap: "10px" }} className="phoneRow">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={changeHandler}
            >
              <option value="+91">+91</option>
              <option value="+92">+92</option>
              <option value="+44">+44</option>
              <option value="+96">+96</option>
              <option value="+23">+23</option>
            </select>
            <input
              type="phoneNumber"
              name="phoneNumber"
              
              value={formData.phoneNumber}
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label>Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={changeHandler}
          />
        </div>

        {/* Submit */}
        <button type="submit">Send Message</button>
      </form>
    </div>
    </div>
  );
}

export default ContactUs;
