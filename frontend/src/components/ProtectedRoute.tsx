import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import ApiClient from "../ApiClient";
import { useCurrentUser } from "../contexts/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { user, setUser } = useCurrentUser();

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        if (isMounted) setIsAuthenticated(false);
        return;
      }

      try {
        const decoded: { exp?: number } = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        // If access token is valid, authenticate immediately
        if (tokenExpiration && tokenExpiration > now) {
          if (isMounted) setIsAuthenticated(true);

          ApiClient.get("/api/user/my-account/")
          .then((res) => {
            console.log(res.data)
            setUser(res.data[0])
          })
          .catch((error) => {
            console.log(error)
          })

          return;
        }

        // If access token is expired, attempt token refresh
        const refresh_token = localStorage.getItem(REFRESH_TOKEN);
        if (!refresh_token) {
          if (isMounted) setIsAuthenticated(false);
          return;
        }

        const res = await ApiClient.post("/api/refresh/", {
          refresh: refresh_token,
        });

        if (res.status === 200 && isMounted) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          setIsAuthenticated(true);
          
        } else if (isMounted) {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        if (isMounted) setIsAuthenticated(false);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [setUser]);

  console.log("current user : ",user)

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
