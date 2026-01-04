import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "./navbar";
import { showLoader, hideLoader } from "../../slice/loaderSlice";
import { toast } from "react-toastify";
import "./StudentAdmin.css";

export default function Students() {
  const token = useSelector((state) => state.auth.token);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const dispatch = useDispatch();

  async function fetchStudent() {
    dispatch(showLoader());

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudents(res.data.data || []);
            dispatch(hideLoader());

    } catch (err) {
      toast.warn("Unable to fetch students");
            dispatch(hideLoader());
return;
    }
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  const blockUser = async (id) => {
    dispatch(showLoader());
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/admin/block/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStudent();
    } catch (err) {
      toast.warn("Unable to block student");
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="admin-students">
        <h2>All Students</h2>

        <div className="student-grid">
          {students.map((stu) => (
            <div className="student-card" key={stu._id}>
              {/* Header */}
              <div className="student-header">
                <div>
                  <h3>{stu.firstName} {stu.lastName}</h3>
                  <p className="email">{stu.email}</p>
                </div>

                <span className={`badge ${stu.isBlocked ? "blocked" : "active"}`}>
                  {stu.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>

              {/* Actions */}
              <div className="actions">
                <button
                  className="btn view"
                  onClick={() => setSelectedStudent(stu)}
                >
                  View Courses
                </button>

                <button
                  className="btn block"
                  onClick={() => blockUser(stu._id)}
                >
                  {stu.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT DRAWER ===== */}
      {selectedStudent && (
        <div
          className="drawer-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h3>
                {selectedStudent.firstName}{" "}
                {selectedStudent.lastName}
              </h3>
              <button
                className="close-btn"
                onClick={() => setSelectedStudent(null)}
              >
                ✕
              </button>
            </div>

            <p className="drawer-email">{selectedStudent.email}</p>

            <h4>Enrolled Courses</h4>

            {selectedStudent.courses.length === 0 && (
              <p className="empty">No enrolled courses</p>
            )}

            {selectedStudent.courses.map((course) => (
              <div key={course._id} className="drawer-course">
                <strong>{course.courseName}</strong>
                <p className="price">₹{course.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
