using ApiFithub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiFithub.Controllers
{
    [Route("api/plans")]
    public class PaymentPlanController : Controller
    {
        private readonly ApiFithubContexto _context;

        public PaymentPlanController(ApiFithubContexto context)
        {
            _context = context;
        }

        // GET: api/planes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentPlan>>> GetPlanes()
        {
            return await _context.PaymentPlans.ToListAsync();
        }

        // GET: api/planes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentPlan>> GetPlan(int id)
        {
            var plan = await _context.PaymentPlans.FindAsync(id);
            if (plan == null) return NotFound();
            return plan;
        }

        // POST: api/planes (Crear un nuevo plan)
        [HttpPost]
        //[Authorize(Roles = "Admin")] // Solo administradores pueden crear planes
        public async Task<ActionResult<PaymentPlan>> CreatePlan(PaymentPlan plan)
        {
            _context.PaymentPlans.Add(plan);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlan), new { id = plan.IdPaymentPlan }, plan);
        }

        // PUT: api/planes/{id} (Actualizar un plan)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlan(int id, PaymentPlan planUpdate)
        {
            if (planUpdate == null || id != planUpdate.IdPaymentPlan)
            {
                return BadRequest("Datos inválidos");
            }

            var existingPlan = await _context.PaymentPlans.FindAsync(id);
            if (existingPlan == null)
            {
                return NotFound();
            }

            existingPlan.Name = planUpdate.Name;
            existingPlan.Description = planUpdate.Description;
            existingPlan.PriceCadena = planUpdate.PriceCadena;
            existingPlan.BasicFeatures = planUpdate.BasicFeatures;
            existingPlan.Features = planUpdate.Features;
            existingPlan.Type = planUpdate.Type;

            _context.PaymentPlans.Update(existingPlan);
            await _context.SaveChangesAsync();

            return Ok(existingPlan);
        }

        // DELETE: api/planes/{id} (Eliminar un plan)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _context.PaymentPlans.FindAsync(id);
            if (plan == null) return NotFound();

            _context.PaymentPlans.Remove(plan);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
