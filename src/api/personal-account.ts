import axios from "./index";

export default {
    getUserData: async () => {
        const response = await axios.get(`user/account/data`);
        return response;
    }
}

