using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class MessageAdminGym
    {
        [Key]
        public int IdMessage { get; set; }

        // Relación con el administrador que envió el mensaje
        [ForeignKey("Admin")]
        [Required(ErrorMessage = "The admin is a required field")]
        public int IdAdmin { get; set; }
        public Admin Admin { get; set; }

        // Relación con el gimnasio que recibe el mensaje
        [ForeignKey("Gym")]
        [Required(ErrorMessage = "The gym is a required field")]
        public int IdGym { get; set; }
        public Gym Gym { get; set; }

        // Contenido del mensaje
        public string Message { get; set; }

        // Fecha y hora en la que se envió el mensaje
        [DataType(DataType.DateTime)]
        public DateTime DateSend { get; set; }

        // Si el gimnasio ha leído el mensaje
        public bool IsRead { get; set; }
    }
}
