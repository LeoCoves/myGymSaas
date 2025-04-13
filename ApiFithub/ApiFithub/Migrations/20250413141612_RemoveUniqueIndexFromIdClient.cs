using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiFithub.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUniqueIndexFromIdClient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Inscriptions_IdClient",
                table: "Inscriptions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Inscriptions_IdClient",
                table: "Inscriptions",
                column: "IdClient",
                unique: true); // Esto lo vuelve a crear si hacés rollback
        }
    }
}
