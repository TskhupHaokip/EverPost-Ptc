import { Routes, Route, Outlet } from "react-router-dom";
import Base from "./pages/Base";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { Logout, RegisterLogout } from "./components/common/Logout";
import Page404 from "./pages/Page404";
import ProfilePage from "./pages/ProfilePage";
import ViewProfilePage from "./pages/ViewProfilePage";
import FeedsPage from "./pages/FeedsPage";
import { UserProvider } from "./contexts/UserProvider";
import ProfileRoute from "./pages/ProfileRouter";

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen p-2">
        <Base />
        <Routes>
          {/* Public pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterLogout />} />
          <Route path="/logout" element={<Logout />} />

          {/* All child routes are protected */}

          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/feeds" element={<FeedsPage />}></Route>

            <Route path="/profile" element={<ProfilePage />}></Route>
            
          </Route>

          <Route path="/profile/:user_id" element={<ProfileRoute />} />

          <Route path="*" element={<Page404 />}></Route>
        </Routes>{" "}
      </div>
    </UserProvider>
  );
}

export default App;
