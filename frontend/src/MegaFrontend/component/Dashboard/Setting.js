import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import IconBtn from "../../common/Iconbtn";
import "./Setting.css";
import "../../common/Popup.css";
import { showLoader,hideLoader } from "../../slice/loaderSlice";
import { logout } from "../../slice/authSlice";
import { setUser } from "../../slice/profileSlice";
function Setting() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token=useSelector((state)=>state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEmail, setShowPopupEmail] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showPersonalEdit, setShowPersonalEdit] = useState(false);

  const [aboutText, setAboutText] = useState(user?.additionalDetail?.about || "");
  const [personalData, setPersonalData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.additionalDetail?.gender || "",
    contactNumber: user?.additionalDetail?.contactNumber || "",
    dateOfBirth: user?.additionalDetail?.dateOfBirth || "",
    email: user?.email || "",
  });

  // Logout popups
  const handleLogout = () => setShowPopup(true);
  const confirmLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logout successfully");
    setShowPopup(false);
  };
  const cancelLogout = () => {
    setShowPopup(false);
    setShowPopupEmail(false);
    setShowAboutPopup(false);
    setShowPersonalEdit(false);
  };

  // Edit email
  const card1Setting = () => setShowPopupEmail(true);

  // Edit About popup
  const card2Setting = () => setShowAboutPopup(true);

  // Edit Personal Details
  const card3Setting = () => setShowPersonalEdit(true);

  // Popup background blur toggle
  useEffect(() => {
    const container = document.querySelector(".setting-container");
    if (showPopup || showPopupEmail || showAboutPopup || showPersonalEdit)
      container.classList.add("popup-open");
    else container.classList.remove("popup-open");
  }, [showPopup, showPopupEmail, showAboutPopup, showPersonalEdit]);

  // Handle About Save
  // console.log(user);
  const saveAbout = async () => {
            dispatch(showLoader())
    
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/profile/create-profile`, {
        userId:user?.additionalDetail,
        about: aboutText,
      },
      {
          headers: {
      Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data"
      }
        }
    );
    dispatch(
      setUser({
        ...user,
        additionalDetail: {
          ...user.additionalDetail,
          about: aboutText,
        },
      })
    );
      toast.success("About updated successfully");
      setShowAboutPopup(false);
              dispatch(hideLoader())
      
    } catch (err) {
      toast.error("Failed to update about");
              dispatch(hideLoader())
      
    }
  };

  // Handle Personal Details Save
  const savePersonal = async () => {
            dispatch(showLoader())
    
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/profile/create-profile`, {
        userId:user?.additionalDetail,
        ...personalData,
      },{
    headers: { Authorization: `Bearer ${token}` },

      },
    );
      dispatch(
      setUser({
        ...user,
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${personalData.firstName}
        ${personalData.lastName}`,
        additionalDetail: {
          ...user.additionalDetail,
          gender: personalData.gender,
          contactNumber: personalData.contactNumber,
          dateOfBirth: personalData.dateOfBirth,
        },
      })
    );

      toast.success("Profile details updated successfully");
      setShowPersonalEdit(false);
              dispatch(hideLoader())
      
    } 
    catch (err) {
      toast.error("Failed to update profile details");
              dispatch(hideLoader())
      
    }
  };

  function handleChangeEmail() {
    setShowPopupEmail(false);
    toast.info("Redirecting to email edit section...");
    navigate("/dashboard/setting/edit-email");
  }

  return (
    <div className="setting-container">
      <h2 className="setting-title">Edit Your Profile</h2>

      {/* Profile Card */}
      <div className="setting-card">
        <div className="setting-card-header">
          <div className="setting-profile-header">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="setting-profile-img"
            />
            <div>
              <p className="setting-name">{user?.firstName} {user?.lastName}</p>
              <p className="setting-email">{user?.email}</p>
            </div>
          </div>
          <button className="setting-edit-btn" onClick={card1Setting}>Edit</button>
        </div>
      </div>

      {/* About Card */}
      <div className="setting-card">
        <div className="setting-card-header">
          <p className="setting-section-title">About</p>
          <button className="setting-edit-btn" onClick={card2Setting}>Edit</button>
        </div>
        <p className="setting-about">{aboutText || "Write something about yourself"}</p>
      </div>

      {/* Personal Details Card */}
      <div className="setting-card">
        <div className="setting-card-header">
          <p className="setting-section-title">Personal Details</p>
          <button className="setting-edit-btn" onClick={card3Setting}>Edit</button>
        </div>

        <div className="setting-details-grid">
          <div><p>First Name</p><p>{user?.firstName}</p></div>
          <div><p>Last Name</p><p>{user?.lastName}</p></div>
          <div><p>Email</p><p>{user?.email}</p></div>
          <div><p>Gender</p><p>{user?.additionalDetail?.gender ?? "Add gender"}</p></div>
          <div><p>Phone Number</p><p>{user?.additionalDetail?.contactNumber ?? "Add number"}</p></div>
          <div><p>Date of Birth</p><p>{user?.additionalDetail?.dateOfBirth ?? "Add date"}</p></div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="setting-logout-container">
        <button className="setting-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* --- POPUPS --- */}

      {/* Email Change Popup */}
      {showPopupEmail &&
        createPortal(
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>Are you sure you want to change your email?</h3>
              <div className="popup-buttons">
                <button className="popup-ok" onClick={handleChangeEmail}>OK</button>
                <button className="popup-cancel" onClick={cancelLogout}>Cancel</button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Are you sure you want to logout?</h3>
            <div className="popup-buttons">
              <button className="popup-ok" onClick={confirmLogout}>OK</button>
              <button className="popup-cancel" onClick={cancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* About Edit Popup */}
      {showAboutPopup &&
        createPortal(
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>Edit About</h3>
              <textarea
                className="popup-input"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
              />
              <div className="popup-buttons">
                <button className="popup-ok" onClick={saveAbout}>Save</button>
                <button className="popup-cancel" onClick={cancelLogout}>Cancel</button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Personal Details Edit Popup */}
     {showPersonalEdit &&
  createPortal(
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Edit Personal Details</h3>

        <div className="popup-input-grid">
          <input
            placeholder="First Name"
            value={personalData.firstName}
            onChange={(e) =>
              setPersonalData({ ...personalData, firstName: e.target.value })
            }
          />

          <input
            placeholder="Last Name"
            value={personalData.lastName}
            onChange={(e) =>
              setPersonalData({ ...personalData, lastName: e.target.value })
            }
          />

          {/* ✅ Gender Dropdown */}
          <select
            value={personalData.gender}
            onChange={(e) =>
              setPersonalData({ ...personalData, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* ✅ Phone number — optional but must be 10 digits if entered */}
          <input
            placeholder="Phone Number"
            type="text"
            maxLength={10}
            value={personalData.contactNumber}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) {
                setPersonalData({ ...personalData, contactNumber: val });
              }
            }}
          />

          <input
            placeholder="Date of Birth"
            type="date"
            value={personalData.dateOfBirth}
            onChange={(e) =>
              setPersonalData({ ...personalData, dateOfBirth: e.target.value })
            }
          />
        </div>

        <div className="popup-buttons">
          <button
            className="popup-ok"
            onClick={() => {
              // ✅ Allow empty phone, but validate if filled
              if (
                personalData.contactNumber &&
                !/^\d{10}$/.test(personalData.contactNumber)
              ) {
                toast.error("Phone number must be exactly 10 digits");
                return;
              }

              // if (!personalData.gender) {
              //   toast.error("Please select a gender");
              //   return;
              // }

              savePersonal();
            }}
          >
            Save
          </button>

          <button className="popup-cancel" onClick={cancelLogout}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  )}


    </div>
  );
}

export default Setting;
