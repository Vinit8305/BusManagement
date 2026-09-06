namespace BusManagement.Server.DTOs.Employee
{
    public class EmployeeResponseDto
    {
        public int EmpId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public DateTime JoinDate { get; set; }
        public int BusId { get; set; }

    }
}
