import axios from "./index";


export default {
    getUser: async (id: number) => {
        const response = await axios.get(`users/byId${id}`);
        return response;
    },
    
    getUsers: async (ids: Array<number>) => {
        const stringIds = ids.join(',');
        const response = await axios.get(`users?ids=${stringIds}`);
        return response;
    },
    
    updateUserByToken: async (userData: {firstName: string, lastName: string, phone: string}) => {
        const response = await axios.put(`users/byId`, userData);
        return response;
    },
    
    addAvatar: async (file: File) => {
        const formData = new FormData();
        formData.append("avatar", file);
        const response = await axios.post(`users/photo`, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        return response;
    }
}