import api from "./index";

export default {
  getUser: async () => {
    const response = await api.get(`users/byId`);
    return response;
  },

  getUsers: async (ids: number[]) => {
    const stringIds = ids.join(",");
    const response = await api.get(`users?ids=${stringIds}`);
    return response;
  },

  updateUserByToken: async (userData: {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  }) => {
    const response = await api.put(`users/byId`, userData);
    return response;
  },

  addAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.post(`users/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};
