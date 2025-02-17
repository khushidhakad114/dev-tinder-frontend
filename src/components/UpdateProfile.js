import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);

    navigate("/myprofile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 shadow-xl p-6 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <select
            name="gender"
            className="input input-bordered w-full"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
