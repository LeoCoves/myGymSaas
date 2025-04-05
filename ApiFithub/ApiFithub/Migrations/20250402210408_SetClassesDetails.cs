using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiFithub.Migrations
{
    /// <inheritdoc />
    public partial class SetClassesDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassEnrollments_Classes_IdClass",
                table: "ClassEnrollments");

            migrationBuilder.DropTable(
                name: "Classes");

            migrationBuilder.RenameColumn(
                name: "IdClass",
                table: "ClassEnrollments",
                newName: "IdClassSession");

            migrationBuilder.RenameColumn(
                name: "IdInscription",
                table: "ClassEnrollments",
                newName: "IdEnrollment");

            migrationBuilder.RenameIndex(
                name: "IX_ClassEnrollments_IdClass",
                table: "ClassEnrollments",
                newName: "IX_ClassEnrollments_IdClassSession");

            migrationBuilder.AddColumn<int>(
                name: "ClassSessionIdClassSession",
                table: "Clients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ClassTemplates",
                columns: table => new
                {
                    IdClassTemplate = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instructor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdGym = table.Column<int>(type: "int", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassTemplates", x => x.IdClassTemplate);
                    table.ForeignKey(
                        name: "FK_ClassTemplates_Gyms_IdGym",
                        column: x => x.IdGym,
                        principalTable: "Gyms",
                        principalColumn: "IdGym",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClassSessions",
                columns: table => new
                {
                    IdClassSession = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdClassTemplate = table.Column<int>(type: "int", nullable: false),
                    SessionDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassSessions", x => x.IdClassSession);
                    table.ForeignKey(
                        name: "FK_ClassSessions_ClassTemplates_IdClassTemplate",
                        column: x => x.IdClassTemplate,
                        principalTable: "ClassTemplates",
                        principalColumn: "IdClassTemplate",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clients_ClassSessionIdClassSession",
                table: "Clients",
                column: "ClassSessionIdClassSession");

            migrationBuilder.CreateIndex(
                name: "IX_ClassSessions_IdClassTemplate",
                table: "ClassSessions",
                column: "IdClassTemplate");

            migrationBuilder.CreateIndex(
                name: "IX_ClassTemplates_IdGym",
                table: "ClassTemplates",
                column: "IdGym");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassEnrollments_ClassSessions_IdClassSession",
                table: "ClassEnrollments",
                column: "IdClassSession",
                principalTable: "ClassSessions",
                principalColumn: "IdClassSession",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_ClassSessions_ClassSessionIdClassSession",
                table: "Clients",
                column: "ClassSessionIdClassSession",
                principalTable: "ClassSessions",
                principalColumn: "IdClassSession");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassEnrollments_ClassSessions_IdClassSession",
                table: "ClassEnrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_Clients_ClassSessions_ClassSessionIdClassSession",
                table: "Clients");

            migrationBuilder.DropTable(
                name: "ClassSessions");

            migrationBuilder.DropTable(
                name: "ClassTemplates");

            migrationBuilder.DropIndex(
                name: "IX_Clients_ClassSessionIdClassSession",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "ClassSessionIdClassSession",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "IdClassSession",
                table: "ClassEnrollments",
                newName: "IdClass");

            migrationBuilder.RenameColumn(
                name: "IdEnrollment",
                table: "ClassEnrollments",
                newName: "IdInscription");

            migrationBuilder.RenameIndex(
                name: "IX_ClassEnrollments_IdClassSession",
                table: "ClassEnrollments",
                newName: "IX_ClassEnrollments_IdClass");

            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    IdClass = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdGym = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.IdClass);
                    table.ForeignKey(
                        name: "FK_Classes_Gyms_IdGym",
                        column: x => x.IdGym,
                        principalTable: "Gyms",
                        principalColumn: "IdGym",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Classes_IdGym",
                table: "Classes",
                column: "IdGym");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassEnrollments_Classes_IdClass",
                table: "ClassEnrollments",
                column: "IdClass",
                principalTable: "Classes",
                principalColumn: "IdClass",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
