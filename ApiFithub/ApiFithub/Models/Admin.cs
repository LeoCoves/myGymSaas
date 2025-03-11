using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class Admin : IdentityUser
    {
        [Key]
        public int IdAdmin { get; set; }

        // Email y Password ya están en IdentityUser

        // Relación con PaymentPlans (Un admin puede tener varios planes de pago)
        public ICollection<PaymentPlan> PaymentPlans { get; set; }
        public ICollection<Gym> Gyms { get; set; }
    }
}
