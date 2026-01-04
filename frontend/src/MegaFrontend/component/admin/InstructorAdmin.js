import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./navbar";
import "./InstructorAdmin.css";
import { showLoader,hideLoader } from "../../slice/loaderSlice";
import { toast } from "react-toastify";

export default function Instructors() {
  const token = useSelector((state) => state.auth.token);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
const dispatch=useDispatch();

  const fetchInstructors = async () => {
     try{
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/instructors`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setInstructors(res.data.data || []);
    dispatch(hideLoader())
  }
  catch(err){
    toast.warn("Unable to fetch instructor detail")
    dispatch(hideLoader())
    return;

  }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const verifyInstructor = async (id) => {
    dispatch(showLoader())
   
    try{
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/admin/verify/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchInstructors();
    dispatch(hideLoader())
  }
  catch(err){
    toast.warn("Server Error")
    dispatch(hideLoader())
  }
  };
  
  
  const blockUser = async (id) => {
    dispatch(showLoader())
   
    try{
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/admin/block/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchInstructors();
    dispatch(hideLoader())

  }
  catch(err){
    toast.warn("Unable to block instructor")
    dispatch(hideLoader())
    return;
  }
  };

  return (
    <>
      <AdminNavbar />

      <div className="admin-instructors">
        <h2>All Instructors</h2>

        <div className="instructor-grid">
          {instructors.map((inst) => (
            <div className="instructor-card" key={inst._id}>
              {/* Header */}
              <div className="instructor-header">
                <div>
                  <h3>{inst.firstName} {inst.lastName}</h3>
                  <p className="email"><strong>Email : </strong>{inst.email}</p>
                </div>

                <div className="status">
                  <span className={`badge ${inst.isVerified ? "verified" : "pending"}`}>
                    {inst.isVerified ? "Verified" : "Pending"}
                  </span>
                  <span className={`badge ${inst.isBlocked ? "blocked" : "active"}`}>
                    {inst.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="actions">
                {!inst.isVerified && (
                  <button
                    className="btn verify"
                    onClick={() => verifyInstructor(inst._id)}
                  >
                    Verify
                  </button>
                )}

                <button
                  className="btn block"
                  onClick={() => blockUser(inst._id)}
                >
                  {inst.isBlocked ? "Unblock" : "Block"}
                </button>

                <button
                  className="btn view"
                  onClick={() => setSelectedInstructor(inst)}
                >
                  View Courses
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT DRAWER ===== */}
      {selectedInstructor && (
        <div className="drawer-overlay" onClick={() => setSelectedInstructor(null)}>
          <div
            className="drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <h3>
                {selectedInstructor.firstName}{" "}
                {selectedInstructor.lastName}
              </h3>
              <button
                className="close-btn"
                onClick={() => setSelectedInstructor(null)}
              >
                ✕
              </button>
            </div>

            <p className="drawer-email">{selectedInstructor.email}</p>

            <h4>Courses</h4>

            {selectedInstructor.courses.length === 0 && (
              <p className="empty">No courses uploaded</p>
            )}

            {selectedInstructor.courses.map((course) => (
              <div key={course._id} className="drawer-course">
                <strong>{course.courseName}</strong>

                <div className="students">
                  {course.studentEnroll.length === 0 ? (
                    <span className="empty">No students</span>
                  ) : (
                    course.studentEnroll.map((stu) => (
                      <span key={stu._id} className="student-chip">
                        {stu.firstName} {stu.lastName}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
