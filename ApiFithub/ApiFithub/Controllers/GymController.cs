using ApiFithub.Models;
using ApiFithub.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiFithub.Controllers
{
    [Route("api/[controller]")]
    public class GymController : Controller
    {
        private readonly ApiFithubContexto _context;

        public GymController(ApiFithubContexto context)
        {
            _context = context;
        }

        // ✅ Obtener todos los gimnasios junto con sus planes de pago
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gym>>> GetAllGyms()
        {
            // Obtener los gimnasios e incluir el PaymentPlan relacionado
            var gyms = await _context.Gyms
                                     .Include(g => g.PaymentPlan)  // Incluir PaymentPlan
                                     .ToListAsync();

            // Mapear los gimnasios a DTOs
            var gymDtos = gyms.Select(g => new GymDto
            {
                IdGym = g.IdGym,
                Name = g.Name,
                Description = g.Description,
                Address = g.Address,
                Email = g.Email,
                NumberPhone = g.Numberphone,
                IsActive = g.IsActive,
                IdPaymentPlan = g.IdPaymentPlan,
                PaymentPlan = g.PaymentPlan != null ? new PaymentPlanDto
                {
                    IdPaymentPlan = g.PaymentPlan.IdPaymentPlan,
                    Name = g.PaymentPlan.Name,
                    Description = g.PaymentPlan.Description,
                    Price = g.PaymentPlan.Price,
                    IsBasic = g.PaymentPlan.IsBasic,
                    Features = g.PaymentPlan.Features,
                    Period = g.PaymentPlan.Period,
                    StartDate = g.PaymentPlan.StartDate,
                    EndDate = g.PaymentPlan.EndDate
                } : null
            }).ToList();

            // Retornar los datos mapeados
            return Ok(gymDtos);
        }


        [HttpGet("{idGym}")]
        public async Task<ActionResult<GymDto>> GetGym(int idGym)
        {
            var gym = await _context.Gyms
                                    .Include(g => g.PaymentPlan)  // Incluir PaymentPlan
                                    .FirstOrDefaultAsync(g => g.IdGym == idGym);

            if (gym == null)
            {
                return NotFound("Gimnasio no encontrado.");
            }

            // Mapear el gimnasio a DTO
            var gymDto = new GymDto
            {
                IdGym = gym.IdGym,
                Name = gym.Name,
                Description = gym.Description,
                Address = gym.Address,
                Email = gym.Email,
                NumberPhone = gym.Numberphone,
                IsActive = gym.IsActive,
                IdPaymentPlan = gym.IdPaymentPlan,
                PaymentPlan = gym.PaymentPlan != null ? new PaymentPlanDto
                {
                    IdPaymentPlan = gym.PaymentPlan.IdPaymentPlan,
                    Name = gym.PaymentPlan.Name,
                    Description = gym.PaymentPlan.Description,
                    Price = gym.PaymentPlan.Price,
                    IsBasic = gym.PaymentPlan.IsBasic,
                    Features = gym.PaymentPlan.Features,
                    Period = gym.PaymentPlan.Period,
                    StartDate = gym.PaymentPlan.StartDate,
                    EndDate = gym.PaymentPlan.EndDate
                } : null
            };

            return Ok(gymDto);
        }


        [HttpPost]
        public async Task<ActionResult<Gym>> CreateGym(GymDto gymDto)
        {
            // Verificar si el plan de pago existe
            var paymentPlan = await _context.PaymentPlans
                                             .FirstOrDefaultAsync(p => p.IdPaymentPlan == gymDto.IdPaymentPlan);

            if (paymentPlan == null)
            {
                return NotFound("El plan de pago especificado no existe.");
            }

            // Crear el gimnasio con la relación al plan de pago
            var gym = new Gym
            {
                Name = gymDto.Name,
                Description = gymDto.Description,
                Address = gymDto.Address,
                Email = gymDto.Email,
                Numberphone = gymDto.NumberPhone,
                IsActive = gymDto.IsActive,
                IdPaymentPlan = gymDto.IdPaymentPlan,  // Asociamos el plan de pago
            };

            // Agregar el gimnasio al contexto y guardar los cambios
            _context.Gyms.Add(gym);
            await _context.SaveChangesAsync();

            // Retornar la ubicación del nuevo gimnasio creado
            return CreatedAtAction(nameof(GetGym), new { idGym = gym.IdGym }, gym);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGym(int id,[FromBody] GymDto gymDto)
        {
            // Buscar el gimnasio por ID
            var gym = await _context.Gyms.FindAsync(id);

            if (gym == null)
            {
                return NotFound("Gimnasio no encontrado.");
            }

            // Verificar si el plan de pago existe
            var paymentPlan = await _context.PaymentPlans
                                             .FirstOrDefaultAsync(p => p.IdPaymentPlan == gymDto.IdPaymentPlan);

            if (paymentPlan == null)
            {
                return NotFound("El plan de pago especificado no existe.");
            }

            // Actualizamos los datos del gimnasio
            gym.Name = gymDto.Name;
            gym.Description = gymDto.Description;
            gym.Address = gymDto.Address;
            gym.Email = gymDto.Email;
            gym.Numberphone = gymDto.NumberPhone;
            gym.IsActive = gymDto.IsActive;

            // Si el PaymentPlanId ha cambiado, asociamos el nuevo plan
            if (gym.IdPaymentPlan != gymDto.IdPaymentPlan)
            {
                gym.IdPaymentPlan = gymDto.IdPaymentPlan;
            }

            // Marcar como modificado y guardar los cambios
            _context.Entry(gym).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent(); // Devolvemos 204 (No Content) indicando que la actualización fue exitosa
        }

        [HttpPut("{id}/activate")]
        public async Task<IActionResult> ActivateGym(int id)
        {
            // Buscar el gimnasio por ID
            var gym = await _context.Gyms.FindAsync(id);

            if (gym == null)
            {
                return NotFound("Gimnasio no encontrado.");
            }

            // Activar el gimnasio
            gym.IsActive = true;
            _context.Entry(gym).State = EntityState.Modified;

            // Guardar los cambios
            await _context.SaveChangesAsync();

            return NoContent(); // Devolvemos 204 (No Content) indicando que la activación fue exitosa
        }


        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> DeactivateGym(int id)
        {
            // Buscar el gimnasio por ID
            var gym = await _context.Gyms.FindAsync(id);

            if (gym == null)
            {
                return NotFound("Gimnasio no encontrado.");
            }

            // Desactivar el gimnasio
            gym.IsActive = false;
            _context.Entry(gym).State = EntityState.Modified;

            // Guardar los cambios
            await _context.SaveChangesAsync();

            return NoContent(); // Devolvemos 204 (No Content) indicando que la desactivación fue exitosa
        }


    }
}

