using ApiFithub.Models.DTOs;
using ApiFithub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace ApiFithub.Controllers
{
    [Route("api/[controller]")]
    public class SupplierController : Controller
    {
        private readonly ApiFithubContexto _context;

        public SupplierController(ApiFithubContexto context)
        {
            _context = context;
        }

        // GET: api/gym/{gymId}/suppliers (Obtener proveedores de un gimnasio específico)
        [HttpGet("{gymId}/suppliers")]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliersByGym(int gymId)
        {
            // Obtener los proveedores del gimnasio especificado
            var suppliers = await _context.Suppliers
                .Where(s => s.IdGym == gymId)
                .ToListAsync();

            if (suppliers == null || suppliers.Count == 0)
            {
                return NotFound("No se encontraron proveedores para este gimnasio.");
            }

            return Ok(suppliers);
        }

        // GET: api/supplier/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null) return NotFound();
            return supplier;
        }

        // POST: api/supplier (Crear un nuevo proveedor)
        [HttpPost]
        //[Authorize(Roles = "Admin")] // Solo administradores pueden crear planes
        public async Task<ActionResult<Supplier>> CreateSupplier([FromBody] SupplierDto supplierDto)
        {
            if (supplierDto == null)
            {
                return BadRequest("Datos inválidos.");
            }

            // Verificar si el gimnasio existe
            var gymExists = await _context.Gyms.AnyAsync(g => g.IdGym == supplierDto.IdGym);
            if (!gymExists)
            {
                return NotFound("El gimnasio especificado no existe.");
            }

            var newSupplier = new Supplier
            {
                IdGym = supplierDto.IdGym,
                Name = supplierDto.Name,
                NumberPhone = supplierDto.NumberPhone,
                Email = supplierDto.Email
            };

            // Guardar en la base de datos
            _context.Suppliers.Add(newSupplier);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSupplier), new { id = newSupplier.IdSupplier }, newSupplier);
        }

        // PUT: api/supplier/{id} (Actualizar un proveedor)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier(int id, [FromBody] SupplierDto supplierDto)
        {
            if (supplierDto == null || id != supplierDto.IdSupplier)
            {
                return BadRequest("Datos inválidos");
            }

            var existingSupplier = await _context.Suppliers.FindAsync(id);
            if (existingSupplier == null)
            {
                return NotFound("Tarea no encontrada");
            }


            existingSupplier.IdGym = supplierDto.IdGym;
            existingSupplier.Name = supplierDto.Name;
            existingSupplier.NumberPhone = supplierDto.NumberPhone;
            existingSupplier.Email = supplierDto.Email;


            _context.Suppliers.Update(existingSupplier);
            await _context.SaveChangesAsync();

            return Ok(existingSupplier);
        }

        // DELETE: api/supplier/{id} (Eliminar un proveedor)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null) return NotFound();

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
