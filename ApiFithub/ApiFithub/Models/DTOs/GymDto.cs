namespace ApiFithub.Models.DTOs
{
    public class GymDto
    {
        public int IdGym { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string NumberPhone { get; set; }
        public bool IsActive { get; set; }
        public int? IdPaymentPlan { get; set; }
        public PaymentPlanDto PaymentPlan { get; set; }
    }
}
