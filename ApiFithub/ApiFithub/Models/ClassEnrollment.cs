using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class ClassEnrollment
    {
        [Key]
        public int IdInscription { get; set; }

        [ForeignKey("Client")]
        public int IdClient { get; set; }
        public Client Client { get; set; }

        [ForeignKey("Class")]
        public int IdClass { get; set; }
        public Class Class { get; set; }
        [DataType(DataType.Date)]
        public DateTime InscriptionDate { get; set; }
    }
}
