using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class Client
    {
        [Key]
        public int IdClient { get; set; }
        [Display(Name = "Name")]
        [Required(ErrorMessage = "name is a required field")]
        public string Name { get; set; }
        [Display(Name = "Surname")]
        [Required(ErrorMessage = "Surname is a required field")]
        public string Surname { get; set; }
        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email is a required field")]
        public string Email { get; set; }
        [Display(Name = "PhoneNumber")]
        [Required(ErrorMessage = "Phone Number is a required field")]
        public string PhoneNumber { get; set; }

        [ForeignKey("Gym")]
        public string IdGym { get; set; }
        public Gym Gym { get; set; }

        public ICollection<ClassEnrollment> ClassEnrollments { get; set; }
    }
}
