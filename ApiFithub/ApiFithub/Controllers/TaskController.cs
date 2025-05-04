using ApiFithub.Models;
using ApiFithub.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiFithub.Controllers
{
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly ApiFithubContexto _context;

        public TaskController(ApiFithubContexto context)
        {
            _context = context;
        }

        // GET: api/gym/{gymId}/tasks (Obtener tareas de un gimnasio específico)
        [HttpGet("{gymId}/tasks")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasksByGym(int gymId)
        {
            // Obtener los proveedores del gimnasio especificado
            var tasks = await _context.TaskItems
                .Where(s => s.IdGym == gymId)
                .ToListAsync();

            return Ok(tasks);
        }


        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return NotFound();
            return task;
        }

        // POST: api/task (Crear una nueva tarea)
        [HttpPost]
        //[Authorize(Roles = "Admin")] // Solo administradores pueden crear planes
        public async Task<ActionResult<TaskItem>> CreateTask([FromBody] TaskItemDto taskDto)
        {
            if (taskDto == null)
            {
                return BadRequest("Datos inválidos.");
            }

            // Verificar si el gimnasio existe
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == taskDto.IdGym);
            if (!gymExists)
            {
                return NotFound("El gimnasio especificado no existe.");
            }

            var newTask = new TaskItem
            {
                IdGym = taskDto.IdGym, 
                Title = taskDto.Title,
                Description = taskDto.Description,
                LevelImportant = taskDto.LevelImportant,
                StartDate = taskDto.StartDate,
                EndDate = taskDto.EndDate
                
            };

            // Guardar en la base de datos
            _context.TaskItems.Add(newTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = newTask.IdTask }, newTask);
        }

        // PUT: api/task/{id} (Actualizar una tarea)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id,[FromBody] TaskItemDto taskDto)
        {
            if (taskDto == null || id != taskDto.IdTask)
            {
                return BadRequest("Datos inválidos");
            }

            var existingTask = await _context.TaskItems.FindAsync(id);
            if (existingTask == null)
            {
                return NotFound("Tarea no encontrada");
            }

            existingTask.Title = taskDto.Title;
            existingTask.Description = taskDto.Description;
            existingTask.LevelImportant = taskDto.LevelImportant;
            existingTask.StartDate = taskDto.StartDate;
            existingTask.EndDate = taskDto.EndDate;

            _context.TaskItems.Update(existingTask);
            await _context.SaveChangesAsync();

            return Ok(existingTask);
        }

        // DELETE: api/task/{id} (Eliminar un plan)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);
            if (task == null) return NotFound();

            _context.TaskItems.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
