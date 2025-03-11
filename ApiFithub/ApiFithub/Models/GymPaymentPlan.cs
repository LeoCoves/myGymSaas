using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class GymPaymentPlan
    {
        [Key]
        public int IdGymPaymentPlan { get; set; }

        [ForeignKey("Gym")]
        [Required(ErrorMessage = "The gym is a required field")]
        public int IdGym { get; set; }
        public Gym Gym { get; set; }

        [ForeignKey("PaymentPlan")]
        [Required(ErrorMessage = "The plan is a required field")]
        public int IdPaymentPlan { get; set; }
        public PaymentPlan PaymentPlan { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? EndDate { get; set; }
    }
}
