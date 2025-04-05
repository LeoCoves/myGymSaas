using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class ClassTemplate
    {
        [Key]
        public int IdClassTemplate { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public string Instructor { get; set; }

        [ForeignKey("Gym")]
        public int IdGym { get; set; }
        public Gym Gym { get; set; }

        public DayOfWeek DayOfWeek { get; set; } // Día de la semana (Ej. Monday)

        public TimeSpan StartTime { get; set; } // Hora de inicio (Ej. 08:00 AM)
        public TimeSpan EndTime { get; set; }   // Hora de fin (Ej. 10:00 AM)

        public ICollection<ClassSession> ClassSessions { get; set; }
    }
}
