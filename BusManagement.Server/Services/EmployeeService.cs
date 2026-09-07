using BusManagement.Server.DTOs.Employee;
using BusManagement.Server.Entity;
using BusManagement.Server.IServices;
using BusManagement.Server.Repository.Implementations;
using BusManagement.Server.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BusManagement.Server.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        
        public async Task<IEnumerable<EmployeeResponseDto>> GetAllEmployeeAsync()
        {
            var employees = await _employeeRepository.GetAllEmployeeAsync();

            if (employees == null)
            {
                return Enumerable.Empty<EmployeeResponseDto>();
            }


            return employees.Select(e => new EmployeeResponseDto
            {
                EmpId = e.EmpId,
                Name = e.Name ?? string.Empty,
                ContactNumber = e.ContactNumber ?? string.Empty,
                Role = e.Role ?? string.Empty,
                Salary = e.Salary,
                BusId = e.BusId,
                JoinDate = e.JoinDate

            }).ToList();
        }
        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            return await _employeeRepository.DeleteEmployeeAsync(id);
        }

        public async Task<EmployeeResponseDto?> GetEmployeeByIdAsync(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if(employee == null)
            {
                return null;
            }

            return new EmployeeResponseDto
            {
                EmpId = employee.EmpId,
                Name = employee.Name ?? string.Empty,
                Salary = employee.Salary,
                Role = employee.Role ?? string.Empty,
                ContactNumber = employee.ContactNumber ?? string.Empty,
                JoinDate = employee.JoinDate,
                BusId = employee.BusId
            };
        }

        public async Task<EmployeeResponseDto> AddEmployeeAsync(CreateEmployeeDto createDto)
        {
            var employee = new EmployeeInfo
            {
                Name = createDto.Name,
                Role = createDto.Role,
                Salary = createDto.Salary,
                ContactNumber = createDto.ContactNumber,
                JoinDate = createDto.JoinDate,
                BusId = createDto.BusId
            };
            int newId = await _employeeRepository.AddEmployeeAsync(employee);
            return new EmployeeResponseDto
            {
                EmpId = newId,
                Name = employee.Name,
                Role = employee.Role,
                Salary = employee.Salary,
                ContactNumber = employee.ContactNumber,
                JoinDate = employee.JoinDate,
                BusId = employee.BusId
            };
        }

    }
}
