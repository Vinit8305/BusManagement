using BusManagement.Server.DTOs.Bus;
using BusManagement.Server.IServices;
using Microsoft.AspNetCore.Mvc;


namespace BusManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusController : ControllerBase
    {
        private readonly IBusService _busService;

        public BusController(IBusService busService)
        {
            _busService = busService;
        }

        [HttpGet]
        public async Task<ActionResult<BusResponseDto>> GetAllBuses()
        {
            var bus = await _busService.GetAllBusesAsync();
            return Ok(bus);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<BusResponseDto>> GetBusById(int id)
        {
            var bus = await _busService.GetBusByIdAsync(id);
            if(bus == null)
            {
                return NotFound(new { message = $" Bus with Id {id} not found. " });
            }
            return Ok(bus);
        }

        [HttpPost]
        public async Task<ActionResult<BusResponseDto>> AddBus([FromBody] CreateBusDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newBus = await _busService.AddBusAsync(createDto);
            return CreatedAtAction(nameof(GetBusById), new { id = newBus.BusId }, newBus);
        }
    }
}
