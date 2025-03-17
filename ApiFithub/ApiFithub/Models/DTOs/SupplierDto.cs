using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models.DTOs
{
    public class SupplierDto
    {
        public int IdSupplier { get; set; }
        public int IdGym { get; set; }
        public string Name { get; set; }
        public string NumberPhone { get; set; }
        public string Email { get; set; }       
    }
}
