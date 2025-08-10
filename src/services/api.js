import axios from "axios";

const API_BASE_URL = "https://whatapp-backend-dtnd.onrender.com/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API functions
export const chatAPI = {
  // Get all chats grouped by wa_id
  getChats: async () => {
    try {
      const response = await api.get("/chats");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      throw error;
    }
  },

  // Get messages for a specific chat
  getMessages: async (wa_id) => {
    try {
      const response = await api.get(`/messages/${wa_id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      throw error;
    }
  },

  // Send a new message
  sendMessage: async (messageData) => {
    try {
      const response = await api.post("/send-message", messageData);
      return response.data;
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },
};

export default api;
