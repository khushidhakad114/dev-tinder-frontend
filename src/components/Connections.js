import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Connections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/receive-requests", {
        withCredentials: true,
      })
      .then((res) => setConnections(res.data))
      .catch((err) => console.error("Error fetching connections:", err));
  }, []);

  const updateStatus = (id, newStatus) => {
    axios
      .post(
        `http://localhost:8000/api/request/update/${newStatus}/${id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setConnections((prev) =>
          prev.map((conn) =>
            conn._id === id ? { ...conn, status: newStatus } : conn
          )
        );
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 mt-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {connections.length > 0 ? (
        connections.map((conn) => (
          <div
            key={conn._id}
            className="card bg-secondary shadow-lg p-4 w-80 text-white"
          >
            <h3 className="text-lg font-semibold">
              {conn.sender?.firstName} {conn.sender?.lastName}
            </h3>
            <p className="text-sm">Status: {conn.status}</p>
            <div className="flex gap-2 mt-3">
              <button
                className="btn btn-sm bg-green-500 text-white"
                onClick={() => updateStatus(conn._id, "accepted")}
              >
                Accept
              </button>
              <button
                className="btn btn-sm bg-yellow-500 text-white"
                onClick={() => updateStatus(conn._id, "interested")}
              >
                Interested
              </button>
              <button
                className="btn btn-sm bg-gray-500 text-white"
                onClick={() => updateStatus(conn._id, "ignored")}
              >
                Ignore
              </button>
              <button
                className="btn btn-sm bg-red-500 text-white"
                onClick={() => updateStatus(conn._id, "block")}
              >
                Block
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white text-lg">No connection requests found.</p>
      )}
    </motion.div>
  );
};

export default Connections;
