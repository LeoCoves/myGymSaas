using ApiFithub.Models;
using ApiFithub.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiFithub.Controllers
{
    [Route("api/[controller]")]
    public class GymCustomPaymentPlanController : Controller
    {
        private readonly ApiFithubContexto _context;

        public GymCustomPaymentPlanController(ApiFithubContexto context)
        {
            _context = context;
        }


        // ✅ GET: api/gymcustompaymentplan/gym/{idGym} (Obtener planes de pago para un gimnasio)
        [HttpGet("gym/{idGym}")]
        public async Task<ActionResult<IEnumerable<GymCustomPaymentPlan>>> GetPlansByGym(int idGym)
        {
            var plans = await _context.GymCustomPaymentPlans
                .Where(p => p.IdGym == idGym && p.IdGym != null)  // Asegurando que IdGym no sea null
                .ToListAsync();


            if (plans.Count == 0)
            {
                return NotFound("No se encontraron planes de pago para este gimnasio.");
            }

            return Ok(plans);
        }

        // ✅ GET: api/gymcustompaymentplan/{id} (Obtener un plan de pago por ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<GymCustomPaymentPlan>> GetPlanById(int id)
        {
            var plan = await _context.GymCustomPaymentPlans
                .FirstOrDefaultAsync(p => p.IdGymCustomPaymentPlan == id);

            if (plan == null)
            {
                return NotFound("Plan de pago no encontrado.");
            }

            return Ok(plan);
        }

        // ✅ POST: api/gymcustompaymentplan (Crear un nuevo plan de pago)
        [HttpPost]
        public async Task<ActionResult<GymCustomPaymentPlan>> CreatePlan([FromBody] GymCustomPaymentPlanDto gymPlanDto)
        {
            if (gymPlanDto == null)
            {
                return BadRequest("El objeto del plan de pago no puede ser nulo.");
            }

            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == gymPlanDto.IdGym);

            if (!gymExists)
            {
                return NotFound("El gimnasio especificado no existe.");
            }

            var newPlan = new GymCustomPaymentPlan
            {
                IdGym = gymPlanDto.IdGym,
                Name = gymPlanDto.Name,
                Description = gymPlanDto.Description,
                Price = gymPlanDto.Price,
                IsBasic = gymPlanDto.IsBasic,
                Features = gymPlanDto.Features,
                Period = gymPlanDto.Period,
                Duration = gymPlanDto.Duration
            };

            _context.GymCustomPaymentPlans.Add(newPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlanById), new { id = newPlan.IdGymCustomPaymentPlan }, newPlan);
        }

        // ✅ PUT: api/gymcustompaymentplan/{id} (Actualizar un plan de pago)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] GymCustomPaymentPlanDto gymPlanDto)
        {
            if (id != gymPlanDto.IdGymCustomPaymentPlan)
            {
                return BadRequest("ID del plan no coincide.");
            }

            var existingPlan = await _context.GymCustomPaymentPlans.FindAsync(id);
            if (existingPlan == null)
            {
                return NotFound("Plan de pago no encontrado.");
            }

            existingPlan.Name = gymPlanDto.Name;
            existingPlan.Description = gymPlanDto.Description;
            existingPlan.Price = gymPlanDto.Price;
            existingPlan.IsBasic = gymPlanDto.IsBasic;
            existingPlan.Features = gymPlanDto.Features;
            existingPlan.Period = gymPlanDto.Period;
            existingPlan.Duration = gymPlanDto.Duration;

            await _context.SaveChangesAsync();

            return Ok(existingPlan);
        }

        // ✅ DELETE: api/gymcustompaymentplan/{id} (Eliminar un plan de pago)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _context.GymCustomPaymentPlans.FindAsync(id);
            if (plan == null)
            {
                return NotFound("Plan de pago no encontrado.");
            }

            _context.GymCustomPaymentPlans.Remove(plan);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
