using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class TaskItem
    {
        [Key]
        public int IdTask { get; set; }

        [ForeignKey("Gym")]
        public int IdGym { get; set; }
        public Gym Gym { get; set; }
        [Display(Name = "Description")]
        [Required(ErrorMessage = "Description is a required field")]
        public string Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        public int LevelImportant { get; set; }
    }
}
