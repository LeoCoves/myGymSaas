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
        [Display(Name = "Precio")]
        [RegularExpression(@"^[-0123456789]+[0-9.,]*$",
        ErrorMessage = "El valor introducido debe ser de tipo monetario.")]
        [Required(ErrorMessage = "El precio es un campo requerido")]
        public string PriceCadena
        {
            get
            {
                return Convert.ToString(Price).Replace(",", ".");
            }
            set
            {
                Price = Convert.ToDecimal(value.Replace(".", ","));
            }
        }
        public bool IsBasic { get; set; }

        // Fecha de inicio y fin de la suscripción a este plan
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        // Relación con los clientes que se han suscrito a este plan
        public ICollection<ClientGymCustomPaymentPlan> ClientGymCustomPaymentPlans { get; set; }
    }
}
