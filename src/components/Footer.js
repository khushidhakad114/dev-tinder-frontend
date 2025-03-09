import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Footer = () => {
  return (
    <motion.footer
      className="footer footer-center bg-highlight text-base-content p-4"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <p className="text-gray-900">
        Copyright © {new Date().getFullYear()} - All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
