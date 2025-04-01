import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, sendRequest } from "../slices/userSlice";
import axios from "axios";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Connections = () => {
  const dispatch = useDispatch();
  const { users, currentIndex } = useSelector((state) => state.users);
  const currentUser = users.length > 0 ? users[currentIndex] : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/feed", {
          withCredentials: true,
        });
        dispatch(setUsers(response.data.feed));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleAction = async (actionType) => {
    if (!currentUser) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/request/send/${actionType}/${currentUser._id}`,
        {},
        { withCredentials: true }
      );

      console.log("API Response:", response.data);
      dispatch(sendRequest({ userId: currentUser._id, actionType }));
    } catch (error) {
      console.error(
        `Failed to ${actionType} user:`,
        error.response?.data || error
      );
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center p-7 mt-20"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div className="relative card w-full max-w-3xl shadow-2xl p-6 bg-transparent text-gray-200 backdrop-blur-md border border-navbar-border rounded-2xl hover:shadow-xl hover:border-white">
        <h2 className="text-3xl font-semibold text-center text-white mb-4">
          Feed
        </h2>
        {currentUser ? (
          <>
            <div className="mb-3 text-lg font-bold text-white text-center">
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div className="mb-3 text-gray-200 text-center">
              {currentUser.email}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleAction("ignored")}
                className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Ignore
              </button>
              <button
                onClick={() => handleAction("interested")}
                className="btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Interested
              </button>
            </div>
          </>
        ) : (
          <p className="text-white text-center">No users left to show.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Connections;
