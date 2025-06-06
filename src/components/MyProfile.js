import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/myProfile",
          { withCredentials: true }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };
    fetchUserProfile();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!user) return <div className="text-center mt-5">User not found.</div>;

  return (
    <motion.div
      className="flex justify-center items-center p-7 mt-14 "
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative card w-96 bg-transparent text-gray-300 backdrop-blur-md p-6 bg-navbar border border-navbar-border hover:shadow-xl hover:border-white"
      >
        <h2 className="text-xl font-semibold text-center text-white mb-4">
          My Profile
        </h2>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>First Name:</strong> {user.firstName || "N/A"}
        </div>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>Last Name:</strong> {user.lastName || "N/A"}
        </div>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>Email:</strong> {user.email || "N/A"}
        </div>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>Skills:</strong> {user.skills || "No skills added"}
        </div>
        <motion.button
          className="btn btn-primary bg-primary text-white w-full mt-4 hover:bg-primary-dark hover:shadow-lg"
          onClick={() => navigate("/updateprofile")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Profile
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MyProfile;
