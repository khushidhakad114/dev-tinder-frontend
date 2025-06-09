import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full py-6 bg-transparent text-gray-300 backdrop-blur-md text-center border-t border-b border-transparent">
      {/* Removed sparkling border divs */}

      <div className="flex items-center justify-center max-w-6xl mx-auto px-4">
        <p className="text-sm font-medium">
          © 2025 Dev-Tinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
