import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/slices/chatSlice";
import { chatAPI } from "../services/api";
import MessageBubble from "./MessageBubble";
import {
  FaWhatsapp,
  FaSearch,
  FaEllipsisV,
  FaPhone,
  FaVideo,
  FaLock,
} from "react-icons/fa";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { activeChat, messages, chats } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);

  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [loadError, setLoadError] = useState("");

  const activeChatData = chats?.find((chat) => chat._id === activeChat);
  const currentMessages =
    (messages && activeChat && messages[activeChat]) || [];

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChat) return;
      try {
        setIsLoadingMessages(true);
        setLoadError("");
        const messagesData = await chatAPI.getMessages(activeChat);
        dispatch(setMessages({ wa_id: activeChat, messages: messagesData }));
      } catch (error) {
        setLoadError(error?.message || "Failed to fetch messages");
      } finally {
        setIsLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [activeChat, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-600 max-w-md">
          <div className="mb-8">
            <FaWhatsapp className="text-8xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              WhatsApp for Windows
            </h2>
            <p className="text-lg mb-2 text-gray-600">
              Send and receive messages without keeping your phone online.
            </p>
            <p className="text-sm text-gray-500">
              Use WhatsApp on up to 4 linked devices and 1 phone at the same
              time.
            </p>
          </div>
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <FaLock className="mr-2" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold">
              {activeChatData?.name
                ? activeChatData.name.charAt(0).toUpperCase()
                : "U"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {activeChatData?.name || "Unknown User"}
            </h3>
            <p className="text-sm text-gray-500">
              {activeChatData?._id || "User ID"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
            <FaVideo size={16} />
          </button>
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
            <FaPhone size={16} />
          </button>
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
            <FaSearch size={16} />
          </button>
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100">
            <FaEllipsisV size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : loadError ? (
          <div className="flex items-center justify-center h-full text-red-600">
            {loadError}
          </div>
        ) : currentMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <FaWhatsapp className="text-6xl mb-4 text-green-500 mx-auto" />
              <p className="text-lg font-semibold mb-2 text-gray-800">
                No messages yet
              </p>
              <p className="text-sm">Start a conversation!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {currentMessages.map((message) => (
              <MessageBubble
                key={message._id || message.message_id}
                message={message}
                isOwnMessage={message.from !== activeChat}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
