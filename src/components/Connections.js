import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, sendRequest } from "../slices/userSlice";
import axios from "axios";
import { motion } from "framer-motion";
import { setRequests } from "../slices/requestSlice";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Connections = () => {
  const dispatch = useDispatch();
  const { users, currentIndex } = useSelector((state) => state.users);
  const currentUser = users && users.length > 0 ? users[currentIndex] : null;
  const [visitedAllUsers, setVisitedAllUsers] = useState(false);

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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/receive-requests",
          { withCredentials: true }
        );

        if (response.data && Array.isArray(response.data.receiveRequests)) {
          dispatch(setRequests(response.data.receiveRequests));
        } else {
          console.error("Invalid API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
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

      if (currentIndex === users.length - 1) {
        setVisitedAllUsers(true);
      }
    } catch (error) {
      console.error(
        `Failed to ${actionType} user:`,
        error.response?.data || error
      );
    }
  };

  if (visitedAllUsers) {
    return (
      <motion.div
        className="flex justify-center items-center p-7 mt-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div>No users left to show.</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex justify-center items-center p-6 mt-7"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="relative w-full max-w-3xl flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentUser ? (
          <div className="card w-96 shadow-2xl p-6 bg-transparent text-gray-300 backdrop-blur-md border border-navbar-border hover:shadow-xl hover:border-white">
            <figure>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI_efoBNhpgj44SFexzeYTfsDINdwvsx761A&s"
                alt="User"
                className="rounded-t-xl"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p>{currentUser.email}</p>
              <div>
                <strong>Skills:</strong>{" "}
                {currentUser.skills && currentUser.skills.length > 0
                  ? currentUser.skills.join(", ")
                  : "No skills added"}
              </div>

              <div className="card-actions justify-between mt-4">
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
            </div>
          </div>
        ) : (
          <p className="text-xl font-semibold text-white">
            No users left to show.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Connections;
