using BusManagement.Server.Entity;

namespace BusManagement.Server.Repository.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<EmployeeInfo>> GetAllEmployeeAsync();
        Task<EmployeeInfo?> GetEmployeeByIdAsync(int id);
        Task<int> AddEmployeeAsync(EmployeeInfo employee);
        Task<bool> DeleteEmployeeAsync(int id);
    }
}
