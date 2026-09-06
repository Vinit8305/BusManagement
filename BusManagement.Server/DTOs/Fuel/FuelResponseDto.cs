namespace BusManagement.Server.DTOs.Fuel
{
    public class FuelResponseDto
    {
        public int FuelId { get; set; }
        public int BusId { get; set; }
        public decimal FuelQuentity { get; set; }
        public decimal FuelAmount { get; set; }
        public DateTime RefuleDate { get; set; }
    }
}
