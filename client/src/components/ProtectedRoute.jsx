import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UseAuthStore } from "../store/UserStore";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const { authUser, checkAuth, isCheckingAuth } = UseAuthStore();

  useEffect(() => {
    if (token && !authUser) {
      checkAuth();
    }
  }, [token, authUser, checkAuth]);

  if (isCheckingAuth || (token && !authUser)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (!token || !authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
