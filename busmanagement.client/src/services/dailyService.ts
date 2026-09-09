import api from '../api/axiosApi';
import { endPoints } from '../api/endPoints';
import type { addDailyTripDto } from '../types/DailyTrip/addMeterDto';
import type { dailyResponseDto } from '../types/DailyTrip/dailyResponseDto';



export const dailyService = {
    getAllDailyTrip: async (): Promise<dailyResponseDto[]> => {
        const response = await api.get<dailyResponseDto[]>(endPoints.DailyTrip.GetAll);
        return response.data;
    },

    getDailyTripById: async (id: number): Promise<dailyResponseDto> => {
        const response = await api.get<dailyResponseDto>(endPoints.DailyTrip.GET_BY_ID(id));
        return response.data;
    },

    addDailyTrip: async (empData: addDailyTripDto): Promise<dailyResponseDto> => {
        const response = await api.post<dailyResponseDto>(endPoints.DailyTrip.CREATE, empData);
        return response.data;
    }
}