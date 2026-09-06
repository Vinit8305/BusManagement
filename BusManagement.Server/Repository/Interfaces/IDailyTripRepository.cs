using BusManagement.Server.Entity;

namespace BusManagement.Server.Repository.Interfaces
{
    public interface IDailyTripRepository
    {
        Task<IEnumerable<DailyTripInfo>> GetAllDailyTripsAsync();
        Task<DailyTripInfo?> GetDailyTripByIdAsync(int id);
        Task<int> AddDailyTripAsync(DailyTripInfo dailyTrip);
    }
}
