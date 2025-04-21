using ApiFithub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace ApiFithub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : Controller
    {
        private readonly ApiFithubContexto _context;

        public DashboardController(ApiFithubContexto context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary(
            [FromQuery] string range = "monthly",  // daily | monthly | yearly
            [FromQuery] DateTime? date = null,
            [FromQuery] int? idGym = null)
        {
            if (idGym == null) return BadRequest("GymId is required");



            var selectedDate = date ?? DateTime.Today;

            IQueryable<Inscription> query = _context.Inscriptions
                                                .Where(i => i.IdGym == idGym); ;

            switch (range.ToLower())
            {
                case "daily":
                    query = query.Where(i => i.StartDate.Date == selectedDate.Date);
                    break;

                case "monthly":
                    query = query.Where(i =>
                        i.StartDate.Month == selectedDate.Month &&
                        i.StartDate.Year == selectedDate.Year);
                    break;

                case "yearly":
                    query = query.Where(i => i.StartDate.Year == selectedDate.Year);
                    break;

                default:
                    return BadRequest("Invalid range. Use 'daily', 'monthly', or 'yearly'.");
            }

            var inactiveClients = await _context.Clients
            .Where(c => c.IdGym == idGym && !c.IsActive)
            .CountAsync();


            var inscripciones = await query
                .Where(i => i.IdGym == idGym)
            .Include(i => i.Client)
            .Where(i => i.Client != null && i.Client.IsActive)
            .ToListAsync();

            var recurringClients = _context.Clients.Where(c => c.IdGym == idGym && c.IsActive == true)
                .Select(i => i.IdClient)
                .Distinct()
                .Count();

            // Total ingresos
            var total = inscripciones.Sum(i => i.Payment);
            var cash = inscripciones
             .Where(i => !string.IsNullOrEmpty(i.PaymentMethod) && i.PaymentMethod.ToLower() == "cash")
             .Sum(i => i.Payment);

            var visa = inscripciones
                .Where(i => !string.IsNullOrEmpty(i.PaymentMethod) && i.PaymentMethod.ToLower() == "visa")
                .Sum(i => i.Payment);

            var newClients = inscripciones
            .Where(i => i.Client != null
                     && i.Client.FirstDayInscription != null
                     && i.Client.FirstDayInscription.Date == i.StartDate.Date)
            .Select(i => i.IdClient)
            .Distinct()
            .Count();


            // Total de inscripciones activas en el rango
            var totalInscriptions = inscripciones.Count;

            return Ok(new
            {
                range = range,
                date = selectedDate,
                total,
                cash,
                visa,
                newClients,
                recurringClients,
                inactiveClients,
                inscriptions = totalInscriptions
            });


        }

        [HttpGet("cashflow")]
        public async Task<IActionResult> GetCashFlow(
            [FromQuery] int idGym,
            [FromQuery] string range = "monthly",
            [FromQuery] DateTime? date = null)
        {
            var selectedDate = date ?? DateTime.Today;

            // Cargar los datos en memoria
            var data = await _context.Inscriptions
                .Include(i => i.Client)
                .Where(i => i.IdGym == idGym && i.Client != null && i.Client.IsActive)
                .ToListAsync();

            // Filtrar según el rango
            data = range.ToLower() switch
            {
                "daily" => data.Where(i =>
                    i.StartDate.Month == selectedDate.Month &&
                    i.StartDate.Year == selectedDate.Year).ToList(),

                "monthly" => data.Where(i =>
                    i.StartDate.Year == selectedDate.Year).ToList(),

                "yearly" => data, // sin filtro

                _ => throw new ArgumentException("Invalid range. Use 'daily', 'monthly', or 'yearly'.")
            };

            // Agrupar en memoria
            var grouped = range.ToLower() switch
            {
                "daily" => data
                    .GroupBy(i => i.StartDate.Date)
                    .Select(g => new
                    {
                        Date = g.Key,
                        Cash = g.Where(i => i.PaymentMethod?.ToLower() == "cash").Sum(i => i.Payment),
                        Visa = g.Where(i => i.PaymentMethod?.ToLower() == "visa").Sum(i => i.Payment),
                        Total = g.Sum(i => i.Payment)
                    }),

                "monthly" => data
                    .GroupBy(i => new { i.StartDate.Year, i.StartDate.Month })
                    .Select(g => new
                    {
                        Date = new DateTime(g.Key.Year, g.Key.Month, 1),
                        Cash = g.Where(i => i.PaymentMethod?.ToLower() == "cash").Sum(i => i.Payment),
                        Visa = g.Where(i => i.PaymentMethod?.ToLower() == "visa").Sum(i => i.Payment),
                        Total = g.Sum(i => i.Payment)
                    }),

                "yearly" => data
                    .GroupBy(i => i.StartDate.Year)
                    .Select(g => new
                    {
                        Date = new DateTime(g.Key, 1, 1),
                        Cash = g.Where(i => i.PaymentMethod?.ToLower() == "cash").Sum(i => i.Payment),
                        Visa = g.Where(i => i.PaymentMethod?.ToLower() == "visa").Sum(i => i.Payment),
                        Total = g.Sum(i => i.Payment)
                    }),

                _ => null
            };

            var result = grouped.OrderBy(g => g.Date).ToList();
            return Ok(result);
        }


    }
}
