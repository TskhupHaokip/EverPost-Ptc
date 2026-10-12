import { Routes, Route, Outlet } from "react-router-dom";
import Base from "./pages/Base";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { Logout, RegisterLogout } from "./components/common/Logout";


function App() {
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
          <Route path="/home" element={<Home />} />

          {/* Add more protected pages here */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
