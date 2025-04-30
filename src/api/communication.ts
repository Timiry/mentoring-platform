import api from "./index";

export default {
  createChat: async () => {
    const response = await api.post(`/chats`);
    return response;
  },

  inviteUserToChat: async (chatId: string, userId: number) => {
    const response = await api.post(`/chats/${chatId}/invite?userId=${userId}`);
    return response;
  },

  uploadAttachment: async (chatId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(
      `/chats/${chatId}/attachments/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },

  getUserChats: async () => {
    const response = await api.get(`/chats`);
    return response;
  },

  getChatUsers: async (chatId: string) => {
    const response = await api.get(`/chats/${chatId}/users`);
    return response;
  },

  getChatMessages: async (chatId: string, page: number, size: number) => {
    const response = await api.get(
      `/messages/${chatId}?page=${page}&size=${size}`
    );
    return response;
  },
};
