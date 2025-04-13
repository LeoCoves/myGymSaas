using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiFithub.Models
{
    public class Inscription
    {
        [Key]
        public int IdInscription { get; set; }

        public int IdGymCustomPaymentPlan { get; set; }

        public int IdClient { get; set; }

        public int IdGym { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Payment { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Cost { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? Refund { get; set; }

        public string? PaymentMethod { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [ForeignKey("IdGymCustomPaymentPlan")]
        public GymCustomPaymentPlan? GymCustomPaymentPlan { get; set; }

        [ForeignKey("IdClient")]
        public Client? Client { get; set; }

        [ForeignKey("IdGym")]
        public Gym Gym { get; set; }
    }


}
