import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Components/Login/Login.tsx";
import Register from "./Components/Register/Register.tsx";
import Profile from "./Components/Profile/Profile.tsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.tsx";

interface User {
  empId: number;
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

const Layout: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  let navigate = useNavigate();

  const changeRoute = (path: string) => {
    navigate("/" + path);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setUser={setUser} changeRoute={changeRoute} />}
      />
      <Route
        path="/register"
        element={<Register changeRoute={changeRoute} />}
      />
      <Route
        path="/profile"
        element={
          user ? (
            <Profile empId={user.empId} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword changeRoute={changeRoute} />}
      />
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
