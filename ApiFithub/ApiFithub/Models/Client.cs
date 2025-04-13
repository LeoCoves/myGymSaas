using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiFithub.Models
{
    public class Client
    {
        [Key]
        public int IdClient { get; set; }

        [Display(Name = "Name")]
        [Required(ErrorMessage = "name is a required field")]
        public string Name { get; set; }

        [Display(Name = "Surname")]
        [Required(ErrorMessage = "Surname is a required field")]
        public string Surname { get; set; }

        [Display(Name = "Email")]
        [Required(ErrorMessage = "Email is a required field")]
        public string Email { get; set; }

        [Display(Name = "PhoneNumber")]
        [Required(ErrorMessage = "Phone Number is a required field")]
        public string PhoneNumber { get; set; }

        public bool IsActive { get; set; } = true;

        [ForeignKey("Gym")]
        public int IdGym { get; set; }

        public DateTime FirstDayInscription { get; set; }

        // Relación uno a uno con Inscription (única inscripción activa)
        public int? IdInscription { get; set; }
        public Inscription? Inscription { get; set; }

        // Relación uno a muchos con ClassEnrollments (un cliente puede inscribirse en muchas clases)
        public ICollection<ClassEnrollment> ClassEnrollments { get; set; }

        public Gym? Gyms { get; set; }
        public GymCustomPaymentPlan? GymCustomPaymentPlans { get; set; }
    }


}

