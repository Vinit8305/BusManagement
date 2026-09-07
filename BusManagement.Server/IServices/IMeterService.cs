using BusManagement.Server.DTOs.Meter;

namespace BusManagement.Server.IServices
{
    public interface IMeterService
    {
        Task<IEnumerable<MeterResponseDto>> GetAllMetersInfoAsync();
        Task<MeterResponseDto> GetMeterByIdAsync(int id);
        Task<MeterResponseDto> AddMeterAsync(CreateMeterDto createDto);
        Task<bool> DeleteMeterAsync(int id);
    }
}
