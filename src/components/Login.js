import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { setUsers } from "../slices/userSlice";
import { useDispatch } from "react-redux";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setErrorMessage("");
  };

  const signupUser = async () => {
    setErrorMessage("");
    const userData = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/Signup",
        userData
      );
      console.log("Signup Response:", response.data);
      alert("Signup successful");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Signup failed");
    }
  };

  const loginUser = async () => {
    setErrorMessage("");
    const userData = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/Login",
        userData,
        {
          withCredentials: true,
        }
      );
      console.log("Login Response:", response.data);
      dispatch(setUsers([response.data.user]));
      alert("Login successful");
      navigate("/connections");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Login failed");
    }
  };

  const handleSubmit = () => {
    isSignup ? signupUser() : loginUser();
  };

  return (
    <motion.div
      variants={fadeIn}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center p-7"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card bg-secondary w-96 shadow-2xl p-6"
      >
        <h2 className="text-xl text-white font-semibold text-center mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        {isSignup && (
          <>
            <motion.input
              type="text"
              placeholder="First Name"
              ref={firstNameRef}
              className="input input-bordered bg-white text-black w-full mb-3"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="text"
              placeholder="Last Name"
              ref={lastNameRef}
              className="input input-bordered bg-white text-black w-full mb-3"
              whileFocus={{ scale: 1.05 }}
            />
          </>
        )}
        <motion.input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="input input-bordered bg-white text-black w-full mb-3"
          whileFocus={{ scale: 1.05 }}
        />
        <div className="relative w-full mb-3">
          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
            className="input input-bordered bg-white text-black w-full"
            whileFocus={{ scale: 1.05 }}
          />
          <button
            type="button"
            className="absolute right-3 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {errorMessage && (
          <motion.p
            className="text-highlight text-sm text-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errorMessage}
          </motion.p>
        )}
        <motion.button
          className="btn btn-primary bg-primary text-white w-full"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </motion.button>
        <p
          className="text-center text-white mt-3 cursor-pointer"
          onClick={toggleSignup}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
