CREATE OR ALTER PROCEDURE sp_GetDailyTripById
    @TripId INT
AS
BEGIN
    SET NOCOUNT ON;

        SELECT 
            TripId, 
            BusId, 
            EmpId, 
            MeterId, 
            TripDate, 
            BusNum, 
            Name, 
            MMR, 
            EMR, 
            DistanceCoverd, 
            Average
        FROM 
            DailyTripInfo WITH (NOLOCK)
        WHERE 
            TripId = @TripId;
   
END
GO