import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/authSlice";
import "./navbar1.css";

export default function AdminNavbar() {
  const dispatch = useDispatch();

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <NavLink to="/admin/dashboard" className="admin-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/instructors" className="admin-link">
          Instructors
        </NavLink>
        <NavLink to="/admin/students" className="admin-link">
          Students
        </NavLink>
        <NavLink to="/admin/createCategory" className="admin-link">
          Create Category
        </NavLink>
      </div>

      <button
        className="admin-logout-btn"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </nav>
  );
}
