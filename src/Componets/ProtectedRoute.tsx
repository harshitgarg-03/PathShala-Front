import { Navigate } from "react-router-dom";
import { useAuth } from "../ZustandStore/AuthStore";

type Props = {
  children: React.ReactNode;
  role?: "student" | "instructor" | "admin";
};

function ProtectedRoute({ children, role }: Props) {
  const isAuthenticate = useAuth((s) => s.isAuthenticate);
  const isBooting = useAuth((s) => s.isBooting);
  const user = useAuth((s) => s.user);

  // 🔹 While checking auth on app load
  if (isBooting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // 🔹 Not logged in → go to login
  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Role-based protection
  if (role) {
    if (role === "instructor") {
      if (user?.role !== "instructor") {
        return <Navigate to="/" replace />;
      }
    } else if (role === "student") {
      if (!user) {
        return <Navigate to="/login" replace />;
      }
    } else if (user?.role !== role) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;
