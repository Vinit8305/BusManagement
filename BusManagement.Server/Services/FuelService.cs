using BusManagement.Server.DTOs.Bus;
using BusManagement.Server.DTOs.Fuel;
using BusManagement.Server.Entity;
using BusManagement.Server.IServices;
using BusManagement.Server.Repository.Implementations;
using BusManagement.Server.Repository.Interfaces;

namespace BusManagement.Server.Services
{
    public class FuelService:IFuelService
    {
        private readonly IFuelRepository _fuelRepository;
        public FuelService(IFuelRepository fuelRepository)
        {
            _fuelRepository = fuelRepository;
        }

        public async Task<IEnumerable<FuelResponseDto>> GetAllFuelAsync()
        {
            var fuel = await _fuelRepository.GetAllFuelAsync();
            return fuel.Select(b => new FuelResponseDto
            {
                FuelId = b.FuelId,
                FuelAmount = b.FuelAmount,
                RefuleDate = b.RefuleDate,
                BusId = b.BusId,
                FuelQuentity = b.FuelQuentity
            });
        }
        public async Task<FuelResponseDto> GetFuelByIdAsync(int id)
        {
            var Fuel = await _fuelRepository.GetFuelInfoByIdAsync(id);
            if(Fuel == null)
            {
                return null;
            }
            return new FuelResponseDto
            {
                FuelId=Fuel.FuelId,
                BusId = Fuel.BusId,
                FuelQuentity = Fuel.FuelQuentity,
                FuelAmount = Fuel.FuelAmount,
                RefuleDate = Fuel.RefuleDate
            };
        }
        public async Task<FuelResponseDto> AddFuelAsync(CreateFuelDto fuelDto)
        {
            var fuel = new FuelInfo
            {
                BusId = fuelDto.BusId,
                FuelQuentity = fuelDto.FuelQuentity,
                FuelAmount = fuelDto.FuelAmount,
                RefuleDate = fuelDto.RefuleDate
            };
            int newId = await _fuelRepository.AddFuelInfoAsync(fuel);
            return new FuelResponseDto
            {
                FuelId = newId,
                BusId = fuelDto.BusId,
                FuelQuentity = fuelDto.FuelQuentity,
                FuelAmount = fuelDto.FuelAmount,
                RefuleDate = fuelDto.RefuleDate
            };
        }
        public async Task<bool> DeleteFuelAsync(int id)
        {
            return await _fuelRepository.DeleteFuelInfoAsync(id);
        }
    }
}
