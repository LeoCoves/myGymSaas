using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiFithub.Migrations
{
    /// <inheritdoc />
    public partial class SetRefundAndPayMethod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "Inscriptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Refund",
                table: "Inscriptions",
                type: "decimal(10,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "Inscriptions");

            migrationBuilder.DropColumn(
                name: "Refund",
                table: "Inscriptions");
        }
    }
}
