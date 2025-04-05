namespace ApiFithub.Models.DTOs
{
    public class ClassSessionDto
    {
        public int Id { get; set; }
        public int ClassTemplateId { get; set; }
        public DateTime SessionDate { get; set; }
        public List<ClientDto> Clients { get; set; } = new();
    }
}
