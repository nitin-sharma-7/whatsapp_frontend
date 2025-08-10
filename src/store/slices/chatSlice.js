import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  chats: [],
  messages: {},
  activeChat: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Set chats
    setChats: (state, action) => {
      state.chats = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Set messages for a specific chat
    setMessages: (state, action) => {
      const { wa_id, messages } = action.payload;
      state.messages[wa_id] = messages;
      state.loading = false;
      state.error = null;
    },

    // Add a new message to a chat
    addMessage: (state, action) => {
      const { wa_id, message } = action.payload;
      if (!state.messages[wa_id]) {
        state.messages[wa_id] = [];
      }
      state.messages[wa_id].push(message);
    },

    // Set active chat
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setChats,
  setMessages,
  addMessage,
  setActiveChat,
  setLoading,
  setError,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;
