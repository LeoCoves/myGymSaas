using Microsoft.AspNetCore.Identity;

namespace ApiFithub
{
    public class SeedData
    {
        public static async Task SeedRolesAndAdmin(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            // Crear los roles si no existen
            string[] roleNames = { "Administrador", "Gym" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    var roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                    if (!roleResult.Succeeded)
                    {
                        // Puedes manejar el caso en el que la creación del rol falle
                        throw new Exception($"Error al crear el rol {roleName}");
                    }
                }
            }

            // Crear el usuario administrador si no existe
            string adminEmail = "admin@empresa.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                var newAdmin = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true // El email está confirmado por defecto
                };

                var result = await userManager.CreateAsync(newAdmin, "Admin123");

                if (result.Succeeded)
                {
                    // Asignar al rol de Administrador
                    await userManager.AddToRoleAsync(newAdmin, "Administrador");
                }
                else
                {
                    // Manejo de errores si la creación falla
                    throw new Exception("Error al crear el usuario administrador.");
                }
            }
        }
    }
}
