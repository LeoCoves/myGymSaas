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
        
        public bool IsBasic { get; set; }
        public List<string> Features { get; set; } = new List<string>();
        public string Period { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }


        // Relación con los clientes (Uno a Muchos)
        public ICollection<Gym> Gyms { get; set; } = new List<Gym>();
    }
}
