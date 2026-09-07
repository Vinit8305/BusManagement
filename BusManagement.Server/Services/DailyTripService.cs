using BusManagement.Server.DTOs.DailyTrip;
using BusManagement.Server.DTOs.Employee;
using BusManagement.Server.Entity;
using BusManagement.Server.IServices;
using BusManagement.Server.Repository.Implementations;
using BusManagement.Server.Repository.Interfaces;

namespace BusManagement.Server.Services
{
    public class DailyTripService : IDailyTripService
    {
        private readonly IDailyTripRepository _dailyTripRepository;

        public DailyTripService(IDailyTripRepository dailyTripRepository)
        {
            _dailyTripRepository = dailyTripRepository;
        }

        public async Task<IEnumerable<DailyTripResponseDto>> GetAllDailyTripsAsync()
        {
            var dailyTrips = await _dailyTripRepository.GetAllDailyTripsAsync();

            if (dailyTrips == null)
            {
                return Enumerable.Empty<DailyTripResponseDto>();
            }


            return dailyTrips.Select(d => new DailyTripResponseDto
            {
                TripId = d.TripId,
                MeterId = d.MeterId,
                EmpId = d.EmpId,
                Name = d.Name ?? string.Empty,
                BusId = d.BusId,
                TripDate = d.TripDate,
                MorningMeterReading = d.MorningMeterReading,
                EveningMeterReading = d.EveningMeterReading,
                DistanceCoverd = d.DistanceCoverd,
                Average = d.Average,
                BusNum = d.BusNum,

            }).ToList();
        }

        public async Task<DailyTripResponseDto?> GetDailyTripByIdAsync(int id)
        {
            var dailyTrip = await _dailyTripRepository.GetDailyTripByIdAsync(id);
            if (dailyTrip == null)
            {
                return null;
            }

            return new DailyTripResponseDto
            {
                TripId = dailyTrip.TripId,
                MeterId = dailyTrip.MeterId,
                EmpId = dailyTrip.EmpId,
                Name = dailyTrip.Name ?? string.Empty,
                BusId = dailyTrip.BusId,
                TripDate = dailyTrip.TripDate,
                MorningMeterReading = dailyTrip.MorningMeterReading,
                EveningMeterReading = dailyTrip.EveningMeterReading,
                DistanceCoverd = dailyTrip.DistanceCoverd,
                Average = dailyTrip.Average,
                BusNum = dailyTrip.BusNum,
            };
        }

        public async Task<DailyTripResponseDto> AddDailyTripAsync(CreateDailyTripDto createDto)
        {
            var dailyTrip = new DailyTripInfo
            {
                MeterId= createDto.MeterId,
                EmpId= createDto.EmpId,
                TripDate = createDto.TripDate,
                Name = createDto.Name,
                BusId = createDto.BusId,
                BusNum = createDto.BusNum,
                MorningMeterReading = createDto.MorningMeterReading,
                EveningMeterReading = createDto.EveningMeterReading,
                DistanceCoverd = createDto.DistanceCoverd,
                Average = createDto.Average,
            };
            int newId = await _dailyTripRepository.AddDailyTripAsync(dailyTrip);
            return new DailyTripResponseDto
            {
                TripId = newId,
                MeterId = dailyTrip.MeterId,
                EmpId = dailyTrip.EmpId,
                Name = dailyTrip.Name ?? string.Empty,
                BusId = dailyTrip.BusId,
                TripDate = dailyTrip.TripDate,
                MorningMeterReading = dailyTrip.MorningMeterReading,
                EveningMeterReading = dailyTrip.EveningMeterReading,
                DistanceCoverd = dailyTrip.DistanceCoverd,
                Average = dailyTrip.Average,
                BusNum = dailyTrip.BusNum,
            };
        }
    }
}
