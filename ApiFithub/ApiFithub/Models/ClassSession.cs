using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class ClassSession
    {
        [Key]
        public int IdClassSession { get; set; }

        [ForeignKey("ClassTemplate")]
        public int IdClassTemplate { get; set; }
        public ClassTemplate ClassTemplate { get; set; }

        public DateTime SessionDate { get; set; } // Fecha específica (Ej. 1 de abril de 2025)

        public ICollection<Client> Clients { get; set; } = new List<Client>();
    }
}
