import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faBars,
  faSearch,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../slices/requestSlice";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestCount = useSelector(
    (state) => state.requests.receiveRequests.length
  );

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/receive-requests",
          {
            withCredentials: true,
          }
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

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logoutUser());
      dispatch(setRequests([]));
      alert("Logout Successful");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="navbar bg-highlight shadow-sm p-4 flex justify-between items-center"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-gray-900" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-secondary text-white rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => navigate("/login")}>Login</a>
            </li>
            <li>
              <a onClick={() => navigate("/myprofile")}>My Profile</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            <li>
              <a onClick={() => navigate("/friends")}>Friends</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <h1 className="text-xl font-bold text-gray-900">Dev-Tinder</h1>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <button className="btn btn-ghost btn-circle">
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-900" />
        </button>

        <button
          className="btn btn-ghost btn-circle relative"
          onClick={() => navigate("/receive-requests")}
        >
          <FontAwesomeIcon icon={faBell} className="h-5 w-5 text-gray-900" />
          {requestCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {requestCount}
            </span>
          )}
        </button>

        <button className="btn btn-ghost btn-circle">
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => navigate("/myprofile")}
            className="h-5 w-5 text-gray-900"
          />
        </button>

        <button
          className="btn btn-outline text-lg font-semibold border-gray-900 text-gray-900 px-4 py-2"
          onClick={() => navigate("/feed")}
        >
          Feed
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
