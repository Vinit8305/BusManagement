namespace BusManagement.Server.DTOs.Bus
{
    public class BusResponseDto
    {
        public int BusId { get; set; }
        public string BusNum { get; set; } = string.Empty;
        public DateTime BusStartedDateAt { get; set; }
        public bool IsActive { get; set; } 
    }
}
