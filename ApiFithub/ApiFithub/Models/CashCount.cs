using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class CashCount
    {
        [Key]
        public int IdCashCount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public int IdGym { get; set; }
        [ForeignKey(nameof(IdGym))]
        public Gym Gym { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Subtotal { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal IVA { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal OtherTaxes { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Total { get; set; }

        // Relación con inscriptions
        public ICollection<Inscription>? Inscriptions { get; set; }
    }
}
