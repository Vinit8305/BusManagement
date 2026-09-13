using BusManagement.Server.DTOs.Fuel;

namespace BusManagement.Server.IServices
{
    public interface IFuelService
    {
        Task<IEnumerable<FuelResponseDto>> GetAllFuelAsync();
        Task<FuelResponseDto> GetFuelByIdAsync(int id);
        Task<FuelResponseDto> AddFuelAsync(CreateFuelDto createDto);
        Task<bool> DeleteFuelAsync(int id);
    }
}
