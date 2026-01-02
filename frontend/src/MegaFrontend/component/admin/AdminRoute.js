import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const accountType = useSelector(
    (state) => state.profile?.user?.accountType
  );

  if (!token) return <Navigate to="/login" replace />;

  if (accountType !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
