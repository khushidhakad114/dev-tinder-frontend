import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FriendProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        console.log("Friend ID from URL params:", id);
        if (!id) {
          console.error("Invalid friend ID");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/friendsprofile/${id}`,
          { withCredentials: true }
        );

        setFriend(response.data.friend);
      } catch (error) {
        console.error("Error fetching friend's profile:", error);
      }
      setLoading(false);
    };

    if (id) {
      fetchFriendProfile();
    }
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!friend) return <div className="text-center mt-5">Friend not found.</div>;

  return (
    <motion.div
      className="flex justify-center items-center p-7 mt-14"
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
          {friend.firstName}'s Profile
        </h2>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>First Name:</strong> {friend.firstName || "N/A"}
        </div>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>Last Name:</strong> {friend.lastName || "N/A"}
        </div>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>Email:</strong> {friend.email || "N/A"}
        </div>
        <div className="mb-3 text-white hover:bg-gray-700 p-2 rounded-md transition-all">
          <strong>Skills:</strong>{" "}
          {friend.skills.length > 0
            ? friend.skills.join(", ")
            : "No skills added"}
        </div>
        <motion.button
          className="btn btn-primary bg-primary text-white w-full mt-4 hover:bg-primary-dark hover:shadow-lg"
          onClick={() => navigate(`/friendProfile/${friend._id}`)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Chat with {friend.firstName}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FriendProfile;
