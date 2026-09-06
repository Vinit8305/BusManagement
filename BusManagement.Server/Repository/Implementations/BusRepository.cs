using BusManagement.Server.Data;
using BusManagement.Server.Entity;
using BusManagement.Server.Repository.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BusManagement.Server.Repository.Implementations
{
    public class BusRepository : IBusRepository
    {
        private readonly AppDbContext _dbContext;

        public BusRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Bus>> GetAllBusesAsync()
        {
            return await _dbContext.BusInfo.FromSqlRaw("EXEC sp_GetAllBusInfo").AsNoTracking().ToListAsync();
        }

        public async Task<Bus?> GetBusByIdAsync(int id)
        {
            var param = new SqlParameter("@BusId", id);
            var result = await _dbContext.BusInfo.FromSqlRaw("EXEC sp_GetBusByID @BusId", param).AsNoTracking().ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<int> AddBusAsync(Bus bus)
        {
            var param1 = new SqlParameter("@BusNum", bus.BusNum);
            var param2 = new SqlParameter("@IsActive", bus.IsActive);
            var param3 = new SqlParameter("@BusStartedDateAt", bus.BusStartedDateAt);

            var result = await _dbContext.Database.SqlQueryRaw<int>("EXEC sp_InsertBusData @BusNum, @IsActive, @BusStartedDateAt", param1, param2, param3).ToListAsync();

            return result.FirstOrDefault();
        }
    }
} 
