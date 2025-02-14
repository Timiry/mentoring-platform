import axios from "./index";
import { MentorDataToCreate } from "../types";

export default {
  createMentor: async (mentorData: MentorDataToCreate) => {
    const response = await axios.post(`/mentors/internal`, mentorData);
    return response;
  },

  getMentorsBySpecialization: async (specialization: string) => {
    const response = await axios.get(
      `mentors/catalog?specialization=${specialization}`
    );
    return response;
  },

  getAllMentors: async () => {
    const response = await axios.get(`mentors/catalog`);
    return response;
  },
};
