import api from '../api/axiosApi';
import { endPoints } from '../api/endPoints';
import type { addPetrolDto } from '../types/Petrol/AddPetrolDto';
import type { petrolResponseDto } from '../types/Petrol/PetrolResponseDto';


export const petrolService = {
    getAllPetrol: async (): Promise<petrolResponseDto[]> => {
        const response = await api.get<petrolResponseDto[]>(endPoints.Petrol.GetAllPetrol);
        return response.data;
    },

    addPetrol: async (data: addPetrolDto): Promise<petrolResponseDto> => {
        const response = await api.post<petrolResponseDto>(endPoints.Petrol.CREATE, data);
        return response.data;
    },

    deletePetrol: async (id: number): Promise<void> => {
        await api.delete<void>(endPoints.Petrol.DELETE(id));
    },
};