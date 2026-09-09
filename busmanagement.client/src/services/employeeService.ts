import api from '../api/axiosApi';
import { endPoints } from '../api/endPoints';
import type { addEmployeeDto } from '../types/employee/addEmployeeDto';
import type { employeeResponseDto } from '../types/employee/employeeResponseDto';

export const employeeService = {
    getAllEmployee: async (): Promise<employeeResponseDto[]> => {
        const response = await api.get<employeeResponseDto[]>(endPoints.Employee.GetAllEmployee);
        return response.data;
    },

    getEmployeeById: async (id: number): Promise<employeeResponseDto> => {
        const response = await api.get<employeeResponseDto>(endPoints.Employee.GetEmployeeId(id));
        return response.data;
    },

    addBus: async (empData: addEmployeeDto): Promise<employeeResponseDto> => {
        const response = await api.post<employeeResponseDto>(endPoints.Employee.CREATE, empData);
        return response.data;
    },
    deleteBus: async (id: number): Promise<void> => {
        const reponse = await api.delete<void>(endPoints.Employee.DELETE(id));
    }
}