namespace BusManagement.Server.DTOs.Bus
{
    public class CreateBusDto
    {
        public string BusNum { get; set; } = string.Empty;
        public DateTime BusStartedDateAt { get; set; }
        public bool IsActive { get; set; }
    }
}
