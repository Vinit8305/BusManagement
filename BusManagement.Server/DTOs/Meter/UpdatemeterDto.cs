namespace BusManagement.Server.DTOs.Meter
{
    public class UpdatemeterDto
    {
        public int BusId { get; set; }
        public decimal MorningMeterReading { get; set; }
        public decimal EveningMeterReading { get; set; }
        public string MorningMeterImgUrl { get; set; } = string.Empty;
        public string EveningMeterImgUrl { get; set; } = string.Empty;
        public DateTime TravelDate { get; set; }
    }
}
