import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import {
  FaBars,
  FaWhatsapp,
  FaArrowLeft,
  FaSearch,
  FaEdit,
  FaEllipsisV,
} from "react-icons/fa";

function App() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showChatList, setShowChatList] = useState(true);

  // --- Resizable ChatList state ---
  const [sidebarWidth, setSidebarWidth] = useState(400);

  const handleMouseDown = (e) => {
    // Attach listeners directly on mousedown
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (moveEvent) => {
      const newWidth = Math.min(
        Math.max(startWidth + (moveEvent.clientX - startX), 240),
        600
      );
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleChatSelect = () => {
    setShowChatList(false);
  };

  const handleBackToChats = () => {
    setShowChatList(true);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex w-full h-full">
        {/* Left Navigation Bar */}
        <div className="flex-shrink-0">
          <Navbar />
        </div>

        {/* Chat List Sidebar */}
        <div
          className="flex-shrink-0 border-r border-gray-200 relative"
          style={{ width: sidebarWidth }}
        >
          <ChatList />
          {/* Draggable Divider */}
          <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 right-0 h-full w-2 cursor-col-resize z-10"
            style={{ background: "transparent" }}
          >
            <div className="w-1 h-full mx-auto bg-gray-200 rounded" />
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <ChatWindow />
          <MessageInput />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col w-full h-full">
        {/* Mobile Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            {showChatList ? (
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
              >
                <FaBars size={20} />
              </button>
            ) : (
              <button
                onClick={handleBackToChats}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
              >
                <FaArrowLeft size={20} />
              </button>
            )}
            <FaWhatsapp className="text-green-500 text-xl" />
            <span className="text-gray-800 font-semibold">WhatsApp</span>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 relative">
          {/* Mobile Menu Overlay */}
          {showMobileMenu && (
            <div className="absolute top-0 left-0 w-64 h-full bg-white z-50 border-r border-gray-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-800 font-semibold">Menu</span>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: "💬", label: "Chats", active: true },
                    { icon: "📞", label: "Calls" },
                    { icon: "●", label: "Status" },
                    { icon: "⭐", label: "Starred Messages" },
                    { icon: "📁", label: "Archived Chats" },
                    { icon: "⚙️", label: "Settings" },
                    { icon: "👤", label: "Profile" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        item.active
                          ? "bg-green-500 text-white"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Chat List or Chat Window */}
          {showChatList ? (
            <div className="h-full">
              <ChatList onChatSelect={handleChatSelect} />
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <ChatWindow />
              <MessageInput />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
