using ApiFithub.Models;
using ApiFithub.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace ApiFithub.Controllers
{
    [Route("api/clients")]
    public class ClientController : Controller
    {
        private readonly ApiFithubContexto _context;

        public ClientController(ApiFithubContexto context)
        {
            _context = context;
        }

        // ✅ GET: api/clients/gym/{idGym} (Obtener todos los clientes de un gimnasio específico)
        [HttpGet("gym/{idGym}")]
        public async Task<ActionResult<IEnumerable<Client>>> GetClientsByGym(int idGym)
        {
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == idGym);
            if (!gymExists)
            {
                return NotFound("Gimnasio no encontrado.");
            }

            var clients = await _context.Clients
                .Where(c => c.IdGym == idGym)
                .Include(c => c.GymCustomPaymentPlans)  // Relacionamos el plan de pago
                .ToListAsync();

            if (clients.Count == 0)
            {
                return NotFound("No se encontraron clientes para este gimnasio.");
            }

            return Ok(clients);
        }

        // ✅ GET: api/clients/{id} (Obtener cliente por ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClientById(int id)
        {
            var client = await _context.Clients
                .Include(c => c.GymCustomPaymentPlans)  // Relacionamos el plan de pago
                .FirstOrDefaultAsync(c => c.IdClient == id);

            if (client == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            return Ok(client);
        }

        // POST: api/clients
        [HttpPost]
        public async Task<ActionResult<Client>> CreateClient([FromBody] ClientDto clientDto)
        {
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == clientDto.IdGym);
            if (!gymExists)
            {
                return NotFound($"El gimnasio con ID {clientDto.IdGym} no existe.");
            }

            var newClient = new Client
            {
                IdGym = clientDto.IdGym,
                Name = clientDto.Name,
                Surname = clientDto.Surname,
                Email = clientDto.Email,
                PhoneNumber = clientDto.PhoneNumber,
                IsActive = clientDto.IsActive,
                FirstDayInscription = DateTime.UtcNow
            };

            _context.Clients.Add(newClient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientById), new { id = newClient.IdClient }, newClient);
        }

        [HttpGet("{idClient}/inscription")]
        public async Task<IActionResult> GetClientInscription(int idClient)
        {
            var client = await _context.Clients
                .Where(c => c.IdClient == idClient)
                .Select(c => new
                {
                    c.IdInscription,
                    Inscription = _context.Inscriptions
                        .Where(i => i.IdInscription == c.IdInscription)
                        .Select(i => new
                        {
                            i.IdGymCustomPaymentPlan,
                            i.StartDate,
                            i.EndDate,
                            i.Payment,
                            i.Cost,
                            i.Refund,
                            i.PaymentMethod,
                            Plan = new
                            {
                                i.GymCustomPaymentPlan.Name,
                                i.GymCustomPaymentPlan.Description,
                                i.GymCustomPaymentPlan.Price,
                                i.GymCustomPaymentPlan.Period,
                                i.GymCustomPaymentPlan.Duration
                            }
                        })
                        .FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            if (client == null || client.Inscription == null)
            {
                return NotFound(new { message = "Inscripción no encontrada" });
            }

            return Ok(client.Inscription);
        }


        [HttpPost("{clientId}/inscriptions")]
        public async Task<IActionResult> CreateInscription(int clientId, [FromBody] InscriptionDto inscriptionDto)
        {
            // Verificamos si el gimnasio especificado existe
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == inscriptionDto.IdGym);
            if (!gymExists)
            {
                return BadRequest("El gimnasio especificado no existe.");
            }

            // Buscamos el cliente
            var client = await _context.Clients.FindAsync(clientId);
            if (client == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            // Verificamos si el plan de pago existe
            var planExists = await _context.GymCustomPaymentPlans
                .AnyAsync(p => p.IdGymCustomPaymentPlan == inscriptionDto.IdGymCustomPaymentPlan);
            if (!planExists)
            {
                return NotFound("El plan de pago especificado no existe.");
            }

            // Calculamos la fecha de finalización del plan
            var paymentPlan = await _context.GymCustomPaymentPlans.FindAsync(inscriptionDto.IdGymCustomPaymentPlan);
    

            // Crear una nueva inscripción, sin modificar la anterior
            var newInscription = new Inscription
            {
                IdClient = clientId,
                IdGymCustomPaymentPlan = inscriptionDto.IdGymCustomPaymentPlan,
                IdGym = inscriptionDto.IdGym,
                Payment = inscriptionDto.Payment,
                Cost = inscriptionDto.Cost,
                Refund = inscriptionDto.Refund,
                PaymentMethod = inscriptionDto.PaymentMethod,
                StartDate = inscriptionDto.StartDate,
                EndDate = inscriptionDto.EndDate // Fecha de finalización calculada
            };

            // Añadimos la nueva inscripción al contexto
            _context.Inscriptions.Add(newInscription);
            await _context.SaveChangesAsync(); // Guardamos la nueva inscripción

            // Si quieres asignar esta nueva inscripción a un campo específico en el cliente (opcional)
            client.IdInscription = newInscription.IdInscription; // O alguna lógica similar
            client.IsActive = true;
            _context.Entry(client).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var inscriptionResultDto = new InscriptionDto
            {
                
                IdGymCustomPaymentPlan = newInscription.IdGymCustomPaymentPlan,
                IdGym = newInscription.IdGym,
                Payment = newInscription.Payment,
                Cost = newInscription.Cost,
                Refund = newInscription.Refund,
                PaymentMethod = newInscription.PaymentMethod,
                StartDate = newInscription.StartDate,
                EndDate = newInscription.EndDate
            };

            return Ok(inscriptionResultDto); 
        }


        // PUT: api/clients/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] ClientDto clientDto)
        {
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == clientDto.IdGym);
            if (!gymExists)
            {
                return BadRequest("El gimnasio especificado no existe.");
            }

            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            client.Name = clientDto.Name;
            client.Surname = clientDto.Surname;
            client.Email = clientDto.Email;
            client.PhoneNumber = clientDto.PhoneNumber;
            client.IsActive = clientDto.IsActive;

            _context.Entry(client).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(client);
        }


        // ✅ PUT: api/clients/{id}/activate (Activar cliente)
        [HttpPut("{id}/activate")]
        public async Task<IActionResult> ActivateClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            client.IsActive = true;
            _context.Entry(client).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ PUT: api/clients/{id}/deactivate (Desactivar cliente)
        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> DeactivateClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            client.IdInscription = null;

            client.IsActive = false;
            _context.Entry(client).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
