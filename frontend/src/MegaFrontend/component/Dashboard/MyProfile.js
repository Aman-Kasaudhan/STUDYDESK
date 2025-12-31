import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../common/Iconbtn";
import { useNavigate } from "react-router-dom";
import "./Myprofile.css";

import { toast } from "react-toastify";

function Setting() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>

      {/* Profile Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-header">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="profile-img"
            />
            <div>
              <p className="profile-name">{user?.firstName + " " + user?.lastName}</p>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>

          <button
            className="profile-edit-btn"
            onClick={() => navigate("/dashboard/setting")}
          >
            Edit
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <p className="profile-section-title">About</p>
          <button
            className="profile-edit-btn"
            onClick={() => navigate("/dashboard/setting")}
          >
            Edit
          </button>
        </div>
        <p className="profile-about">
          {user?.additionalDetail?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <p className="profile-section-title">Personal Details</p>
          <button
            className="profile-edit-btn"
            onClick={() => navigate("/dashboard/setting")}
          >
            Edit
          </button>
        </div>

        <div className="profile-details-grid">
          <div>
            <p>First Name</p>
            <p>{user?.firstName}</p>
          </div>
          <div>
            <p>Last Name</p>
            <p>{user?.lastName}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>{user?.additionalDetail?.gender ?? "Add gender"}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>{user?.additionalDetail?.contactNumber ?? "Add contact number"}</p>
          </div>
          <div>
            <p>Date of Birth</p>
            <p>{user?.additionalDetail?.dateOfBirth ?? "Add date of birth"}</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Setting;
