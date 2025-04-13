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
        public DbSet<Inscription> Inscriptions { get; set; }
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

            modelBuilder.Entity<GymCustomPaymentPlan>()
               .HasOne(g => g.Gym)  // Relación entre GymCustomPaymentPlan y Gym
               .WithMany()           // Un gimnasio puede tener muchos planes de pago
               .HasForeignKey(g => g.IdGym)  // Definir la clave foránea
               .OnDelete(DeleteBehavior.Cascade);  // Eliminar planes de pago cuando se elimina el gimnasio

            // Relación entre Client e Inscription (Uno a uno)
            modelBuilder.Entity<Client>()
                .HasOne(c => c.Inscription)  // Un cliente tiene una única inscripción
                .WithOne(i => i.Client)  // Una inscripción pertenece a un solo cliente
                .HasForeignKey<Inscription>(i => i.IdClient)  // La inscripción se enlaza con el cliente
                .OnDelete(DeleteBehavior.Cascade);  // Si se elimina un cliente, se elimina su inscripción

            // Relación entre Inscription y GymCustomPaymentPlan
            modelBuilder.Entity<Inscription>()
                .HasOne(i => i.GymCustomPaymentPlan) // Relación con GymCustomPaymentPlan
                .WithMany()  // No es necesario que un plan tenga muchas inscripciones
                .HasForeignKey(i => i.IdGymCustomPaymentPlan)
                .OnDelete(DeleteBehavior.Restrict); // Evita la eliminación en cascada

            // Relación entre Client y ClassEnrollments (Uno a muchos)
            modelBuilder.Entity<ClassEnrollment>()
                .HasOne(ce => ce.Client)  // Relación con Client
                .WithMany(c => c.ClassEnrollments)  // Un cliente puede tener muchas inscripciones en clases
                .HasForeignKey(ce => ce.IdClient)
                .OnDelete(DeleteBehavior.Restrict);  // Evitar la eliminación en cascada

            // Relación entre ClassEnrollment y ClassSession
            modelBuilder.Entity<ClassEnrollment>()
                .HasOne(ce => ce.ClassSession)  // Relación con ClassSession
                .WithMany()  // Una clase puede tener muchas inscripciones
                .HasForeignKey(ce => ce.IdClassSession)
                .OnDelete(DeleteBehavior.Cascade);  // Si se elimina una clase, se eliminan sus inscripciones

            // Configurar la relación entre User y Gym
            modelBuilder.Entity<Gym>()
                .HasOne(g => g.User)
                .WithMany()
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MessageAdminGym>()
            .HasOne(m => m.Sender)
            .WithMany() // o WithMessages, depende de cómo esté
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict); // 👈 CAMBIA esto

            modelBuilder.Entity<Inscription>()
              .Property(i => i.Cost)
              .HasPrecision(10, 2); // 10 dígitos en total, 2 decimales

            modelBuilder.Entity<Inscription>()
                .Property(i => i.Payment)
                .HasPrecision(10, 2);

        }
    }
}
