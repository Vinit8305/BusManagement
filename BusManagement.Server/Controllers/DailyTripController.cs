using BusManagement.Server.DTOs.DailyTrip;
using BusManagement.Server.Entity;
using BusManagement.Server.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BusManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DailyTripController : ControllerBase
    {
        private readonly IDailyTripService _dailyTripService;

        public DailyTripController(IDailyTripService dailyTripService)
        {
            _dailyTripService = dailyTripService;
        }

        [HttpGet]
        public async Task<ActionResult<DailyTripResponseDto>> GetAllDailyTrip()
        {
            var dailyTrip = await _dailyTripService.GetAllDailyTripsAsync();
            return Ok(dailyTrip);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<DailyTripResponseDto>> GetDailyTripById(int id)
        {
            var dailyTrip = await _dailyTripService.GetDailyTripByIdAsync(id);
            if (dailyTrip == null)
            {
                return NotFound(new { message = $" Trip with Id {id} not found. " });
            }
            return Ok(dailyTrip);
        }

        [HttpPost]
        public async Task<ActionResult<DailyTripResponseDto>> AddDailyTrip([FromBody] CreateDailyTripDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newDailyTrip = await _dailyTripService.AddDailyTripAsync(createDto);
            return Ok(newDailyTrip);
        }
    }
}
