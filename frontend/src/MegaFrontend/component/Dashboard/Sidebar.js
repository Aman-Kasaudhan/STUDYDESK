import React, { useState } from "react";
// import { setUser, clearUser } from "../../slice/profileSlice";
import { useDispatch,useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { sidebarLinks } from "./dasboard-links";
import { VscSignOut } from "react-icons/vsc";
import ConfirmModal from "../../common/ConfirmModal";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {logout} from '../../slice/authSlice'
import { clearUser } from "../../slice/profileSlice";
import { VscSettingsGear } from "react-icons/vsc";
import './Sidebar.css'
import { toast } from "react-toastify";
import '../../common/Popup.css'
import { persistor } from "../../reducer/store";
function Sidebar({ isOpen, closeSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);
  const [confirmationModal, setconfirmationModal] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const handleLogout = () => {
      setShowPopup(true); // 👈 show popup on click
    };
  
    const confirmLogout = () => {
      dispatch(logout());
      dispatch(clearUser());
      persistor.purge();
      navigate("/");
      toast.success("Logout successfully");
      setShowPopup(false);
      window.location.reload()
    };
  
    const cancelLogout = () => {
      setShowPopup(false);
    };

  return (
    <div className={`sidebar1 ${isOpen ? "open" : ""}`}>
      <div className="sidebar2">
        {sidebarLinks.map((link) => {
          if (link.type && user.accountType !== link.type) return null;
          return (
            <SidebarLink
              key={link.id}
              link={link}
              iconName={link.icon}
              closeSidebar={closeSidebar}
            />
          );
        })}
      </div>

      <div className="line"></div>

      <div className="sidebar-bottom">
        <NavLink to="/dashboard/setting" className="sidebar-link" onClick={closeSidebar}>
          <VscSettingsGear className="sidebar-icon" />
          <span>Setting</span>
        </NavLink>

        <button onClick={handleLogout}>
          <VscSignOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
               { showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Are you sure you want to logout?</h3>
            <div className="popup-buttons">
              <button className="popup-ok" onClick={confirmLogout}  style={{
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}>
                OK
              </button>
              <button className="popup-cancel" onClick={cancelLogout} style={{
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </div>
  );

}
export default Sidebar;