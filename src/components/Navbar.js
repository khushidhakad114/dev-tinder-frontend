import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faBars, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login"); // Redirect to login after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="navbar bg-highlight shadow-sm"
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
              <a onClick={() => navigate("/home")}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate("/myprofile")}>My Profile</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl"></a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-900" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FontAwesomeIcon
              icon={faUser}
              onClick={() => navigate("/myprofile")}
              className="h-5 w-5 text-gray-900"
            />
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
