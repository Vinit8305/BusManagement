using BusManagement.Server.DTOs.Meter;
using BusManagement.Server.Entity;
using BusManagement.Server.IServices;
using BusManagement.Server.Repository.Interfaces;

namespace BusManagement.Server.Services
{
    public class MeterService : IMeterService   
    {
        private readonly IMeterRepository _meterRepository;

        public MeterService(IMeterRepository meterRepository)
        {
            _meterRepository = meterRepository;
        }

        public async Task<IEnumerable<MeterResponseDto>> GetAllMetersInfoAsync()
        {
            var meters = await _meterRepository.GetAllMetersInfoAsync();
            if(meters == null)
            {
                return Enumerable.Empty<MeterResponseDto>();
            }

            return meters.Select(m => new MeterResponseDto
            {
                    MeterId = m.MeterId,
                    BusId = m.BusId,
                    MorningMeterReading = m.MorningMeterReading,
                    EveningMeterReading = m.EveningMeterReading,
                    MorningMeterImgUrl = m.MorningMeterImgUrl,
                    EveningMeterImgUrl = m.EveningMeterImgUrl,
                    TravelDate = m.TravelDate,
            }).ToList();
        }

        public async Task<MeterResponseDto?> GetMeterByIdAsync(int id)
        {
            var meter = await _meterRepository.GetMeterByIdAsync(id);
            if(meter == null)
            {
                return null;
            }
            return new MeterResponseDto
            {
                MeterId = meter.MeterId,
                BusId = meter.BusId,
                MorningMeterReading = meter.MorningMeterReading,
                EveningMeterReading = meter.EveningMeterReading,
                MorningMeterImgUrl = meter.MorningMeterImgUrl,
                EveningMeterImgUrl = meter.EveningMeterImgUrl,
                TravelDate = meter.TravelDate
            };
        }

        public async Task<MeterResponseDto> AddMeterAsync(CreateMeterDto createDto)
        {
            var meter = new MeterInfo
            {
                BusId = createDto.BusId,
                MorningMeterReading = createDto.MorningMeterReading,
                EveningMeterReading = createDto.EveningMeterReading,
                MorningMeterImgUrl = createDto.MorningMeterImgUrl,
                EveningMeterImgUrl = createDto.EveningMeterImgUrl,
                TravelDate = createDto.TravelDate
            };

            int newId = await _meterRepository.AddMeterAsync(meter);
            return new MeterResponseDto
            {
                MeterId = newId,
                BusId = meter.BusId,
                MorningMeterReading = meter.MorningMeterReading,
                EveningMeterReading = meter.EveningMeterReading,
                MorningMeterImgUrl = meter.MorningMeterImgUrl,
                EveningMeterImgUrl = meter.EveningMeterImgUrl,
                TravelDate = meter.TravelDate
            };
        }
    }
}
