import api from "./index";
import { MentorDataToCreate } from "../types";

export default {
  createMentor: async (mentorData: MentorDataToCreate) => {
    const response = await api.post(`/mentors/internal`, mentorData);
    return response;
  },

  getMentorById: async (mentorId: number) => {
    const response = await api.get(`/mentors/internal/${mentorId}`);
    return response;
  },

  // такого апи нет
  updateMentor: async (mentorData: MentorDataToCreate) => {
    const response = await api.patch(
      `/mentors/internal/${mentorData.userId}`,
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

  isStudentHasMentor: async (studentId: number, mentorId: number) => {
    //   const response = await api.get(
    //     `/mentors/internal/${mentorId}/students/${studentId}/is-student`
    //   );
    //   return response;
    return { data: true, bla: { studentId, mentorId } };
  },

  addStudentToMentor: async (mentorId: number, studentId: number) => {
    const response = await api.patch(
      `/mentors/internal/${mentorId}/students/add`,
      {
        studentId: studentId,
      }
    );
    return response;
  },
};
