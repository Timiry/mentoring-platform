import axios from "./index";

export default {
    getUserData: async () => {
        const response = await axios.get(`user/account/data`);
        return response;
    },

    updateUserData: async (userData: {firstName: string | null, lastName: string | null, phone: string | null}) => {
        const response = await axios.patch(`user/account/data`, userData);
        return response;
    },
    
    addAvatar: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(`user/account/data/photo`, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        return response;
    }
}

