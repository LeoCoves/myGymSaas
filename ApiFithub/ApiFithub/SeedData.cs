using Microsoft.AspNetCore.Identity;

namespace ApiFithub
{
    public class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var roleNames = new[] { "Admin", "Gym" }; // Roles que queremos crear

            // Crear roles si no existen
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // Crear un único administrador si no existe
            var adminEmail = "admin@fithub.com";  // Cambia este correo si lo necesitas
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    // Puedes agregar más propiedades si es necesario
                };

                var result = await userManager.CreateAsync(adminUser, "AdminPassword123!");  // Cambia la contraseña si lo necesitas

                if (result.Succeeded)
                {
                    // Asignar el rol "Admin" al usuario administrador
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
    }
}
