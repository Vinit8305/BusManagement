export const endPoints = {
    BUSES: {
        GET_ALL: '/Bus',
        GET_BY_ID: (id: number) => `/Bus/${id}`,
        CREATE: '/api/bus/create',
        UPDATE: '/api/bus/update', 
        DELETE: '/api/bus/delete',
    }
}