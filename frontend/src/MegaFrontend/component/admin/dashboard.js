import AdminNavbar from "./navbar";
import InstructorImageDashboard from "../Dashboard/Instructor/InstructorImageDashboard";
import "./dashboard.css";
import { VscOrganization, VscMortarBoard, VscBook, VscShield } from "react-icons/vsc";

export default function AdminDashboard() {
  return (
    <>
      <AdminNavbar />

      <div className="admin-dashboard">
        {/* Header */}
          <div className="imageProfile">

          <InstructorImageDashboard />
</div>
        
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage instructors, students, courses & platform security</p>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="stat-card blue">
            <VscOrganization className="stat-icon" />
            <div>
              <h3>Instructors</h3>
              <p>Manage all instructors</p>
            </div>
          </div>

          <div className="stat-card green">
            <VscMortarBoard className="stat-icon" />
            <div>
              <h3>Students</h3>
              <p>View enrolled students</p>
            </div>
          </div>

          <div className="stat-card purple">
            <VscBook className="stat-icon" />
            <div>
              <h3>Courses</h3>
              <p>All published courses</p>
            </div>
          </div>

          <div className="stat-card red">
            <VscShield className="stat-icon" />
            <div>
              <h3>Security</h3>
              <p>Admin access control</p>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="admin-section">
          <h2>Instructor Highlights</h2>
          <p className="section-subtitle">
            Recently added or top-performing instructors
          </p>
 
        </div>
      </div>
    </>
  );
}
