import api from "./index";
import { MentorDataToCreate } from "../types";

export default {
  createMentor: async (mentorData: MentorDataToCreate) => {
    const response = await api.post(`/mentors/internal`, mentorData);
    return response;
  },

  // такого апи нет
  getMentorById: async (mentorId: number) => {
    const response = await api.get(`mentors/${mentorId}`);
    return response;
  },

  // и такого апи нет
  updateMentor: async (mentorData: MentorDataToCreate) => {
    const response = await api.post(
      `/mentors/${mentorData.userId}`,
      mentorData
    );
    return response;
  },

  getMentorsBySpecialization: async (specialization: string) => {
    const response = await api.get(
      `mentors/catalog?specialization=${specialization}`
    );
    return response;
  },

  getAllMentors: async () => {
    const response = await api.get(`mentors/catalog`);
    return response;
  },
};
