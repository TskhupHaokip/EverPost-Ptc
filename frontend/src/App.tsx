import { Routes, Route, Outlet } from "react-router-dom";
import Base from "./pages/Base";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { Logout, RegisterLogout } from "./components/common/Logout";
import { useState } from "react";
import { User } from "./models/model";
import Page404 from "./pages/Page404";
import ProfilePage from "./pages/ProfilePage";
import ViewProfilePage from "./pages/ViewProfilePage";
import FeedsPage from "./pages/FeedsPage";


function App() {
  const [CurrentUser, setCurrentUser] = useState<User>();

  return (
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
          <Route
            path="/home"
            element={
              <Home CurrentUser={CurrentUser} setCurrentUser={setCurrentUser} />
            }
          />
          <Route path="/feeds" element={<FeedsPage />}></Route>

          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/view-profile" element={<ViewProfilePage user_id={2}/>} ></Route>

        </Route>

        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
