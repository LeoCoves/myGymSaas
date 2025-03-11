using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class PaymentPlan
    {
        [Key]
        public int IdPaymentPlan { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }
        [Display(Name = "Description")]
        [Required(ErrorMessage = "Description is a required field")]
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
        public bool BasicFeatures { get; set; }
        public string Features { get; set; } // JSON con las características
        public string Type { get; set; }

        [ForeignKey("Admin")]
        public int AdminId { get; set; }
        public Admin Admin { get; set; }

        // Relación con los gimnasios que contratan este plan
        public ICollection<GymPaymentPlan> GymPaymentPlans { get; set; }
    }
}
