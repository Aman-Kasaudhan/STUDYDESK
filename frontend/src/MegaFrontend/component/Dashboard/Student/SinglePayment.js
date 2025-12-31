import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoader,hideLoader } from "../../../slice/loaderSlice";
// SinglePayment - handles payment for a single course via courseId in the URL
export default function SinglePayment() {
  const { id } = useParams(); // courseId from URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const token=useSelector((state)=>state.auth.token);
  const {user}=useSelector((state)=>state.profile);
  // console.log(user?._id)
const dispatch=useDispatch()
  const VALID_CODES = ["FREE-COURSE","DISCOUNT-100%"];

useEffect(() => {
  dispatch(showLoader())
    async function fetchCourseData() {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/course/getCourseDetailByCourseId/${id}`
        );
 
        // Assuming your backend returns:
        // { success: true, courseDetail: { ...course object... } }
        const courseData = res.data.courseDetail;
        if (!courseData) {
          toast.warn("Course not found");
          return;
        }

        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching course:", err);
        toast.error("Unable to fetch course");
      }
      finally{
        dispatch(hideLoader())
      }
    }

    if (id) fetchCourseData(); // ✅ only call if id exists
  }, [id]);


  async function handlePayment  ()  {
    if (!code.trim()) return toast.error("Please enter a payment code");
    const isValid = VALID_CODES.includes(code.trim().toUpperCase());
    if (!isValid) return toast.error("Invalid payment code.");

     dispatch(showLoader())

     try{
  const res = await axios.put(`http://localhost:4000/api/v1/course/addStudentEnroll/${id}`,
    { 
      
      userId:user?._id
  },    // single ID
  {
    headers: {
      Authorization: `Bearer ${token}`,
    // "Content-Type": "multipart/form-data"
      }
  }

  );
}
catch(error){
        console.error("Error adding course:",error);
        toast.error("You are already buy this course");
              dispatch(hideLoader())
        return;
}


    try{
  // const res = await axios.put(`http://localhost:4000/api/v1/course/addStudentEnroll/${id}`);
 
 

await axios.post(
  "http://localhost:4000/api/v1/course/enroll-single",
  { courseId: id ,
    userId:user?._id
  },    // single ID
  {
    headers: {
      Authorization: `Bearer ${token}`,
    // "Content-Type": "multipart/form-data"
      }
  }
);
  }
catch (err) {
        // console.error("Error adding course:", err);
        toast.error("Unable to add course in enrolled section");
        dispatch(hideLoader())
        return;
      }
// console.log("guxi2")

 

    setTimeout(() => {
      
      const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
      const purchasedItem = { ...course, purchasedAt: new Date().toISOString() };
      localStorage.setItem("purchasedCourses", JSON.stringify([...purchasedCourses, purchasedItem]));
 
 
      // Remove course from cart after purchase
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.filter((c) => c._id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("totalItems", JSON.stringify(updatedCart.length));
      localStorage.setItem(
        "total",
        JSON.stringify(updatedCart.reduce((s, c) => s + Number(c.price || 0), 0))
      );
 
      toast.success(`Payment h successful for ${course.courseName}`);
 

      setTimeout(() => navigate("/dashboard/purchase-history"), 1000);
    }, 1000);

      dispatch(hideLoader())

  };

  if (!course) {
    return <div style={{ padding: 20 }}>Loading course details...</div>;
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        background: "#f5f7fb",
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(16,24,40,0.06)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Payment for: {course.courseName}</h2>
      <img
        src={course.thumbnail || "https://via.placeholder.com/300x180?text=Course"}
        alt={course.courseName}
        style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
      />
      <p style={{ color: "#475569", fontSize: 15 }}>Instructor: {course.instructor?.firstName || course.instructor}</p>
      <p style={{ color: "#334155", fontSize: 17, fontWeight: 600 }}>Price: ₹{course.price}</p>

      <input
        type="text"
        placeholder="Enter payment code (FREE-COURSE)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={loading}
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #e2e8f0",
          width: "100%",
          marginTop: 16,
          marginBottom: 12,
        }}
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "10px 18px",
          cursor: "pointer",
          width: "100%",
          fontSize: 16,
        }}
      >
        {loading ? "Processing..." : `Pay ₹${course.price}`}
      </button>

      <div style={{ marginTop: 20, fontSize: 13, color: "#94a3b8" }}>
        Valid demo codes: <strong>{VALID_CODES.join(", ")}</strong>
      </div>
    </div>
  );
}