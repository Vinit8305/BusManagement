using BusManagement.Server.Data;
using BusManagement.Server.DTOs.Fuel;
using BusManagement.Server.Entity;
using BusManagement.Server.Repository.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace BusManagement.Server.Repository.Implementations
{
    public class FuelRepository:IFuelRepository
    {
        private readonly AppDbContext _dbContext;
        public FuelRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<FuelInfo>> GetAllFuelAsync()
        {
            return await _dbContext.FuelInfo.FromSqlRaw("Exec sp_GetAllFuelInfo").AsNoTracking().ToListAsync();
        }
        public async Task<FuelInfo?> GetFuelInfoByIdAsync(int id)
        {
            var param = new SqlParameter("@FuelId", id);
            var result = await _dbContext.FuelInfo.FromSqlRaw("Exec sp_GetFuelByID @FuelId", param).AsNoTracking().ToListAsync();
            return result.FirstOrDefault(); 
        }
        public async Task<int> AddFuelInfoAsync(FuelInfo fuel)
        {
            var param1 = new SqlParameter("@BusId", fuel.BusId);
            var param2 = new SqlParameter("@FuelQuentity", fuel.FuelQuentity);
            var param3 = new SqlParameter("@FuelAmount", fuel.FuelAmount);
            var param4 = new SqlParameter("@RefuleDate", fuel.RefuleDate);
            var result = await _dbContext.Database.SqlQueryRaw<int>("Exec sp_InsertFuelData @BusId ,@FuelQuentity,@FuelAmount,@RefuleDate",param1,param2,param3,param4).ToListAsync();
            return result.FirstOrDefault();
        }
        public async Task<bool> DeleteFuelInfoAsync(int id)
        {
            var param = new SqlParameter("@FuelId", id);
            int rowsAffected = await _dbContext.Database.ExecuteSqlRawAsync("EXEC sp_DeleteFuelData @FuelId", param);

            return rowsAffected > 0;
        }
    }
}
