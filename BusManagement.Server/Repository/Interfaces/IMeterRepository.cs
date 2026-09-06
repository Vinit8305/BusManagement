using BusManagement.Server.DTOs.Meter;
using BusManagement.Server.Entity;

namespace BusManagement.Server.Repository.Interfaces
{
    public interface IMeterRepository
    {
        Task<IEnumerable<MeterInfo>> GetAllMetersInfoAsync();
        Task<MeterInfo> GetMeterByIdAsync(int id);
        Task<int> AddMeterAsync(MeterInfo meter);
    }
}
