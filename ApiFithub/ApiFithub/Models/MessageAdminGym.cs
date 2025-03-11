using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class MessageAdminGym
    {
        [Key]
        public int IdMessage { get; set; }

        public string SenderId { get; set; }  // Clave foránea a ApplicationUser
        public string ReceiverId { get; set; }

        // Fecha y hora en la que se envió el mensaje
        [DataType(DataType.DateTime)]
        public DateTime DateSend { get; set; }

        // Si el gimnasio ha leído el mensaje
        public bool IsRead { get; set; }
        public string Content { get; set; }
        public DateTime SentAt { get; set; }

        // Relación con ApplicationUser
        public ApplicationUser Sender { get; set; }
        public ApplicationUser Receiver { get; set; }
    }
}
