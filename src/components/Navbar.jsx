import React, { useState } from "react";
import {
  FaBars,
  FaComments,
  FaPhone,
  FaCircle,
  FaStar,
  FaEnvelope,
  FaCog,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: FaComments, label: "Chats", active: true },
    { icon: FaPhone, label: "Calls", notification: "2" },
    { icon: FaCircle, label: "Status" },
    { icon: FaStar, label: "Starred Messages" },
    { icon: FaEnvelope, label: "Archived Chats" },
    { icon: FaCog, label: "Settings" },
  ];

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 h-full transition-all duration-300 ease-in-out ${
        isExpanded ? "w-48" : "w-16"
      } `}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button - Fixed at top */}
        <div className="flex justify-center py-4 border-b border-gray-200">
          <button
            onClick={toggleNavbar}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
            title="Menu"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col py-4 space-y-2">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex items-center px-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <button
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors relative ${
                      item.active
                        ? "bg-green-500 text-white"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                    title={item.label}
                  >
                    <item.icon size={20} />
                    {/* Notification badge for calls */}
                    {item.notification && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {item.notification}
                        </span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Label (only visible when expanded) */}
                {isExpanded && (
                  <div className="ml-3 flex-1">
                    <span
                      className={`text-sm font-medium ${
                        item.active ? "text-green-500" : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Profile Picture at Bottom */}
        <div className="flex justify-center py-4 border-t border-gray-200">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
