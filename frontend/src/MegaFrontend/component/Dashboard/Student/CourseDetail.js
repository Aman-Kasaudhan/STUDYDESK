import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './Coursedetail.css'
import { useDispatch ,useSelector} from "react-redux";
import { addToCart } from "../../../slice/cartSlice";import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";

import { showLoader,hideLoader } from "../../../slice/loaderSlice";
function CourseDetail() {
  const {user}=useSelector( (state)=>state.profile)
     const {totalItems}=useSelector( (state)=>state.cart)
 const navigate=useNavigate();
  const { id } = useParams(); // ✅ get course ID from URL
  const [course, setCourse] = useState(null); // ✅ name should be singular
//   console.log("Course ID from params:", id);
const dispatch = useDispatch();
console.log(id)
  useEffect(() => {
              dispatch(showLoader())
    
    async function fetchCourseData() {
      try {
        const res = await axios.get(
         `${process.env.REACT_APP_BASE_URL}/course/getCourseDetailByCourseId/${id}`
        );

        // Assuming your backend returns:
        // { success: true, courseDetail: { ...course object... } }
        const courseData = res.data.courseDetail;
        if (!courseData) {
          toast.warn("Course not found");
          return;
        }
 
        setCourse(courseData);
                  dispatch(hideLoader())
        
      } catch (err) {
        console.error("Error fetching course:", err);
        toast.error("Unable to fetch course");
                 dispatch(hideLoader())
        
      }
    }

    if (id) fetchCourseData(); // ✅ only call if id exists
  }, [id]);

  if (!course) return <p>Loading course details...</p>;
// console.log(course);

const handleAddToCart = () => {
  dispatch(addToCart(course)); // send full course object

};
function handlePurchase(courseID) {
  toast.success("Proceeding to payment...");
  // Example: navigate(`/checkout/${courseID}`); // if you have a payment route
             navigate(`/single-payment/${course._id}`)


}
  return (
    <div className="topCourse">
      
      {
                    user && user?.accountType!="Instructor" &&(
                        <Link to="/cart-items" className="cartSymbol" title="Your Cart">
    <FaShoppingCart size={29} style={{ cursor: "pointer",color:"blue"}} />
                           
                        {
                            totalItems>0&&(
                                <span className='cartNumberItem11'
                                >
                                    {totalItems}
                                </span>
                            )

                          }
                    </Link>
                    )
                }
                 
  <div className="course-detail-container">
    {/* LEFT SIDE */}
    <div className="course-detail-left">
      <h2>Course Name: {course.courseName}</h2>
      <p>{course.description}</p>

      {/* Tags */}
      {course.tag && course.tag.length > 0 && (
        <div className="tags">
          <h3>Tags:</h3>
          <ul>
            {course.tag.map((t, i) => (
              <li key={i}>{t.replace(/[\[\]"]/g, "")}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructions */}
      {course.instruction && course.instruction.length > 0 && (
        <div className="instructions">
          <h3>Instructions:</h3>
          <ol>
            {course.instruction.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>

    {/* RIGHT SIDE */}
    <div className="course-detail-right">
      <img
        src={course.thumbnail || "https://via.placeholder.com/800"}
        alt={course.courseName}
        className="course-detail-image"
      />
      <p><strong>Price:</strong> ₹{course.price}</p>
      <p><strong>Category:</strong> {course?.category?.name || "N/A"}</p>
      <p>
        <strong>Instructor:</strong>{" "}
        {course?.instructor
          ? `${course.instructor.firstName} ${course.instructor.lastName}`
          : "N/A"}
      </p>

      {
        user?.accountType!="Instructor" && <div className="course-buttons">
        <button onClick={() => handleAddToCart (course._id)}>Add to Cart</button>
        <button onClick={() => handlePurchase(course._id)}>Buy Now</button>
      </div>
        }
     
    </div>
  </div>
  </div>
);

}

// ✅ Add to Cart Logic
// function addToCart(courseID) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   if (!cart.includes(courseID)) {
//     cart.push(courseID);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success("Course added to cart!");
//   } else {
//     toast.info("Already in cart");
//   }
// }

// ✅ Buy Now Logic


export default CourseDetail;
