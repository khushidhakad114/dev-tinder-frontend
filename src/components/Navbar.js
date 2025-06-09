import React from "react";
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
      className="relative flex justify-between items-center bg-transparent text-gray-300 backdrop-blur-md h-20 shadow-none border-none outline-none"
      style={{
        border: "none",
        boxShadow: "none",
        outline: "none",
      }}
    >
      {/* Left - Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle shadow-none border-none outline-none focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="h-6 w-6 text-white" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white/10 backdrop-blur-xl text-white z-50 mt-3 w-52 p-1 shadow-none border-none outline-none focus:outline-none"
          >
            <li className="hover-effect mb-1">
              <a onClick={() => navigate("/login")}>Login</a>
            </li>
            <li className="hover-effect mb-1">
              <a onClick={() => navigate("/myprofile")}>My Profile</a>
            </li>
            <li className="hover-effect mb-1">
              <a onClick={handleLogout}>Logout</a>
            </li>
            <li className="hover-effect">
              <a onClick={() => navigate("/friends")}>Friends</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Center - Title */}
      <div className="navbar-center">
        <h1 className="text-xl font-bold text-white drop-shadow-lg">
          Dev Tinder
        </h1>
      </div>

      {/* Right - Icons + Feed */}
      <div className="navbar-end flex items-center gap-5">
        <button className="btn btn-ghost btn-circle shadow-none border-none outline-none focus:outline-none">
          <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-white" />
        </button>

        <button
          className="btn btn-ghost btn-circle relative shadow-none border-none outline-none focus:outline-none"
          onClick={() => navigate("/receive-requests")}
        >
          <FontAwesomeIcon icon={faBell} className="h-6 w-6 text-white" />
          {requestCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {requestCount}
            </span>
          )}
        </button>

        <button className="btn btn-ghost btn-circle shadow-none border-none outline-none focus:outline-none">
          <FontAwesomeIcon
            icon={faUser}
            onClick={() => navigate("/myprofile")}
            className="h-6 w-6 text-white"
          />
        </button>

        {/* Only Feed button keeps its border */}
        <button
          className="btn text-sm font-semibold border border-white text-white px-4 py-2 transition-all 
          hover:bg-white hover:text-black"
          onClick={() => navigate("/feed")}
        >
          Feed
        </button>
      </div>

      {/* Styles */}
      <style>
        {`
          .hover-effect {
            position: relative;
            padding: 8px;
            border-radius: 5px;
            transition: all 0.3s ease-in-out;
          }

          .hover-effect:hover {
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0px 0px 10px rgba(0, 255, 255, 0.8);
            color: white;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Navbar;
