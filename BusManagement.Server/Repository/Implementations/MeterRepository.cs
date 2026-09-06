using BusManagement.Server.Data;
using BusManagement.Server.DTOs.Meter;
using BusManagement.Server.Entity;
using BusManagement.Server.Repository.Interfaces;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BusManagement.Server.Repository.Implementations
{
    public class MeterRepository : IMeterRepository
    {
        private readonly AppDbContext _dbContext;

        public MeterRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<MeterInfo>> GetAllMetersInfoAsync()
        {
            return await _dbContext.MeterInfo.FromSqlRaw("EXEC sp_GetAllMetersInfo").AsNoTracking().ToListAsync();
        }

        public async Task<MeterInfo?> GetMeterByIdAsync(int id)
        {
            var param = new SqlParameter("@MeterId", id);
            var result = await _dbContext.MeterInfo.FromSqlRaw("EXEC sp_GetMeterInfo   ById, @MeterId", param).AsNoTracking().ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<int> AddMeterAsync(MeterInfo meter)
        {
            var connection = _dbContext.Database.GetDbConnection();
            var result = await connection.QuerySingleAsync<int>("sp_InsertMeterInfo", new
            {
                meter.BusId,
                meter.MorningMeterReading,
                meter.EveningMeterReading,
                meter.MorningMeterImgUrl,
                meter.EveningMeterImgUrl,
                meter.TravelDate
            }, commandType: System.Data.CommandType.StoredProcedure);

            return result;
        }
    }
}
