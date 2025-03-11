using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class ClientGymCustomPaymentPlan
    {
        [Key]
        public int IdClientGymCustomPaymentPlan { get; set; }

        // Relación con el cliente que se ha suscrito
        public int ClientId { get; set; }
        public Client Client { get; set; }

        // Relación con el plan personalizado creado por el gimnasio
        public int GymCustomPaymentPlanId { get; set; }
        public GymCustomPaymentPlan GymCustomPaymentPlan { get; set; }

        // Fecha de suscripción a este plan
        public DateTime SubscriptionDate { get; set; }
    }
}
