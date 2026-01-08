import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice/authSlice";
import { toast } from "react-toastify";

export default function useAutoLogout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user);

  useEffect(() => {
    if (!user?.lastLogin) return;

    const lastLoginTime = new Date(user.lastLogin).getTime();
    const SESSION_LIMIT = 24 * 60 * 60 * 1000; // 24 hours

    const remainingTime =
      SESSION_LIMIT - (Date.now() - lastLoginTime);

    if (remainingTime <= 0) {
      dispatch(logout());
      toast.info("Session expired. Please login again.");
            window.location.reload()

      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
      toast.info("Session expired. Please login again.");
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [user, dispatch]);
}
