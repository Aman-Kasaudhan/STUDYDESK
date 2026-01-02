import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { toast } from "react-toastify";
import './Draft.css'
import { setCourse,setStep } from "../../../slice/courseSlice";
import { showLoader,hideLoader } from "../../../slice/loaderSlice";
function MyCourses(){
     const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
       const [publishCourses,setPublishcourses]=useState([]);
       const navigate=useNavigate();
       const dispatch=useDispatch();
    // const userId = req.user.id; 
       const { course } = useSelector(state => state.course);
    const courseId= course?._id
    useEffect(()=>{

   
    async function as(){
          dispatch(showLoader())
      
        try{
            
   const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/course/getAllCourses`,
    // user?._id,
            {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
           withCredentials: true,
        }

)

setPublishcourses(res.data.publishCourse);
          dispatch(hideLoader())

    }
    catch(err){
      toast.warn("Unable to fetch published courses");
      console.error("Error fetching courses:", err.response?.status, err.response?.data);
          dispatch(hideLoader())
      
      return;
    }
    }
as()
 },[]) 
    
 async function handleEdit(courseId) {
          dispatch(showLoader())

  try {
    const res = await axios.get(
     `${process.env.REACT_APP_BASE_URL}/course/getCourseDetailByCourseId/${courseId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
  );
console.log(res.data.courseDetail)
    dispatch(setCourse(res.data.courseDetail));
    dispatch(setStep(1));
          dispatch(hideLoader())

    navigate("/dashboard/add-courses");
  } catch {
    toast.error("Unable to load draft course");
          dispatch(hideLoader())
   
  }
}


 async function handleDelete(courseId,courseName){
  // console.log(courseId);
          dispatch(showLoader())

       try{
        const deleteSection=await axios.post(`${process.env.REACT_APP_BASE_URL}/course/deleteCourse/${courseId}`,
             courseId,
        
         {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
           withCredentials: true,
        }
      )
      toast.success(`${courseName} course is deleted`)
          dispatch(hideLoader())

       window.location.reload()
       }
       catch(err){
         toast.warn("Unable to delete the course")
          dispatch(hideLoader())
        
       }
 }

 
return (
  <div className="draftContainer">
    {publishCourses.length === 0 && <p>No published courses found.</p>}
    {publishCourses.map(course => (
      <div key={course._id} className="course-container">
        <img src={course.thumbnail} className="draftImage"></img>
        <h3 className="draftName"> Course Name: {course.courseName}</h3>
        {/* <p className="draftDesc"> Course description: {course.courseDescription}</p> */}
        <p className="draftPrice">Price: {course.price}</p>
        <p className="draftCategory">
     Category: {course.category?.name || "Unknown"}
   </p>
   <p className="draftTime">Created :{course.createdAt}</p>
        <div className="draftButton">
        <button onClick={() => handleEdit(course._id)} className="draftEdit">Edit</button>
        <button onClick={() => handleDelete(course._id,course.courseName)} className="draftDelete">Delete</button>
      </div>

      </div>
    ))}
  </div>
);
}

export default MyCourses;