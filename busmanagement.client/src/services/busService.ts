import api from '../api/axiosApi';
import { endPoints } from '../api/endPoints';
import type { addBusDto } from '../types/bus/addBusDto';
import type { busResponseDto } from '../types/bus/busResponseDto';

export const busService = {
    getAllBuses: async (): Promise<busResponseDto[]> => {
        const response = await api.get<busResponseDto[]>(endPoints.BUSES.GET_ALL);
        return response.data;
    },

    getBusById: async (id: number): Promise<busResponseDto> => {
        const response = await api.get<busResponseDto>(endPoints.BUSES.GET_BY_ID(id));
        return response.data;
    },

    addBus: async (busData: addBusDto): Promise<busResponseDto> => {
        const response = await api.post<busResponseDto>(endPoints.BUSES.CREATE, busData);
        return response.data;
    },
    deleteBus: async (id: number): Promise<void> => {
        const reponse = await api.delete<void>(endPoints.BUSES.DELETE(id));
    }
}