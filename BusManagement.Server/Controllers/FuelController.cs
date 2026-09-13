using BusManagement.Server.DTOs.Bus;
using BusManagement.Server.DTOs.Fuel;
using BusManagement.Server.IServices;
using BusManagement.Server.Services;
using Microsoft.AspNetCore.Mvc;


namespace BusManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuelController : ControllerBase
    {
        private readonly IFuelService _fuelService;
        public FuelController(IFuelService fuelService)
        {
            _fuelService = fuelService;
        }

        [HttpGet]
        public async Task<ActionResult<FuelResponseDto>> GetAllFuel()
        {
            var fuel = await _fuelService.GetAllFuelAsync();
            return Ok(fuel);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<FuelResponseDto>> GetFuelById(int id)
        {
            var fuel = await _fuelService.GetFuelByIdAsync(id);
            if (fuel == null)
            {
                return NotFound(new { message = $" Bus with Id {id} not found. " });
            }
            return Ok(fuel);
        }

        [HttpPost]
        public async Task<ActionResult<FuelResponseDto>> AddFuel([FromBody] CreateFuelDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newFuel = await _fuelService.AddFuelAsync(createDto);
            return CreatedAtAction(nameof(GetFuelById), new { id = newFuel.FuelId }, newFuel);
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteFuel(int id)
        {
            var isDeleted = await _fuelService.DeleteFuelAsync(id);
            if (!isDeleted)
            {
                return NotFound(new { message = $" Bus with Id {id} not found. " });
            }
            return NoContent();
        }
    }
}
