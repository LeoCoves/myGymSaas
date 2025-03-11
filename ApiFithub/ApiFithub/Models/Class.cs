using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class Class
    {
        [Key]
        public int IdClass { get; set; }

        [Display(Name = "Name")]
        [Required(ErrorMessage = "Name is a required field")]
        public string Name { get; set; }
        public string? Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [ForeignKey("Gym")]
        public int IdGym { get; set; }
        public Gym Gym { get; set; }

        public ICollection<ClassEnrollment> ClassEnrollments { get; set; }
    }
}
