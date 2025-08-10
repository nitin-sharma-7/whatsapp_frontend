import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChats,
  setActiveChat,
  setLoading,
  setError,
} from "../store/slices/chatSlice";
import axios from "axios";
import { FaWhatsapp, FaSearch, FaEdit, FaEllipsisV } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const ChatList = ({ onChatSelect }) => {
  const dispatch = useDispatch();
  const { activeChat, loading } = useSelector((state) => state.chat);
  const [localChats, setLocalChats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get("http://localhost:5000/api/chats");
        console.log(data);
        setLocalChats(Array.isArray(data) ? data : []);
        dispatch(setChats(Array.isArray(data) ? data : []));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error?.message || "Failed to fetch chats"));
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chat) => {
    dispatch(setActiveChat(chat._id));
    if (onChatSelect) onChatSelect();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const chatsToRender = localChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-gray-800 font-semibold text-lg">whatsapp </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-50">
            <FaEdit size={16} />
          </button>
          <button className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-50">
            <FaEllipsisV size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search or start a new chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatsToRender.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FaWhatsapp className="text-6xl mb-4 text-green-500" />
            <p className="text-lg font-semibold mb-2">Welcome to WhatsApp</p>
            <p className="text-sm text-center">
              Send and receive messages without keeping your phone online.
            </p>
          </div>
        ) : (
          chatsToRender.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleChatClick(chat)}
              className={`flex items-center p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat === chat._id ? "bg-gray-50" : ""
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold text-lg">
                  {chat.name ? chat.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-800 font-semibold text-sm truncate">
                    {chat.name || "Unknown User"}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatTime(chat.lastTimestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage || "No messages yet"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
