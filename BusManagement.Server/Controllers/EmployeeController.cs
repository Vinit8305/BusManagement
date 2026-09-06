using BusManagement.Server.DTOs.Employee;
using BusManagement.Server.IServices;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BusManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<ActionResult<EmployeeResponseDto>> GetAllEmployees()
        {
            var employee = await _employeeService.GetAllEmployeeAsync();
            return Ok(employee);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EmployeeResponseDto>> GetEmployeeByIdAsync(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if(employee == null)
            {
                return NotFound(new { message = $"Employe with id {id} not found. " });
            }
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeResponseDto>> AddEmployee([FromBody] CreateEmployeeDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newEmp = await _employeeService.AddEmployeeAsync(createDto);
            return Ok(newEmp);
        }
    }
}
