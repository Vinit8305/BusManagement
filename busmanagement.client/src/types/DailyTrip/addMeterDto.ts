export interface addDailyTripDto {
    busId: number;
    empId: number;
    meterId: number;
    tripDate: string;
    busNum: string;
    name: string;
    morningMeterReading: number;
    eveningMeterReading: number;
    distanceCoverd: string;
    average: string;
}