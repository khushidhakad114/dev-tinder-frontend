import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Vortex } from "./UI/vortex";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleSignup = () => setIsSignup(!isSignup);

  const handleSubmit = () => {
    const userData = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log("Submitted Data:", userData);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black overflow-hidden relative">
      <Vortex
        className="absolute top-0 left-0 w-full h-full z-0"
        backgroundColor="black"
        particleCount={800}
        rangeY={150}
        baseSpeed={0.2}
        rangeSpeed={1}
        baseRadius={1}
        rangeRadius={2}
        baseHue={200}
      />

      <div className="absolute w-96 bg-black/50 p-8 rounded-xl shadow-lg border border-gray-600">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="First Name"
              ref={firstNameRef}
              className="w-full p-3 mb-3 bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              ref={lastNameRef}
              className="w-full p-3 mb-3 bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="w-full p-3 mb-3 bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative w-full mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            ref={passwordRef}
            className="w-full p-3 bg-transparent text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-4 top-3 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <button
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          onClick={handleSubmit}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          className="text-center mt-4 cursor-pointer text-gray-300 hover:text-white transition duration-200"
          onClick={toggleSignup}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
