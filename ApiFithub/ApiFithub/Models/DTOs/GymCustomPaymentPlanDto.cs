namespace ApiFithub.Models.DTOs
{
    public class GymCustomPaymentPlanDto
    {
        public int? IdGymCustomPaymentPlan { get; set; }
        public int IdGym { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsBasic { get; set; }
        public List<string> Features { get; set; }
        public string Period { get; set; }
        public int Duration { get; set; }
    }
}
