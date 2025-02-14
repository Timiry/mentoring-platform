import axios from "./index";

export default {
  uploadPhoto: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`/media/upload/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};
