using BusManagement.Server.Entity;

namespace BusManagement.Server.Repository.Interfaces
{
    public interface IFuelRepository
    {
        Task<IEnumerable<FuelInfo>> GetAllFuelAsync();
        Task<FuelInfo?> GetFuelInfoByIdAsync(int id);
        Task<int> AddFuelInfoAsync(FuelInfo fuel);
        Task<bool> DeleteFuelInfoAsync(int id);
    }
}
