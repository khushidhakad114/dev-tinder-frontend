import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();

  const [user] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 shadow-xl p-6 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">My Profile</h2>
        <div className="mb-3">
          <strong>First Name:</strong> {user.firstName}
        </div>
        <div className="mb-3">
          <strong>Last Name:</strong> {user.lastName}
        </div>
        <div className="mb-3">
          <strong>Email:</strong> {user.email}
        </div>

        <button
          className="btn btn-primary w-full mt-4"
          onClick={() => navigate("/updateprofile")}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
