namespace ApiFithub.Models.DTOs
{
    public class CashCountDto
    {
        public DateTime Date { get; set; }
        public int IdGym { get; set; }
        public decimal Subtotal { get; set; }
        public decimal IVA { get; set; }
        public decimal OtherTaxes { get; set; }
        public decimal Total { get; set; }
    }

}
