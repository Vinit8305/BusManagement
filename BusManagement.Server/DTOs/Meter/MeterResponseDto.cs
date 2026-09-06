using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusManagement.Server.DTOs.Meter
{
    public class MeterResponseDto
    {
        public int MeterId { get; set; }
        public int BusId { get; set; }
        public decimal MorningMeterReading { get; set; }
        public decimal EveningMeterReading { get; set; }
        public string MorningMeterImgUrl { get; set; } = string.Empty;
        public string EveningMeterImgUrl { get; set; } = string.Empty;
        public DateTime TravelDate { get; set; }
    }
}
