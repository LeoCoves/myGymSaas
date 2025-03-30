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


        // ✅ Obtener los planes de un gimnasio específico
        [HttpGet("gym/{idGym}")]
        public async Task<ActionResult<IEnumerable<GymCustomPaymentPlan>>> GetPlansByGym(int idGym)
        {
            var plans = await _context.GymCustomPaymentPlans
            .Select(p => new
            {
                p.IdGymCustomPaymentPlan,
                p.GymId, // Solo se devuelve el ID
                p.Name,
                p.Description,
                p.Price,
                p.IsBasic,
                p.Features,
                p.Period,
                p.StartDate,
                p.EndDate
            })
            .Where(p => p.GymId == idGym)
            .ToListAsync();

                return Ok(plans);
        }

        // ✅ Obtener un plan de pago específico por su ID
        [HttpGet("{idGymCustomPaymentPlan}")]
        public async Task<ActionResult<GymCustomPaymentPlan>> GetPlanById(int idGymCustomPaymentPlan)
        {
            var plan = await _context.GymCustomPaymentPlans
                .Where(p => p.IdGymCustomPaymentPlan == idGymCustomPaymentPlan)
                .Select(p => new
                {
                    p.IdGymCustomPaymentPlan,
                    p.GymId,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.IsBasic,
                    p.Features,
                    p.Period,
                    p.StartDate,
                    p.EndDate
                })
                .FirstOrDefaultAsync();

            if (plan == null)
            {
                return NotFound("Plan de pago no encontrado.");
            }

            return Ok(plan);
        }


        // ✅ Crear un nuevo plan vinculado a un gimnasio
        [HttpPost]
        public async Task<ActionResult<GymCustomPaymentPlan>> CreateGymPlan([FromBody] GymCustomPaymentPlanDto gymPlanDto)
        {
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == gymPlanDto.GymId);
            if (!gymExists)
            {
                return NotFound("El gimnasio especificado no existe.");
            }

            var newGymPlan = new GymCustomPaymentPlan
            {
                GymId = gymPlanDto.GymId,
                Name = gymPlanDto.Name,
                Description = gymPlanDto.Description,
                Price = gymPlanDto.Price,
                IsBasic = gymPlanDto.IsBasic,
                Features = gymPlanDto.Features,
                Period = gymPlanDto.Period,
                StartDate = gymPlanDto.StartDate,
                EndDate = gymPlanDto.EndDate
            };

            _context.GymCustomPaymentPlans.Add(newGymPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlansByGym), new { idGym = newGymPlan.GymId }, newGymPlan);
        }

        // ✅ Editar un plan de pago
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGymPlan(int id,[FromBody] GymCustomPaymentPlanDto gymPlanDto)
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

            // Mantiene la relación con el gimnasio
            existingPlan.Name = gymPlanDto.Name;
            existingPlan.Description = gymPlanDto.Description;
            existingPlan.Price = gymPlanDto.Price;
            existingPlan.IsBasic = gymPlanDto.IsBasic;
            existingPlan.Features = gymPlanDto.Features;
            existingPlan.Period = gymPlanDto.Period;
            existingPlan.StartDate = gymPlanDto.StartDate;
            existingPlan.EndDate = gymPlanDto.EndDate;

            await _context.SaveChangesAsync();

            return Ok(existingPlan);
        }

        // ✅ Eliminar un plan de pago
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGymPlan(int id)
        {
            var plan = await _context.GymCustomPaymentPlans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            _context.GymCustomPaymentPlans.Remove(plan);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
