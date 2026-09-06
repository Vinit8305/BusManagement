import api from '../api/axiosApi';
import { endPoints } from '../api/endPoints';
import type { addBusDto } from '../types/bus/addBusDto';
import type { busResponseDto } from '../types/bus/busResponseDto';

export const busService = {
    // GET: Saari buses fetch karne ke liye
    getAllBuses: async (): Promise<busResponseDto[]> => {
        const response = await api.get<busResponseDto[]>(endPoints.BUSES.GET_ALL);
        return response.data;
    },

    // GET: Single bus ID se fetch karne ke liye
    getBusById: async (id: number): Promise<busResponseDto> => {
        const response = await api.get<busResponseDto>(endPoints.BUSES.GET_BY_ID(id));
        return response.data;
    },

    // Add buses kerne ke liye
    addBus: async (busData: addBusDto): Promise<busResponseDto> => {
        const response = await api.post<busResponseDto>(endPoints.BUSES.CREATE, busData);
        return response.data;
    }
}