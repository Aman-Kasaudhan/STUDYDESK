
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Catlog.css";   // import css

function CatalogPage() {
  const { id } = useParams();   
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function categoryData() {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/v1/course/getCourseDetail",
          { courseID: id }
        );
        // console.log(res.data.courseDetail);
        const courseData = res.data.courseDetail || [];
        setCourses(courseData); 
        

        // console.log(courseData)
      }
       catch (err) {
        console.log(err);
        toast.warn("No course found");
      }
    }
    categoryData();
  }, [id]);

  return (
    <div className="catalog-container">
      <h2>All  {courses[0]?.category?.name} Courses </h2>
      {courses.length > 0 ? (
        <div className="course-list">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <img
                src={course.thumbnail || "https://via.placeholder.com/200"}
                alt={course.name}
                className="course-thumbnail"
              />
              <div className="course-info">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-price">₹{course.price}</p>
                <p className="course-instructor">
                  Instructor: {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p>
                <p className="course-category">
                  Category: {course?.category?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found for this category</p>
      )}
    </div>
  );
}

export default CatalogPage;
 