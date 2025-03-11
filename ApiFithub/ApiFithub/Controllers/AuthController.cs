using ApiFithub.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        // Generar JWT
        private string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
        };

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
