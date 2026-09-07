using BusManagement.Server.Data;
using BusManagement.Server.DTOs.DailyTrip;
using BusManagement.Server.Entity;
using BusManagement.Server.Repository.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BusManagement.Server.Repository.Implementations
{
    public class DailyTripRepository : IDailyTripRepository
    {
        private readonly AppDbContext _dbContext;

        public DailyTripRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<DailyTripInfo>> GetAllDailyTripsAsync()
        {
            return await _dbContext.DailyTripInfo.FromSqlRaw("EXEC sp_GetAllDailyTripsInfo").AsNoTracking().ToListAsync();
        }

        public async Task<DailyTripInfo?> GetDailyTripByIdAsync(int id) 
        {
            var param = new SqlParameter("@TripId", id);
            var result = await _dbContext.DailyTripInfo.FromSqlRaw("EXEC sp_GetDailyTripById, @TripId", param).AsNoTracking().ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<int> AddDailyTripAsync(DailyTripInfo dailyTripInfo)
        {
            var connection = _dbContext.Database.GetDbConnection();
            var result = await connection.QuerySingleAsync<int>("sp_InsertDailyTrip", new
            {
                
                dailyTripInfo.Name,
                dailyTripInfo.EmpId,
                dailyTripInfo.MeterId,
                dailyTripInfo.BusNum,
                dailyTripInfo.TripDate,
                dailyTripInfo.BusId,
                dailyTripInfo.MorningMeterReading,
                dailyTripInfo.EveningMeterReading,
                dailyTripInfo.DistanceCoverd,
                dailyTripInfo.Average,
            }, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
