using BusManagement.Server.DTOs.Meter;
using BusManagement.Server.Entity;
using BusManagement.Server.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BusManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeterController : ControllerBase
    {
        private readonly IMeterService _meterService;

        public MeterController(IMeterService meterService)
        {
            _meterService = meterService;
        }

        [HttpGet]
        public async Task<ActionResult<MeterResponseDto>> GetAllMeterInfo()
        {
            var meterInfo = await _meterService.GetAllMetersInfoAsync();
            return Ok(meterInfo);       
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<MeterResponseDto>> GetMeterById(int id) 
        {
            var meterinfo = await _meterService.GetMeterByIdAsync(id);

            if (meterinfo == null)
            {
                return NotFound(new { message = $"Meter with id {id} not found. " });
            }

            return Ok(meterinfo);
        }

        [HttpPost]
        public async Task<ActionResult<MeterResponseDto>> AddMeter( [FromBody]CreateMeterDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newMeter = await _meterService.AddMeterAsync(createDto);
            return Ok(newMeter);

        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMeter(int id)
        {
            var isDeleted = await _meterService.DeleteMeterAsync(id);
            if (!isDeleted)
            {
                return NotFound(new { message = $" Meter with Id {id} not found. " });
            }
            return NoContent();
        }
    }
}
