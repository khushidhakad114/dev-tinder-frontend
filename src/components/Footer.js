import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full py-6 bg-transparent text-gray-300 backdrop-blur-md text-center border-t border-b border-transparent">
      <div className="absolute top-0 left-0 w-full h-[2px] animate-border-sparkle"></div>

      <div className="flex items-center justify-center max-w-6xl mx-auto px-4">
        <p className="text-sm font-medium">
          © 2025 Dev-Tinder. All rights reserved.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] animate-border-sparkle"></div>

      <style>
        {`
          @keyframes border-sparkle {
            0% { background: rgba(0, 255, 255, 0.6); box-shadow: 0 0 3px rgba(0, 255, 255, 0.6); }
            25% { background: rgba(255, 255, 255, 0.8); box-shadow: 0 0 6px rgba(255, 255, 255, 0.8); }
            50% { background: rgba(0, 255, 255, 1); box-shadow: 0 0 10px rgba(0, 255, 255, 1); }
            75% { background: rgba(255, 255, 255, 0.8); box-shadow: 0 0 6px rgba(255, 255, 255, 0.8); }
            100% { background: rgba(0, 255, 255, 0.6); box-shadow: 0 0 3px rgba(0, 255, 255, 0.6); }
          }

          .animate-border-sparkle {
            animation: border-sparkle 2.5s infinite alternate;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
