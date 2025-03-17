namespace ApiFithub.Models.DTOs
{
    public class GymCustomPaymentPlanDto
    {
        public int? IdGymCustomPaymentPlan { get; set; }
        public int GymId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsBasic { get; set; }
        public List<string> Features { get; set; }
        public string Currancy { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
