import api from '../api/axiosApi';
import { endPoints } from '../api/endPoints';
import type { addMeterDto } from '../types/Meter/addMeterDto';
import type { meterResponseDto } from '../types/Meter/meterResponseDto';


export const meterService = {
    getAllMeter: async (): Promise<meterResponseDto[]> => {
        const response = await api.get<meterResponseDto[]>(endPoints.Meter.GetAllMeter);
        return response.data;
    },

    getMeterById: async (id: number): Promise<meterResponseDto> => {
        const response = await api.get<meterResponseDto>(endPoints.Meter.GETMETERID(id));
        return response.data;
    },

    addBus: async (empData: addMeterDto): Promise<meterResponseDto> => {
        const response = await api.post<meterResponseDto>(endPoints.Meter.CREATE, empData);
        return response.data;
    },
    deleteBus: async (id: number): Promise<void> => {
        const reponse = await api.delete<void>(endPoints.Meter.DELETE(id));
    }
}