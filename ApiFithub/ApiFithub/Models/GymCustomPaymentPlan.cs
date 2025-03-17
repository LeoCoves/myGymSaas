using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class GymCustomPaymentPlan
    {
        [Key]
        public int IdGymCustomPaymentPlan { get; set; }

        // Relación con el gimnasio que creó este plan
        public int GymId { get; set; }
        public Gym Gym { get; set; }

        // Nombre y descripción del plan personalizado
        public string Name { get; set; }
        public string Description { get; set; }
        [DisplayFormat(DataFormatString = "{0:n2}")]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
        public bool IsBasic { get; set; }
        public List<string> Features { get; set; }
        public string Currancy { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Relación con los clientes (Uno a Muchos)
        public ICollection<Client> Clients { get; set; } = new List<Client>();
    }
}
