namespace ApiFithub.Models.DTOs
{
    public class TaskItemDto
    {
        public int IdTask { get; set; }
        public int IdGym { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int LevelImportant { get; set; }
    }
}
