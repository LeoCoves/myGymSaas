using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace ApiFithub.Models
{
    public class Gym
    {
        [Key]
        public int IdGym { get; set; }  // Clave primaria de tipo int
        [Display(Name = "Name")]
        [Required(ErrorMessage = "Name is a required field")]
        public string Name { get; set; }

        [Display(Name = "Description")]
        [Required(ErrorMessage = "Description is a required field")]
        public string Description { get; set; }
        [Display(Name = "Address")]
        [Required(ErrorMessage = "Address is a required field")]
        public string Address { get; set; }
        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email is a required field")]
        public string Email { get; set; }
        [Display(Name = "NumberPhone")]
        [Required(ErrorMessage = "Number phone is a required field")]
        public string Numberphone { get; set; }
        public bool IsActive { get; set; } = true;

        public string UserId { get; set; }  // Relacionar con AspNetUser
        public ApplicationUser User { get; set; }

        // Relación con el plan de pago (opcional)
        public int? IdPaymentPlan { get; set; }
        public PaymentPlan? PaymentPlan { get; set; } // Navegación
        public ICollection<Supplier> Suppliers { get; set; }
        public ICollection<Class> Classes { get; set; }
        public ICollection<TaskItem> Tasks { get; set; }
    }
}
