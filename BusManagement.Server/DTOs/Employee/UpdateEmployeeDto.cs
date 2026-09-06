namespace BusManagement.Server.DTOs.Employee
{
    public class UpdateEmployeeDto
    {
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public DateTime JoinDate { get; set; }
    }
}
