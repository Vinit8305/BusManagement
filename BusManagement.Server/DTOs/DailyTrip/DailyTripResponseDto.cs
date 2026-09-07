using BusManagement.Server.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusManagement.Server.DTOs.DailyTrip
{
    public class DailyTripResponseDto
    {
        public int TripId { get; set; }
        public int BusId { get; set; }
        public int EmpId { get; set; }
        //public int FuelId { get; set; }
        public int MeterId { get; set; }
        public DateTime TripDate { get; set; }
        public string BusNum { get; set; } = string.Empty;
        public string? Name { get; set; }
        public decimal MorningMeterReading { get; set; }
        public decimal EveningMeterReading { get; set; }
        public decimal DistanceCoverd { get; set; }
        public decimal Average { get; set; }
    }
}
