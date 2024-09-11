import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Components/Login/Login.tsx";
import Register from "./Components/Register/Register.tsx";
import Profile from "./Components/Profile/Profile.tsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.tsx";
import ProfileDetails from "./Components/Profile/ProfileDetails.tsx";

interface User {
  empId: number;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const changeRoute = (path: string) => {
    navigate("/" + path);
  };

  const handleUpdatePersonalDetails = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://localhost:7259/api/user/updatepersonaldetails/${empId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      }
    );

    if (!response.ok) {
      console.log("Update Error:", response.statusText);
    }
  };

  const handleUpdateProfilePic = async (e) => {
    e.preventDefault();

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(
        `https://localhost:7259/api/user/updateProfilePic/${empId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.log("Update Error:", response.statusText);
      } else {
        const userResponse = await fetch(
          `https://localhost:7259/api/user/userdetails/${empId}`
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          userData.ImageData += "?time=" + new Date().getTime();
          setCurrentUser(userData);
        } else {
          console.log("Failed to fetch updated user data");
        }
      }
    }
  };

  const handleUpdateWorkDetails = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://localhost:7259/api/user/updateProfessionalDetails/${empId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      }
    );

    if (!response.ok) {
      console.log("Update Error:", response.statusText);
    }
  };

  const handleUpdateOtherDetails = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://localhost:7259/api/user/updateotherdetails/${empId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      }
    );

    if (!response.ok) {
      console.log("Update Error:", response.statusText);
    }
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
        path="/forgot-password"
        element={<ForgotPassword changeRoute={changeRoute} />}
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
        path="/profile/details"
        element={
          user ? (
            <ProfileDetails
              currentUser={user}
              setCurrentUser={setUser}
              handleUpdatePersonalDetails={handleUpdatePersonalDetails}
              handleUpdateWorkDetails={handleUpdateWorkDetails}
              handleUpdateOtherDetails={handleUpdateOtherDetails}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
