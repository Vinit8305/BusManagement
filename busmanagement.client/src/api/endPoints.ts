export const endPoints = {
    BUSES: {
        GET_ALL: '/api/Bus',
        GET_BY_ID: (id: number) => `/api/Bus/${id}`,
        CREATE: '/api/Bus',
        DELETE: (id: number) => `/api/Bus/${id}`
    },
    DailyTrip: {
        GetAll: '/api/DailyTrip',
        GET_BY_ID: (id: Number) => `/api/DailyTrip/${id}`,
        CREATE:'/api/DailyTrip'
    },
    Employee: {
        GetAllEmployee: '/api/Employee',
        GetEmployeeId: (id: number) => `/api/Employee/${id}`,
        CREATE: '/api/Employee',
        DELETE:(id:number)=>`/api/Employee/${id}`   
    },
    Meter: {
        GetAllMeter: '/api/Meter',
        CREATE: '/api/Meter',
        GETMETERID: (id: number) => `/api/Meter/${id}`,
        DELETE: (id: number)=>`/api/Meter/${id}`
    }
}