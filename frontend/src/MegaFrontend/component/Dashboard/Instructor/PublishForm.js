import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setCourse, setStep } from "../../../slice/courseSlice";
import './PublishForm.css'
import InstructorDashboard from './InstructorImageDashboard'
import { useNavigate } from "react-router-dom";
import {resetCourse} from '../../../slice/courseSlice'
import { useState } from "react";
function PublishForm(){
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    // console.log("course",course)
    const dispatch =useDispatch();
    const navigate=useNavigate();
// const [publih ,setPublish]=useState("Draft");
    function goback(){
      dispatch(-1)
    }

    function draft(){
      navigate("/dashboard/draft")
      //  window.location.reload();
      toast.success("This course is Saved in Draft Box")
    }
  async function publish(){
    try{
       const res=await axios.put(`http://localhost:4000/api/v1/course/updateCourse/${course?._id}`,
        {status:"Published"}
        ,{
          headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data"
      }
        }
    )
        dispatch(setCourse(res.data.course));
    
       toast.success("This course is uploaded Successfully")
       dispatch(resetCourse());
      navigate("/dashboardInstructor")
      //  window.location.reload()
    }
    catch(error){
      toast.warn("Unable to publish course")
      return;
    }
    }
    return(
     <div className="publish1"> 
     <div className="publishContainer"> 
        <h2 style={{margin:"10px 40px"}}>Please save your choice </h2>
       <div className="action-bar"> 

        <div className="left-buttons">
        <button className="btn draft" onClick={draft}>Draft</button>
        <button className="btn publish" onClick={publish}>Publish</button>
        </div>

      {/* Right side button */}
      <div>
      <button className="btn go-back" onClick={goback}>Go Back</button>
    </div>

    </div>
    </div>
    </div>
   
    )
}
export default PublishForm;