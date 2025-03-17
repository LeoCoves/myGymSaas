using ApiFithub.Models;
using ApiFithub.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        // ✅ GET: api/clients/{idGym} (Obtener todos los clientes de un gimnasio específico)
        [HttpGet("/{idGym}")]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients(int idGym)
        {
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == idGym);
            if (!gymExists)
            {
                return NotFound("Gimnasio no encontrado.");
            }

            var clients = await _context.Clients
                                        .Where(c => c.IdGym == idGym)  // Filtramos por el ID del gimnasio
                                        .Include(c => c.GymCustomPaymentPlan)  // Incluimos el plan de pago asociado
                                        .ToListAsync();

            if (clients.Count == 0)
            {
                return NotFound("No se encontraron clientes para este gimnasio.");
            }

            return Ok(clients);
        }


        // ✅ GET: api/clients/5 (Obtener cliente por ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClientById(int id)
        {
            var client = await _context.Clients.Include(c => c.GymCustomPaymentPlan).FirstOrDefaultAsync(c => c.IdClient == id);

            if (client == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            return Ok(client);
        }

        // ✅ Crear un cliente
        [HttpPost]
        public async Task<ActionResult<Client>> CreateClient(ClientDto clientDto)
        {
            // Verificar si el gimnasio existe
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == clientDto.IdGym);
            if (!gymExists)
            {
                return NotFound($"El gimnasio con ID {clientDto.IdGym} no existe.");
            }

            // Verificar si el GymCustomPaymentPlan existe si se proporciona
            if (clientDto.IdGymCustomPaymentPlan.HasValue)
            {
                var paymentPlanExists = await _context.GymCustomPaymentPlans
                    .AnyAsync(p => p.IdGymCustomPaymentPlan == clientDto.IdGymCustomPaymentPlan);

                if (!paymentPlanExists)
                {
                    return NotFound($"El plan de pago con ID {clientDto.IdGymCustomPaymentPlan} no existe.");
                }
            }

            // Crear el nuevo cliente
            var newClient = new Client
            {
                IdGym = clientDto.IdGym,  // Relacionando al cliente con el gimnasio
                IdGymCustomPaymentPlan = clientDto.IdGymCustomPaymentPlan,  // Relacionando al cliente con el plan de pago (si es proporcionado)
                Name = clientDto.Name,
                Surname = clientDto.Surname,
                Email = clientDto.Email,
                PhoneNumber = clientDto.PhoneNumber,
                IsActive = true  // Establecer el estado de "activo" por defecto
            };

            _context.Clients.Add(newClient);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientById), new { id = newClient.IdClient }, newClient);
        }

        // ✅ PUT: api/clients/5 (Actualizar un cliente)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, ClientDto clientDto)
        {
            if (clientDto == null || id != clientDto.IdClient)
            {
                return BadRequest("Datos inválidos.");
            }

            var existingClient = await _context.Clients.FindAsync(id);
            if (existingClient == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            // Verificar si el nuevo plan de pago existe
            if (clientDto.IdGymCustomPaymentPlan.HasValue)
            {
                var planExists = await _context.GymCustomPaymentPlans.AnyAsync(p => p.IdGymCustomPaymentPlan == clientDto.IdGymCustomPaymentPlan);
                if (!planExists)
                {
                    return NotFound("El plan de pago especificado no existe.");
                }
            }

            // Actualizamos los datos del cliente
            existingClient.Name = clientDto.Name;
            existingClient.Surname = clientDto.Surname;
            existingClient.Email = clientDto.Email;
            existingClient.PhoneNumber = clientDto.PhoneNumber;
            existingClient.IsActive = clientDto.IsActive;
            existingClient.IdGymCustomPaymentPlan = clientDto.IdGymCustomPaymentPlan; // Puede ser NULL si se quiere quitar el plan

            await _context.SaveChangesAsync();

            return Ok(existingClient);
        }

        // ✅ DELETE (DESACTIVAR): api/clients/5 (Dar de baja a un cliente sin eliminarlo)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeactivateClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound("Cliente no encontrado.");
            }

            // En lugar de eliminarlo, lo marcamos como inactivo
            client.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent(); // 204 (Operación exitosa sin contenido)
        }

        
    }
}
