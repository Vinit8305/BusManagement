using BusManagement.Server.DTOs.Employee;

namespace BusManagement.Server.IServices
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeResponseDto>> GetAllEmployeeAsync();
        Task<EmployeeResponseDto> GetEmployeeByIdAsync(int id);
        Task<EmployeeResponseDto> AddEmployeeAsync(CreateEmployeeDto createDto);
    }
}
