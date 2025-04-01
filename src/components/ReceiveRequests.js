import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setRequests, removeRequest } from "../slices/requestSlice";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ReceiveRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.receiveRequests);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/receive-requests",
        { withCredentials: true }
      );
      dispatch(setRequests(res.data.receiveRequests || []));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleRequestUpdate = async (requestId, status) => {
    try {
      await axios.post(
        `http://localhost:8000/api/request/update/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error(`Error updating request (${status}):`, error);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-16"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-3xl font-bold text-white mb-6">Received Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <motion.div
            key={request._id}
            className="relative card w-full max-w-lg shadow-xl p-6 bg-transparent text-gray-200 backdrop-blur-md border border-gray-600 rounded-lg hover:shadow-2xl transition-all mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">
                {request.sender?.firstName ?? "Unknown"}{" "}
                {request.sender?.lastName ?? ""}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleRequestUpdate(request._id, "accepted")}
                  className="btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequestUpdate(request._id, "rejected")}
                  className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-xl font-semibold text-white">
          No received requests yet.
        </p>
      )}
    </motion.div>
  );
};

export default ReceiveRequests;
