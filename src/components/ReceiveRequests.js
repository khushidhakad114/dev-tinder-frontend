import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceiveRequests = ({ setRequestCount }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/receive-requests",
        { withCredentials: true }
      );
      setRequests(res.data.receiveRequests || []);
      setRequestCount(res.data.receiveRequests.length || 0);
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

      setRequests((prevRequests) => {
        const updatedRequests = prevRequests.filter(
          (req) => req._id !== requestId
        );

        setRequestCount(updatedRequests.length);

        return updatedRequests;
      });
    } catch (error) {
      console.error(`Error updating request (${status}):`, error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold text-white mb-4">Received Requests</h1>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request._id}
            className="bg-gray-900 p-6 rounded-lg shadow-md w-96 text-white flex justify-between items-center mb-4 border border-gray-700"
          >
            <span className="font-semibold">
              {request.sender?.firstName ?? "Unknown"}{" "}
              {request.sender?.lastName ?? ""}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => handleRequestUpdate(request._id, "accepted")}
                className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold"
              >
                Accept
              </button>
              <button
                onClick={() => handleRequestUpdate(request._id, "rejected")}
                className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-400">No received requests yet.</p>
      )}
    </div>
  );
};

export default ReceiveRequests;
