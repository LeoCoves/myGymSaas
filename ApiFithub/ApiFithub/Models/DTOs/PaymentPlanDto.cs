namespace ApiFithub.Models.DTOs
{
    public class PaymentPlanDto
    {
        public int IdPaymentPlan { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsBasic { get; set; }
        public List<string> Features { get; set; } = new List<string>();
        public string Period { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
