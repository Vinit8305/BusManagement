using BusManagement.Server.DTOs.Bus;
using BusManagement.Server.DTOs.DailyTrip;

namespace BusManagement.Server.IServices
{
    public interface IDailyTripService
    {
        Task<IEnumerable<DailyTripResponseDto>> GetAllDailyTripsAsync();
        Task<DailyTripResponseDto> GetDailyTripByIdAsync(int id);
        Task<DailyTripResponseDto> AddDailyTripAsync(CreateDailyTripDto dailyTripDto);
    }
}
