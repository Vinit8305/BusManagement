using BusManagement.Server.DTOs.Bus;

namespace BusManagement.Server.IServices
{
    public interface IBusService
    {
        Task<IEnumerable<BusResponseDto>> GetAllBusesAsync();
        Task<BusResponseDto> GetBusByIdAsync(int id);
        Task<BusResponseDto> AddBusAsync(CreateBusDto createDto);
        Task<bool> DeleteBusAsync(int id);
    }
}
