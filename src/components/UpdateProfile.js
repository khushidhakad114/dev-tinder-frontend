import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/myProfile", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          firstNameRef.current.value = res.data.user.firstName || "";
          lastNameRef.current.value = res.data.user.lastName || "";
          emailRef.current.value = res.data.user.email || "";
          phoneRef.current.value = res.data.user.phone || "";
          ageRef.current.value = res.data.user.age || "";
          genderRef.current.value = res.data.user.gender || "";
          skillsRef.current.value = res.data.user.skills || "";
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const updatedData = {
      firstName: firstNameRef.current?.value.trim(),
      lastName: lastNameRef.current?.value.trim(),
      email: emailRef.current?.value.trim(),
      password: passwordRef.current?.value.trim(),
      phone: phoneRef.current?.value.trim(),
      age: ageRef.current?.value.trim(),
      gender: genderRef.current?.value.trim(),
      skills: skillsRef.current?.value.trim(),
    };

    try {
      await axios.put("http://localhost:8000/api/updateProfile", updatedData, {
        withCredentials: true,
      });
      alert("Profile Updated Successfully");
      navigate("/myprofile");
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Profile update failed");
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex justify-center items-center p-7 mt-20"
    >
      <motion.div className="relative card w-full max-w-3xl shadow-2xl p-6 bg-transparent text-gray-200 backdrop-blur-md border border-navbar-border rounded-xl hover:shadow-xl hover:border-white">
        <h2 className="text-xl text-white font-semibold text-center mb-4">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {[
            { ref: firstNameRef, placeholder: "First Name" },
            { ref: lastNameRef, placeholder: "Last Name" },
            { ref: emailRef, placeholder: "Email" },
            { ref: phoneRef, placeholder: "Phone" },
            { ref: ageRef, placeholder: "Age" },
            { ref: skillsRef, placeholder: "Skills" },
          ].map((field, index) => (
            <motion.input
              key={index}
              type="text"
              placeholder={field.placeholder}
              ref={field.ref}
              className="bg-transparent text-gray-200 w-full border-b border-gray-500 focus:outline-none border-b-2 border-glow"
            />
          ))}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              ref={passwordRef}
              className="bg-transparent text-gray-200 w-full border-b border-gray-500 focus:outline-none border-b-2 border-glow"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <select
            ref={genderRef}
            className="bg-transparent text-gray-200 w-full border-b border-gray-500 focus:outline-none border-b-2 border-glow"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errorMessage && (
            <p className="text-red-400 text-sm text-center col-span-2">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-primary bg-primary text-white col-span-2 hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateProfile;
