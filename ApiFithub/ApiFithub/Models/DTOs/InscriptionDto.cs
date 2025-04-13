using Microsoft.AspNetCore.Routing.Constraints;

namespace ApiFithub.Models.DTOs
{
    public class InscriptionDto
    {
        public int IdGymCustomPaymentPlan { get; set; }  
        public int IdGym {  get; set; }
        public decimal Payment {  get; set; }
        public decimal Cost { get; set; }

        public decimal? Refund { get; set; }
        public string? PaymentMethod { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

}
