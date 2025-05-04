using ApiFithub.Models;
using ApiFithub.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ApiFithub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CashCountController : Controller
    {
        private readonly ApiFithubContexto _context;

        public CashCountController(ApiFithubContexto context)
        {
            _context = context;
        }

        // GET: api/CashRegister
        [HttpGet("{idGym}")]
        public async Task<ActionResult<IEnumerable<CashCount>>> GetAll(int idGym)
        {
            return await _context.CashCounts
                .Where(c => c.IdGym == idGym)
                .Include(c => c.Inscriptions)
                .ToListAsync();
        }

        // GET: api/CashRegister/5
        [HttpGet("{idGym}/{idCashCount}")]
        public async Task<ActionResult<CashCount>> Get(int idGym, int idCashCount)
        {
            var cashCount = await _context.CashCounts
        .Where(c => c.IdGym == idGym && c.IdCashCount == idCashCount)
        .FirstOrDefaultAsync();

            if (cashCount == null)
            {
                return NotFound();
            }

            return Ok(cashCount);
        }

        // POST: api/CashRegister
        [HttpPost]
        public async Task<ActionResult<CashCount>> Create([FromBody] CashCountDto dto)
        {
            var inscriptions = await _context.Inscriptions
                .Where(i => i.StartDate == dto.Date && i.IdGym == dto.IdGym)
                .ToListAsync();

            var register = new CashCount 
            {
                IdGym = dto.IdGym,
                Date = dto.Date,
                Subtotal = dto.Subtotal,
                IVA = dto.IVA,
                OtherTaxes = dto.OtherTaxes,
                Total = dto.Total,
                Inscriptions = inscriptions
            };

            await _context.CashCounts.AddAsync(register);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { idGym = register.IdGym, idCashCount = register.IdCashCount }, register);
        }

        // Endpoint para obtener las inscripciones de hoy
        [HttpGet("{idGym}/inscriptions")]
        public async Task<ActionResult<IEnumerable<Inscription>>> GetInscriptionsToday(int idGym)
        {
            var today = DateTime.Today;

            var inscriptions = await _context.Inscriptions
                .Where(i => i.StartDate.Date == today && i.IdGym == idGym)  // Filtramos por fecha de hoy
                .ToListAsync();

            return Ok(inscriptions);
        }
    }
}
