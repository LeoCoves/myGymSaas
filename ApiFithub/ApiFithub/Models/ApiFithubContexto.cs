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

        public DbSet<Gym> Gyms { get; set; }
    }
}
