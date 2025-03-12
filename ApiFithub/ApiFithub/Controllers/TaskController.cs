using ApiFithub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiFithub.Controllers
{
    [Route("/api/tasks")]
    public class TaskController : Controller
    {
        private readonly ApiFithubContexto _context;

        public TaskController(ApiFithubContexto context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.TaskItems.ToListAsync();
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
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            _context.TaskItems.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.IdTask }, task);
        }

        // PUT: api/task/{id} (Actualizar una tarea)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskItem taskUpdate)
        {
            if (taskUpdate == null || id != taskUpdate.IdTask)
            {
                return BadRequest("Datos inválidos");
            }

            var existingTask = await _context.TaskItems.FindAsync(id);
            if (existingTask == null)
            {
                return NotFound();
            }

            
            existingTask.Description = taskUpdate.Description;
            existingTask.StartDate = taskUpdate.StartDate;
            existingTask.EndDate = taskUpdate.EndDate;
            existingTask.LevelImportant = taskUpdate.LevelImportant;

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
