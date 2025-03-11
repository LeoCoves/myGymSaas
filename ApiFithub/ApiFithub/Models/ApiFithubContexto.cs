using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ApiFithub.Models
{
    public class ApiFithubContexto: IdentityDbContext<ApplicationUser>
    {
        public ApiFithubContexto(DbContextOptions<ApiFithubContexto> options) : base(options)
        {

        }

        // Entidades que vamos a usar
        public DbSet<Gym> Gyms { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<PaymentPlan> PaymentPlans { get; set; }
        public DbSet<GymPaymentPlan> GymPaymentPlans { get; set; }
        public DbSet<GymCustomPaymentPlan> GymCustomPaymentPlans { get; set; }
        public DbSet<ClientGymCustomPaymentPlan> ClientGymCustomPaymentPlans { get; set; }
        public DbSet<MessageAdminGym> MessageAdminGyms { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<ClassEnrollment> ClassEnrollments { get; set; }
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Client> Clients { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relación entre Admin y MessageAdminGym
            modelBuilder.Entity<MessageAdminGym>()
                .HasOne(m => m.Admin)
                .WithMany()  // Un administrador puede tener múltiples mensajes
                .HasForeignKey(m => m.IdAdmin)
                .OnDelete(DeleteBehavior.NoAction);  // Evita cascada de eliminación

            // Relación entre Gym y MessageAdminGym
            modelBuilder.Entity<MessageAdminGym>()
                .HasOne(m => m.Gym)
                .WithMany()  // Un gimnasio puede recibir múltiples mensajes
                .HasForeignKey(m => m.IdGym)
                .OnDelete(DeleteBehavior.NoAction);  // Evita cascada de eliminación

            // Relación entre Gym y GymPaymentPlans
            modelBuilder.Entity<GymPaymentPlan>()
                .HasOne(gp => gp.Gym)
                .WithMany(g => g.GymPaymentPlans)
                .HasForeignKey(gp => gp.IdGym)
                .OnDelete(DeleteBehavior.Cascade);  // Solo cascada en esta relación

            // Relación entre PaymentPlan y GymPaymentPlans
            modelBuilder.Entity<GymPaymentPlan>()
                .HasOne(gp => gp.PaymentPlan)
                .WithMany(p => p.GymPaymentPlans)
                .HasForeignKey(gp => gp.IdPaymentPlan)
                .OnDelete(DeleteBehavior.NoAction);  // Elimina la cascada en esta relación

            // Relación entre Client y ClassEnrollment
            modelBuilder.Entity<ClassEnrollment>()
                .HasOne(ce => ce.Client)
                .WithMany(c => c.ClassEnrollments)
                .HasForeignKey(ce => ce.IdClient)
                .OnDelete(DeleteBehavior.Restrict);  // Evitar cascada en eliminación

            // Relación entre ClientGymCustomPaymentPlan y Client
            modelBuilder.Entity<ClientGymCustomPaymentPlan>()
                .HasOne(cgcp => cgcp.Client) // Relación con Client
                .WithMany() // Muchos ClientGymCustomPaymentPlan pueden estar asociados a un Client
                .HasForeignKey(cgcp => cgcp.ClientId)
                .OnDelete(DeleteBehavior.Restrict); // Evita la eliminación en cascada

            // Relación entre ClientGymCustomPaymentPlan y GymCustomPaymentPlan
            modelBuilder.Entity<ClientGymCustomPaymentPlan>()
                .HasOne(cgcp => cgcp.GymCustomPaymentPlan) // Relación con GymCustomPaymentPlan
                .WithMany() // Muchos ClientGymCustomPaymentPlan pueden estar asociados a un GymCustomPaymentPlan
                .HasForeignKey(cgcp => cgcp.GymCustomPaymentPlanId)
                .OnDelete(DeleteBehavior.Restrict); // Evita la eliminación en cascada
        }
    }
}
