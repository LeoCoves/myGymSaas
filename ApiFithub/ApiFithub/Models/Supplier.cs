using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class Supplier
    {
        [Key]
        public int IdSupplier { get; set; }

        [Display(Name = "Name")]
        [Required(ErrorMessage = "The name is a required field")]
        public string Name { get; set; }

        [Display(Name = "NumberPhone")]
        [Required(ErrorMessage = "Number phone is a required field")]
        public string NumberPhone { get; set; }

        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email is a required field")]
        public string Email { get; set; }

        [ForeignKey("Gym")]
        public int IdGym { get; set; }
        public Gym Gym { get; set; }
    }
}
