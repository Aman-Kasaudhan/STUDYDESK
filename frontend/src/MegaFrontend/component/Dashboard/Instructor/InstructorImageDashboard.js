import React from "react";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './InstructorImageDashboard.css'
import { useState } from "react";
function InstructorImageDashboard(){
    const { user } = useSelector((state) => state.profile);
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      return (
        <div className="dashboard">
          {/* Profile Image Button */}
          <div>
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

export default InstructorImageDashboard;
 