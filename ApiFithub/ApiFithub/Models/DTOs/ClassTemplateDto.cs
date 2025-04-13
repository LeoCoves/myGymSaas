namespace ApiFithub.Models.DTOs
{
    public class ClassTemplateDto
    {
        public int IdClassTemplate { get; set; }  // Identificador de la plantilla
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public int IdGym { get; set; }  // ID del gimnasio
        public DayOfWeek DayOfWeek { get; set; }  // Día en que ocurre la clase
        public TimeSpan StartTime { get; set; }  // Hora de inicio
        public TimeSpan EndTime { get; set; }  // Hora de finalización
    }
}
