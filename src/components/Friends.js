import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/getallfriends", {
        withCredentials: true,
      });
      setFriends(res.data.data || []);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-16"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h1 className="text-3xl font-bold text-white mb-6">My Friends</h1>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <motion.div
            key={friend._id}
            className="relative card w-full max-w-lg shadow-xl p-6 bg-transparent text-gray-200 backdrop-blur-md border border-gray-600 rounded-lg hover:shadow-2xl transition-all mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-semibold text-lg text-center">
              {friend.firstName} {friend.lastName}
            </span>
            <motion.button
              className="btn btn-primary bg-primary text-white w-full mt-4 hover:bg-primary-dark hover:shadow-lg"
              onClick={() => navigate(`/friendsprofile/${friend._id}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Profile
            </motion.button>
          </motion.div>
        ))
      ) : (
        <p className="text-xl font-semibold text-white">No friends yet.</p>
      )}
    </motion.div>
  );
};

export default Friends;
