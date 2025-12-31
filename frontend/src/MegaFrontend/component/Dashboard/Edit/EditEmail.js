import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slice/profileSlice";
function EditEmail() {
  const { user } = useSelector((state) => state.profile);
  const [step, setStep] = useState(1); // 1=verify old, 2=new email, 3=verify new
  const [otp, setOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newOtp, setNewOtp] = useState("");
  const [timer, setTimer] = useState(0);
const navigate=useNavigate();
const dispatch=useDispatch();
  // Timer

  const handleStartResendTimer = () => {
    setTimer(30);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);
  };

  // Send OTP to current email
  const sendOldOtp = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/updateOtp/sendotp-update", {
        email: user?.email,
      });

      toast.success("OTP sent to current email");
      handleStartResendTimer();
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  const verifyOldOtp = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/updateOtp/verify-old-otp", {
        email: user?.email,
        otp,
      });
      if (res.data.success) {
        toast.success("Old email verified");
        setStep(2);
      }
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  const sendNewEmailOtp = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/updateOtp/send-new-email-otp", {
       email: newEmail,
      });
      toast.success("OTP sent to new email");
      setStep(3);
    } catch (err) {
      toast.error("User already registered. Please Enter new email.");
    }
  };

  const verifyNewOtpAndUpdate = async () => {
    try {
      await axios.post("http://localhost:4000/api/v1/updateOtp/update-email", {
        oldEmail: user?.email,
        newEmail,
      });
      dispatch(
            setUser({
              ...user,
              email:newEmail,
            })
          );
      toast.success("Email updated successfully!");
      // navigate("/")
    //   setStep(1);
    //   setOtp("");
    //   setNewEmail("");
    //   setNewOtp("");
    } catch (err) {
      toast.error("Email update failed");
    }
  };

  useEffect(() => {
    sendOldOtp();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Edit Email</h2>
      {step === 1 && (
        <>
          <p>Verify current email: {user?.email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={verifyOldOtp} style={styles.button}>
            Verify OTP
          </button>
          <button
            onClick={sendOldOtp}
            disabled={timer > 0}
            style={timer > 0 ? styles.disabledButton : styles.button}
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p>Enter new email:</p>
          <input
            type="email"
            placeholder="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={styles.input}
          />
          <button onClick={sendNewEmailOtp} style={styles.button}>
            Send OTP to new email
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <p>Enter OTP sent to {newEmail}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={newOtp}
            onChange={(e) => setNewOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={verifyNewOtpAndUpdate} style={styles.button}>
            Verify & Update Email
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "250px",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "5px",
  },
  disabledButton: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "not-allowed",
  },
};

export default EditEmail;
