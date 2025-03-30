using Microsoft.Data.SqlClient;
using System.Text.Json.Serialization;

namespace ApiFithub.Models.DTOs
{
    public class ClientDto
    {
        public int IdClient { get; set; }
        public int idGym { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public int? IdGymCustomPaymentPlan { get; set; }
    }
}

