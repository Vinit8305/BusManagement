using BusManagement.Server.DTOs.Bus;
using BusManagement.Server.Entity;
using BusManagement.Server.IServices;
using BusManagement.Server.Repository.Interfaces;

namespace BusManagement.Server.Services
{
    public class BusService : IBusService
    {
        private readonly IBusRepository _busRepository;

        public BusService(IBusRepository busRepository)
        {
            _busRepository = busRepository;
        }

        public async Task<IEnumerable<BusResponseDto>> GetAllBusesAsync()
        {
            var bus = await _busRepository.GetAllBusesAsync();

            return bus.Select(b => new BusResponseDto
            {
                BusId = b.BusId,
                BusNum = b.BusNum,
                IsActive = b.IsActive,
                BusStartedDateAt = b.BusStartedDateAt
            });
        }

        public async Task<BusResponseDto?> GetBusByIdAsync(int id)
        {
            var bus = await _busRepository.GetBusByIdAsync(id);
            if (bus == null)
            {
                return null;
            }

            return new BusResponseDto
            {
                BusId = bus.BusId,
                BusNum = bus.BusNum,
                IsActive = bus.IsActive,
                BusStartedDateAt = bus.BusStartedDateAt
            };
        }

        public async Task<BusResponseDto> AddBusAsync(CreateBusDto createDto)
        {
            var bus = new Bus
            {
                BusNum = createDto.BusNum,
                IsActive = createDto.IsActive,
                BusStartedDateAt = createDto.BusStartedDateAt
            };

            int newId = await _busRepository.AddBusAsync(bus);

            return new BusResponseDto
            {
                BusId = newId,
                BusNum = bus.BusNum,
                IsActive = bus.IsActive,
                BusStartedDateAt = bus.BusStartedDateAt
            }; 
        }
    }
}
