import React, { useState } from "react";
import './UpdatePassword.css'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { toast } from "react-toastify";
import { NavLink, useParams, useNavigate  } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';

function UpdatePassword(){
     const navigate = useNavigate();
let [pass,showPass]=useState(false)
let [pass1,showPass1]=useState(false)
const [update,successUpdate]=useState(false);

const { token } = useParams();


  const [formData, setFormData] = useState({
    password: "",
    confirmpassword:"",
  });
 
  const { password,confirmpassword  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function changePassword(e){
   e.preventDefault();
       if (!password || !confirmpassword) {
         toast.error("All field are required");
         return;
       }

       if(password!==confirmpassword){
        toast.warn("Password and Confirm Password not match")
        return;
       }

      try {

      const res = await axios.post("http://localhost:4000/api/v1/auth/resetPassword", {
  password,
  confirmPassword: confirmpassword,  // match backend field
  token
      },
    
);
        toast.success("Password reset successfully ✅");
        successUpdate(true);
        setTimeout(() => {
        navigate("/login");
        }, 2000);
       
    } catch (error) {
      console.error(error);
      toast.error("Unable to reset password");
    }
    finally{
        successUpdate(false);

    }
  }

  
    
    return(
        <div className="updatePassword">

            <div className="containerPass">
                 <h2>Choose new Password</h2>
                 <div>
                    Almost done Enter your new password 
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

                           <div>
                                     <label>Confirm Password</label>
                                     <input
                                       type={pass1?("text"):("password")}
                                       name="confirmpassword"
                                       value={confirmpassword}
                                       onChange={handleChange}
                                       placeholder="Enter your confirm password"
                                     
                                     />
                                     <span className="seepass1"
                                      onClick= {()=> showPass1(pass1=!pass1)}
                                      >
                                           {pass1 ?(<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                                        </span>
                                         
                        </div>

                        <button onClick={changePassword} disabled={update}>
                            {
                               !update ?"Reset Password":"Reset Password Successfully"
                            }
                        </button>

                        <div>
                                  <NavLink to="/login">
                                    <p>Back to login</p>
                                  </NavLink>
                        </div>
            </div>
            
        </div>
    )
}
export default UpdatePassword;