using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace ApiFithub.Models
{
    public class Gym
    {
        [Key]
        public int IdGym { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Numberphone { get; set; }

        public bool IsActive { get; set; } = true;

        // Usuario propietario del gimnasio
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        // Plan contratado con el administrador
        public int? IdPaymentPlan { get; set; }
        public PaymentPlan? PaymentPlan { get; set; }

        // Planes personalizados creados por el gimnasio para sus clientes
        public ICollection<GymCustomPaymentPlan> GymCustomPaymentPlans { get; set; }
        public ICollection<Supplier> Suppliers { get; set; }
        public ICollection<ClassTemplate> ClassTemplates { get; set; }
        public ICollection<TaskItem> Tasks { get; set; }

    }
}
