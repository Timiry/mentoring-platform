import api from "./index";

export default {
  getUserData: async () => {
    const response = await api.get(`user/account/data`);
    return response;
  },

  updateUserData: async (userData: {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  }) => {
    const response = await api.patch(`user/account/data`, userData);
    return response;
  },

  addAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`user/account/data/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};
