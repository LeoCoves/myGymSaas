using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiFithub.Migrations
{
    /// <inheritdoc />
    public partial class SetCashCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CashCountIdCashCount",
                table: "Inscriptions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CashCounts",
                columns: table => new
                {
                    IdCashCount = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdGym = table.Column<int>(type: "int", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IVA = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OtherTaxes = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashCounts", x => x.IdCashCount);
                    table.ForeignKey(
                        name: "FK_CashCounts_Gyms_IdGym",
                        column: x => x.IdGym,
                        principalTable: "Gyms",
                        principalColumn: "IdGym",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inscriptions_CashCountIdCashCount",
                table: "Inscriptions",
                column: "CashCountIdCashCount");

            migrationBuilder.CreateIndex(
                name: "IX_CashCounts_IdGym",
                table: "CashCounts",
                column: "IdGym");

            migrationBuilder.AddForeignKey(
                name: "FK_Inscriptions_CashCounts_CashCountIdCashCount",
                table: "Inscriptions",
                column: "CashCountIdCashCount",
                principalTable: "CashCounts",
                principalColumn: "IdCashCount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inscriptions_CashCounts_CashCountIdCashCount",
                table: "Inscriptions");

            migrationBuilder.DropTable(
                name: "CashCounts");

            migrationBuilder.DropIndex(
                name: "IX_Inscriptions_CashCountIdCashCount",
                table: "Inscriptions");

            migrationBuilder.DropColumn(
                name: "CashCountIdCashCount",
                table: "Inscriptions");
        }
    }
}
