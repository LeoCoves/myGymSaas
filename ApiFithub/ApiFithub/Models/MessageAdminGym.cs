using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class MessageAdminGym
    {
        [Key]
        public int IdMessage { get; set; }

        [ForeignKey("Admin")]
        [Required(ErrorMessage = "The admin is a required field")]
        public int IdAdmin { get; set; }
        public Admin Admin { get; set; }

        [ForeignKey("Gym")]
        [Required(ErrorMessage = "The gym is a required field")]
        public int IdGym { get; set; }
        public Gym Gym { get; set; }

        public string Message { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateSend { get; set; }
    }
}
