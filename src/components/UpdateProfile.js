import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/myProfile", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setFormData((prev) => ({ ...prev, ...res.data.user }));
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8000/api/updateProfile",
        formData,
        { withCredentials: true }
      );
      alert("Profile Updated");
      console.log("Profile Updated:", res.data);
      navigate("/myprofile");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center mt-20"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="card bg-secondary shadow-xl p-6 w-96 text-white">
        <h2 className="text-xl font-semibold text-center mb-4">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.firstName}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.lastName}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.phone}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            className="input input-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.age}
          />
          <select
            name="gender"
            placeholder="Gender"
            className="select select-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.gender}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            className="input input-bordered bg-white text-black w-full"
            onChange={handleChange}
            value={formData.skills}
          />
          <button
            type="submit"
            className="btn btn-primary bg-primary text-white w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;
