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

        public DbSet<PaymentPlan> PaymentPlans { get; set; }
        public DbSet<GymPaymentPlan> GymPaymentPlans { get; set; }
        public DbSet<GymCustomPaymentPlan> GymCustomPaymentPlans { get; set; }
        public DbSet<ClientGymCustomPaymentPlan> ClientGymCustomPaymentPlans { get; set; }
        public DbSet<MessageAdminGym> MessageAdminGyms { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }

        // ✅ Renombrado para mayor claridad
        public DbSet<ClassTemplate> ClassTemplates { get; set; }
        public DbSet<ClassSession> ClassSessions { get; set; }
        public DbSet<ClassEnrollment> ClassEnrollments { get; set; }

        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Client> Clients { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relación entre Admin y MessageAdminGym
            modelBuilder.Entity<MessageAdminGym>()
                .HasOne(m => m.Sender)
                .WithMany()  // Un administrador puede tener múltiples mensajes
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.NoAction);  // Evita cascada de eliminación

            // Relación entre Gym y MessageAdminGym
            modelBuilder.Entity<MessageAdminGym>()
                .HasOne(m => m.Receiver)
                .WithMany()  // Un gimnasio puede recibir múltiples mensajes
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.NoAction);  // Evita cascada de eliminación


            // ✅ Relación entre ClassTemplate y Gym
            modelBuilder.Entity<ClassTemplate>()
                .HasOne(ct => ct.Gym)
                .WithMany(g => g.ClassTemplates)  // Un gimnasio tiene muchas plantillas de clases
                .HasForeignKey(ct => ct.IdGym)
                .OnDelete(DeleteBehavior.Cascade);  // Si se elimina el gym, se eliminan las plantillas

            // ✅ Relación entre ClassSession y ClassTemplate
            modelBuilder.Entity<ClassSession>()
                .HasOne(cs => cs.ClassTemplate)
                .WithMany(ct => ct.ClassSessions)  // Una plantilla puede tener muchas sesiones
                .HasForeignKey(cs => cs.IdClassTemplate)
                .OnDelete(DeleteBehavior.Cascade);  // Si se elimina la plantilla, se eliminan sus sesiones

           
            // Relación entre Client y ClassEnrollment (Ya estaba)
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

            // Configurar la relación entre User y Gym
            modelBuilder.Entity<Gym>()
                .HasOne(g => g.User)
                .WithMany()
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
