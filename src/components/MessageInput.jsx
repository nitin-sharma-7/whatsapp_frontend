import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/slices/chatSlice";
import { chatAPI } from "../services/api";
import { IoSend, IoHappy, IoAttach } from "react-icons/io5";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const { activeChat, chats } = useSelector((state) => state.chat);

  const activeChatData = chats.find((chat) => chat._id === activeChat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat || sending) return;

    try {
      setSending(true);

      await chatAPI.sendMessage({
        wa_id: activeChat,
        name: activeChatData?.name, // keep the contact's name
        text: message.trim(),
      });

      const newMessage = {
        _id: `temp-${Date.now()}`,
        message_id: `temp-${Date.now()}`,
        wa_id: activeChat,
        name: activeChatData?.name,
        from: "business",
        to: activeChat,
        timestamp: new Date().toISOString(),
        text: message.trim(),
        type: "text",
        status: "sent",
      };

      dispatch(addMessage({ wa_id: activeChat, message: newMessage }));
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  if (!activeChat) {
    return (
      <div className="bg-white p-4 text-center text-gray-500 border-t border-gray-200">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="bg-white p-3 border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoHappy size={24} />
        </button>
        <button
          type="button"
          className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoAttach size={24} />
        </button>
        <div className="flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${activeChatData?.name || "user"}...`}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-500"
            disabled={sending}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || sending}
          className="text-gray-600 hover:text-white bg-green-500 hover:bg-green-600  p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <IoSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
