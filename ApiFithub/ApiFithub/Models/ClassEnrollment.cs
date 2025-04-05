using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class ClassEnrollment
    {
        [Key]
        public int IdEnrollment { get; set; }

        [ForeignKey("ClassSession")]
        public int IdClassSession { get; set; }
        public ClassSession ClassSession { get; set; }

        [ForeignKey("Client")]
        public int IdClient { get; set; }
        public Client Client { get; set; }
        public DateTime InscriptionDate { get; set; }
    }
}
