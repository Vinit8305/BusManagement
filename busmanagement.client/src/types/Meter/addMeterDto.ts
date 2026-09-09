export interface addMeterDto {
    busId: number;
    morningMeterReading: number;
    eveningMeterReading: number;
    morningMeterImgUrl: string;
    eveningMeterImgUrl: string;
    travelDate: Date;
}