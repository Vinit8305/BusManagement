using BusManagement.Server.Entity;

namespace BusManagement.Server.Repository.Interfaces
{
    public interface IBusRepository
    {
        Task<IEnumerable<Bus>> GetAllBusesAsync();
        Task<Bus?> GetBusByIdAsync(int id);
        Task<int> AddBusAsync(Bus bus);
        
    }
}
