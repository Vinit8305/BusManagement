export interface meterResponseDto {
    meterId: number;
    busId: number;
    morningMeterReading: number;
    eveningMeterReading: number;
    morningMeterImgUrl: string;
    eveningMeterImgUrl: string;
    travelDate: Date;
}