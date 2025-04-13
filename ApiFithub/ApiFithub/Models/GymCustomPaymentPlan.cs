using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class GymCustomPaymentPlan
    {
        [Key]
        public int IdGymCustomPaymentPlan { get; set; }

        [Required]
        public int IdGym { get; set; }  // FK al gimnasio que lo creó
        public Gym Gym { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public bool IsBasic { get; set; }

        public List<string> Features { get; set; }

        public string Period { get; set; }

        public int Duration { get; set; }
    }

}
