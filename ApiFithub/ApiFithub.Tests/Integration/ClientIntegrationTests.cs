using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using ApiFithub.Models.DTOs;
using System.Net;
using ApiFithub.Models;

namespace ApiFithub.Tests.Integration
{
    public class ClientIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly WebApplicationFactory<Program> _factory;

        public ClientIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();  // Crea el cliente HTTP para hacer las solicitudes
        }

        [Fact]
        public async Task CreateClient_Endpoint_ReturnsCreatedStatus()
        {
            var newClient = new Client
            {
                IdGym = 1,
                Name = "Juan",
                Surname = "Perez",
                Email = "juan@example.com",
                PhoneNumber = "123456789",
                IsActive = true
            };

            var response = await _client.PostAsJsonAsync("/api/clients", newClient);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }
    }

}

