import axios from "./index";
import { MentorData } from "../types";


export default {
    createMentor: async (mentorData: MentorData) => {
        const response = await axios.post(`/mentors/internal`, mentorData);
        return response;
    },
    
    getMentorsBySpecialization: async (specialization: string) => {
        const response = await axios.get(`mentors/catalog?specialization=${specialization}`);
        return response;
    }
}