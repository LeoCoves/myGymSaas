using ApiFithub.Controllers;
using ApiFithub.Models.DTOs;
using ApiFithub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ClientControllerTests
{
    private readonly ClientController _controller;
    private readonly ApiFithubContexto _context;

    public ClientControllerTests()
    {
        // Configuramos la base de datos en memoria
        var options = new DbContextOptionsBuilder<ApiFithubContexto>()
                        .UseInMemoryDatabase("TestDb")
                        .Options;

        _context = new ApiFithubContexto(options);

        // Limpiar la base de datos antes de cada prueba
        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();

        // Añadimos un gimnasio con todas las propiedades requeridas
        _context.Gyms.Add(new Gym
        {
            IdGym = 1,
            Name = "Armony Gym",
            Address = "123 Main St",
            Description = "Gym Description",
            Email = "gym@test.com",
            Numberphone = "123-456-7890",
            UserId = "1"
        });

        _context.SaveChanges();

        // Creamos el controlador con la base de datos en memoria
        _controller = new ClientController(_context);
    }

    // Test para crear un cliente
    [Fact]
    public async Task CreateClient_ReturnsCreated_WhenClientIsValid()
    {
        // Arrange: Creamos un DTO de cliente válido
        var clientDto = new ClientDto
        {
            Name = "Juan",
            Surname = "Perez",
            Email = "juan@example.com",
            PhoneNumber = "123456789",
            IsActive = true,
            IdGym = 1
        };

        var result = await _controller.CreateClient(clientDto);

        // Extrae el resultado real del ActionResult
        var createdAtResult = Assert.IsType<CreatedAtActionResult>(result.Result); // <- Usa `.Result`

        Assert.Equal(201, createdAtResult.StatusCode);

    }

    // Test para obtener los clientes de un gimnasio
    [Fact]
    public async Task GetClientsByGym_ReturnsClients_WhenGymExists()
    {
        var client1 = new Client
        {
            IdGym = 1,
            Name = "Juan",
            Surname = "Perez",
            Email = "juan@example.com",
            PhoneNumber = "123456789",
            IsActive = true
        };
        var client2 = new Client
        {
            IdGym = 1,
            Name = "Maria",
            Surname = "Lopez",
            Email = "maria@example.com",
            PhoneNumber = "987654321",
            IsActive = true
        };

        _context.Clients.Add(client1);
        _context.Clients.Add(client2);
        await _context.SaveChangesAsync();

        var result = await _controller.GetClientsByGym(1);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);  
        var clients = Assert.IsAssignableFrom<IEnumerable<Client>>(okResult.Value);  
        Assert.Equal(2, clients.Count());
    }
}
