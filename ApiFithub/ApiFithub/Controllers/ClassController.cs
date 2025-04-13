using ApiFithub.Models;
using ApiFithub.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.Http.Json;

namespace ApiFithub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : Controller
    {
        private readonly ApiFithubContexto _context;

        public ClassController(ApiFithubContexto context)
        {
            _context = context;
        }

        // 🔹 Obtener todas las plantillas de clases por gimnasio
        [HttpGet("templates/{gymId}")]
        public async Task<ActionResult<IEnumerable<ClassTemplate>>> GetClassTemplates(int gymId)
        {
            var classTemplate = await _context.ClassTemplates
                .Where(g => g.IdGym == gymId)
                .Include(ct => ct.ClassSessions)
                    .ThenInclude(cs => cs.Clients) // Si 'Clients' está relacionado con 'ClassSession'
                .ToListAsync();

            if (classTemplate == null)
            {
                return NotFound("Plantilla de clase no encontrada.");
            }

            // Configurar el serializador para manejar ciclos
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve, // Evitar ciclos
                MaxDepth = 64 // Si quieres permitir una mayor profundidad (opcional)
            };

            var jsonResponse = JsonSerializer.Serialize(classTemplate, options); // Serializa con las opciones
            return Content(jsonResponse, "application/json");
        }

        [HttpPost("template")]
        public async Task<ActionResult<ClassTemplate>> CreateClassTemplate([FromBody] ClassTemplateDto classdto)
        {
            if (classdto == null)
            {
                return BadRequest("Datos inválidos.");
            }

            // Verificar si el gimnasio existe
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == classdto.IdGym);
            if (!gymExists)
            {
                return NotFound("El gimnasio especificado no existe.");
            }

            // Crear las sesiones automáticamente para los próximos 12 meses
            var sessionsToCreate = new List<ClassSession>();
            var startDate = DateTime.Today;
            var endDate = startDate.AddMonths(3);

            // Buscar el primer día que coincide con el DayOfWeek de la plantilla
            var current = startDate;
            while (current.DayOfWeek != classdto.DayOfWeek)
            {
                current = current.AddDays(1); // Mover al siguiente día hasta encontrar el correcto
            }

            // Crear las sesiones
            while (current <= endDate)
            {
                sessionsToCreate.Add(new ClassSession
                {
                    SessionDate = current.Date
                });

                // Sumamos 7 días para la próxima sesión
                current = current.AddDays(7);
            }

            // Verificar si se crearon sesiones antes de proceder
            if (sessionsToCreate.Count == 0)
            {
                return BadRequest("No se pudieron crear sesiones para la plantilla.");
            }

            // Crear la plantilla de clase con la relación con las sesiones
            var classTemplate = new ClassTemplate
            {
                Title = classdto.Title,
                Description = classdto.Description,
                Instructor = classdto.Instructor,
                DayOfWeek = classdto.DayOfWeek,
                StartTime = classdto.StartTime,
                EndTime = classdto.EndTime,
                IdGym = classdto.IdGym,
                ClassSessions = sessionsToCreate  // Asociar las sesiones directamente al template
            };

            // Agregar la plantilla de clase a la base de datos
            _context.ClassTemplates.Add(classTemplate);
            await _context.SaveChangesAsync();

            // Usar JsonSerializerOptions para evitar el ciclo de referencia
            var jsonOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true  // Opcional, para hacer la salida JSON más legible
            };

            // Verificar si las sesiones y la plantilla se guardaron correctamente
            var classTemplateWithSessions = await _context.ClassTemplates
                .Include(ct => ct.ClassSessions)  // Incluir las sesiones en la respuesta
                .FirstOrDefaultAsync(ct => ct.IdClassTemplate == classTemplate.IdClassTemplate);

            if (classTemplateWithSessions == null)
            {
                return NotFound("Plantilla de clase no encontrada.");
            }

            return new JsonResult(classTemplateWithSessions, jsonOptions); // Usamos JsonResult para personalizar la serialización
        }





        // 🔹 Obtener sesiones de una clase
        [HttpGet("sessions/{classTemplateId}")]
        public async Task<IActionResult> GetClassSessions(int classTemplateId)
        {
            var sessions = await _context.ClassSessions
                .Where(cs => cs.IdClassTemplate == classTemplateId)
                .Include(cs => cs.Clients)
                .Select(cs => new ClassSessionDto
                {
                    Id = cs.IdClassSession,
                    ClassTemplateId = cs.IdClassTemplate,
                    SessionDate = cs.SessionDate,
                    Clients = cs.Clients.Select(c => new ClientDto
                    {
                        IdClient = c.IdClient,
                        Name = c.Name,
                        Surname = c.Surname
                    }).ToList()
                }).ToListAsync();

            return Ok(sessions);
        }

        [HttpGet("session/{sessionId}")]
        public async Task<IActionResult> GetClassSessionById(int sessionId)
        {
            var session = await _context.ClassSessions
                .Include(cs => cs.Clients) // Incluye los clientes si están relacionados
                .FirstOrDefaultAsync(cs => cs.IdClassSession == sessionId);

            if (session == null)
                return NotFound("Sesión de clase no encontrada.");

            // Si quieres devolver un DTO en lugar de toda la entidad, puedes mapearlo así:
            var sessionDto = new ClassSessionDto
            {
                Id = session.IdClassSession,
                ClassTemplateId = session.IdClassTemplate,
                SessionDate = session.SessionDate,
                Clients = session.Clients.Select(c => new ClientDto
                {
                    IdClient = c.IdClient,
                    Name = c.Name,
                    Surname = c.Surname
                }).ToList()
            };

            return Ok(sessionDto);
        }



        // 🔹 Inscribir un cliente en una sesión de clase
        [HttpPost("sessions/{sessionId}/clients/{clientId}")]
        public async Task<IActionResult> AddClientToSession(int sessionId, int clientId)
        {
            var session = await _context.ClassSessions.Include(cs => cs.Clients)
                .FirstOrDefaultAsync(cs => cs.IdClassSession == sessionId);
            var client = await _context.Clients.FindAsync(clientId);

            if (session == null || client == null)
                return NotFound();

            session.Clients.Add(client);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("templates/{id}")]
        public async Task<IActionResult> UpdateClassTemplate(int id, [FromBody] ClassTemplateDto dto)
        {
            var template = await _context.ClassTemplates
                .Include(ct => ct.ClassSessions)
                .FirstOrDefaultAsync(ct => ct.IdClassTemplate == id);

            if (template == null)
                return NotFound();

            // Actualizar propiedades del template
            template.Title = dto.Title;
            template.Description = dto.Description;
            template.Instructor = dto.Instructor;

            // Puedes decidir aquí si también quieres actualizar datos en ClassSessions (ej: Instructor)
            foreach (var session in template.ClassSessions)
            {
                // Si quieres que hereden los cambios, aplica aquí
                // session.SomeField = updatedValue;
            }

            await _context.SaveChangesAsync();

            // Usar JsonSerializerOptions para evitar el ciclo de referencia
            var jsonOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true  // Opcional, para hacer la salida JSON más legible
            };

            if (template == null)
            {
                return NotFound("Plantilla de clase no encontrada.");
            }

            return new JsonResult(template, jsonOptions); // Usamos JsonResult para personalizar la serialización
        }


        [HttpDelete("sessions/{sessionId}/clients/{clientId}")]
        public async Task<IActionResult> RemoveClientFromSession( int sessionId, int clientId)
        {
            var session = await _context.ClassSessions
                .Include(cs => cs.Clients)
                .FirstOrDefaultAsync(cs => cs.IdClassSession == sessionId);

            if (session == null)
                return NotFound();

            var client = session.Clients.FirstOrDefault(c => c.IdClient == clientId);
            if (client != null)
            {
                session.Clients.Remove(client);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpDelete("templates/{id}")]
        public async Task<IActionResult> DeleteClassTemplate(int id)
        {
            var template = await _context.ClassTemplates
                .Include(ct => ct.ClassSessions)
                .FirstOrDefaultAsync(ct => ct.IdClassTemplate == id);

            if (template == null)
                return NotFound();

            // Eliminar las sesiones primero
            _context.ClassSessions.RemoveRange(template.ClassSessions);

            // Luego eliminar la plantilla
            _context.ClassTemplates.Remove(template);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
