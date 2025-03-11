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
        public decimal Precio { get; set; }
        public bool BasicFeatures { get; set; }
        public string Features { get; set; } // JSON con las características
        public string Type { get; set; }

        [ForeignKey("Admin")]
        public int AdminId { get; set; }
        public Admin Admin { get; set; }
    }
}
