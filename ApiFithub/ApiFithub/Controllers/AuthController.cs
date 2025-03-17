using ApiFithub.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiFithub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApiFithubContexto _context;
        private readonly IConfiguration _configuration;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            ApiFithubContexto context,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Crea un nuevo usuario (gimnasio)
                var user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    // Aquí puedes agregar más campos según tu modelo de ApplicationUser
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // Asigna el rol de 'Gym' al usuario (si es necesario)
                    var roleExist = await _roleManager.RoleExistsAsync("Gym");
                    if (!roleExist)
                    {
                        var role = new IdentityRole("Gym");
                        await _roleManager.CreateAsync(role);
                    }
                    await _userManager.AddToRoleAsync(user, "Gym");

                    // Crear el gimnasio en la tabla Gyms
                    var gym = new Gym
                    {
                        Name = model.GymName,
                        Description = model.GymDescription,
                        Address = model.GymAddress,
                        Email = model.Email,
                        Numberphone = model.NumberPhone,
                        UserId = user.Id  // Relacionamos el gimnasio con el usuario recién creado
                    };
                    await _context.Gyms.AddAsync(gym);
                    await _context.SaveChangesAsync();

                    // Puedes devolver algún tipo de respuesta con el gimnasio creado si lo deseas
                    return Ok(new { message = "Gimnasio registrado exitosamente." });
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }

            return BadRequest("Modelo inválido");
        }

        // Aquí puedes agregar el método de login si es necesario

        // Iniciar sesión (JWT)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos.");
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Usuario o contraseña incorrectos.");
            }

            // Obtener el rol del usuario
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault(); // Asumimos que tiene un solo rol

            string gymName = null; // Inicializamos en null

            // Si el usuario es un "Gym", buscamos el gimnasio en la base de datos
            if (role == "Gym")
            {
                var gym = await _context.Gyms
                    .Where(g => g.UserId == user.Id) // Buscar por UserId en lugar de Email
                    .FirstOrDefaultAsync();

                if (gym == null)
                {
                    return NotFound("Gimnasio no encontrado para este usuario");
                }

                gymName = gym.Name; // Guardamos el nombre del gimnasio
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Token = token,
                UserName = user.UserName,
                Role = role,  // Devolver el rol
                GymName = gymName // Si es admin, será null
            });
        }

        // Generar JWT
        private string GenerateJwtToken(ApplicationUser user)
        {
            var userRoles = _userManager.GetRolesAsync(user).Result; // Obtener los roles del usuario

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // Agregar el rol al token
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
