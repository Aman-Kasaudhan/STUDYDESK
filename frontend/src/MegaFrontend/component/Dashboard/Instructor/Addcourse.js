import {React,useEffect} from "react";
import RenderSteps from './RenderSteps'
import { useSelector ,useDispatch} from "react-redux";
import './AddCourse.css'
import { Navigate, useNavigate } from "react-router-dom";

function AddCourse(){
const navigate=useNavigate();

const { step } = useSelector((state) => state.course);

 
    return(
        <div style={{backgroundColor:"grey" }}>
     
             
             <div >
               <div className="heading">
        {step === 1 && <h1>Add Course Info</h1>}
        {step === 2 && <h1>Add Section and Lectures</h1>}
        {step === 3 && <h1>Publish Course</h1>}
      </div>
                <div>
                    
                    <RenderSteps/>
                </div>
             </div>

             <div >
               
                {
                step==1 && <div className="courseTips">
            
                    <p>Course Uploading Tips</p>

                <ul>
                    <li>Set the course price option or make it free</li>
                    <li>Standard size for te course thumbnail is 1024x576</li> 
                    <li>Video section control the course overview video</li>
                    <li>Set the course price option or make it free</li>
                    <li>Standard size for te course thumbnail is 1024x576</li> 
                    <li>Video section control the course overview video</li>
                    
                </ul>

             </div>}

                
             </div>
        </div>
    )
}

export default AddCourse;