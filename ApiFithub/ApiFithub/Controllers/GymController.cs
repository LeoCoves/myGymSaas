using ApiFithub.Models;
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

        //GET: api/gym
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gym>>> GetGyms()
        {
            return await _context.Gyms.ToListAsync();
        }

        //GET: api/gym/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Gym>> GetGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);

            if(gym == null)
            {
                return NotFound();
            }
            return gym;
        }

        //POST: api/gym
        [HttpPost]
        public async Task<ActionResult<Gym>> CreateGym(Gym gym)
        {
            _context.Gyms.Add(gym);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGym), new { id = gym.IdGym }, gym);
            
        }

        //PUT: api/gym/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGym(int id, Gym gym)
        {
            if (id != gym.IdGym)
            {
                return BadRequest();
            }

            _context.Entry(gym).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/gym/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);
            if (gym == null)
            {
                return NotFound();
            }

            //En este caso no habria que eliminar pero ya se perfeccionara
            //Habria que editar el modelo
            //Añadir un IsActive booleano
            //Darle de baja en caso de eliminar

            _context.Gyms.Remove(gym);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
