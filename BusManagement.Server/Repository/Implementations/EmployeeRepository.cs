using BusManagement.Server.Data;
using BusManagement.Server.Entity;
using BusManagement.Server.Repository.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Dapper;

namespace BusManagement.Server.Repository.Implementations
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _dbContext;
        
        public EmployeeRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<EmployeeInfo>> GetAllEmployeeAsync()
        {
            return await _dbContext.EmployeeInfo.FromSqlRaw("EXEC sp_GetAllEmployeeInfo").AsNoTracking().ToListAsync();
        }

        public async Task<EmployeeInfo?> GetEmployeeByIdAsync(int id)
        {
            var param = new SqlParameter("@EmpId", id);
            var result = await _dbContext.EmployeeInfo.FromSqlRaw("EXEC sp_GetEmployeById @EmpId", param).AsNoTracking().ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<int> AddEmployeeAsync(EmployeeInfo employeeInfo)
        {
            var connection = _dbContext.Database.GetDbConnection();
            var result = await connection.QuerySingleAsync<int>("sp_InsertEmployee", new {
                employeeInfo.Name,
                employeeInfo.Role,
                employeeInfo.Salary,
                employeeInfo.ContactNumber,
                employeeInfo.JoinDate,
                employeeInfo.BusId
            }, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var param = new SqlParameter("@EmpId", id);
            int rowsAffected = await _dbContext.Database.ExecuteSqlRawAsync("EXEC sp_DeleteEmployeeData @EmpId", param);
            return rowsAffected > 0;
        }
    }
}
