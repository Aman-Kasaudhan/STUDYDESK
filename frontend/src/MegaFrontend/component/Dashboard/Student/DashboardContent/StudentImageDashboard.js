import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { useSelector } from "react-redux";
import './StudentImageDashboard.css';

function StudentImageDashboard() {
  const { user } = useSelector((state) => state.profile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
   
    <div className="userPhoto">
      {/* Profile Image Button */}
      <div className="dashboardImage">
          

        <button 
          className="navImage"
          onClick={() => setIsSidebarOpen(true)}   // open sidebar
        >
          <img
            src={user?.image}
            className="dashboardImage11"
            alt={`profile-${user?.firstName}`}
          />
        </button>

        
      </div>

      {isSidebarOpen && (
  <>
    <div 
      className="overlay"
      onClick={() => setIsSidebarOpen(false)}
    />
    <Sidebar 
      isOpen={isSidebarOpen} 
      closeSidebar={() => setIsSidebarOpen(false)} 
    />
  </>
)}
    </div>


  );
}

export default StudentImageDashboard;
