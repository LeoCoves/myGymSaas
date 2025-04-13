using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiFithub.Migrations
{
    /// <inheritdoc />
    public partial class ClientsAndPlansModified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_GymCustomPaymentPlans_GymCustomPaymentPlanIdGymCustomPaymentPlan",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Gyms_IdGym",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_GymCustomPaymentPlans_Gyms_GymId",
                table: "GymCustomPaymentPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_ReceiverId",
                table: "MessageAdminGyms");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_SenderId",
                table: "MessageAdminGyms");

            migrationBuilder.DropTable(
                name: "ClientGymCustomPaymentPlans");

            migrationBuilder.DropIndex(
                name: "IX_Clients_IdGym",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "GymCustomPaymentPlans");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "GymCustomPaymentPlans");

            migrationBuilder.RenameColumn(
                name: "GymId",
                table: "GymCustomPaymentPlans",
                newName: "IdGym");

            migrationBuilder.RenameIndex(
                name: "IX_GymCustomPaymentPlans_GymId",
                table: "GymCustomPaymentPlans",
                newName: "IX_GymCustomPaymentPlans_IdGym");

            migrationBuilder.RenameColumn(
                name: "IdGymCustomPaymentPlan",
                table: "Clients",
                newName: "IdInscription");

            migrationBuilder.RenameColumn(
                name: "GymCustomPaymentPlanIdGymCustomPaymentPlan",
                table: "Clients",
                newName: "GymsIdGym");

            migrationBuilder.RenameIndex(
                name: "IX_Clients_GymCustomPaymentPlanIdGymCustomPaymentPlan",
                table: "Clients",
                newName: "IX_Clients_GymsIdGym");

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "GymCustomPaymentPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GymIdGym",
                table: "GymCustomPaymentPlans",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstDayInscription",
                table: "Clients",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "GymCustomPaymentPlansIdGymCustomPaymentPlan",
                table: "Clients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Inscriptions",
                columns: table => new
                {
                    IdInscription = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdGymCustomPaymentPlan = table.Column<int>(type: "int", nullable: false),
                    IdClient = table.Column<int>(type: "int", nullable: false),
                    IdGym = table.Column<int>(type: "int", nullable: false),
                    Payment = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inscriptions", x => x.IdInscription);
                    table.ForeignKey(
                        name: "FK_Inscriptions_Clients_IdClient",
                        column: x => x.IdClient,
                        principalTable: "Clients",
                        principalColumn: "IdClient",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inscriptions_GymCustomPaymentPlans_IdGymCustomPaymentPlan",
                        column: x => x.IdGymCustomPaymentPlan,
                        principalTable: "GymCustomPaymentPlans",
                        principalColumn: "IdGymCustomPaymentPlan",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inscriptions_Gyms_IdGym",
                        column: x => x.IdGym,
                        principalTable: "Gyms",
                        principalColumn: "IdGym",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GymCustomPaymentPlans_GymIdGym",
                table: "GymCustomPaymentPlans",
                column: "GymIdGym");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_GymCustomPaymentPlansIdGymCustomPaymentPlan",
                table: "Clients",
                column: "GymCustomPaymentPlansIdGymCustomPaymentPlan");

            migrationBuilder.CreateIndex(
                name: "IX_Inscriptions_IdClient",
                table: "Inscriptions",
                column: "IdClient",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inscriptions_IdGym",
                table: "Inscriptions",
                column: "IdGym");

            migrationBuilder.CreateIndex(
                name: "IX_Inscriptions_IdGymCustomPaymentPlan",
                table: "Inscriptions",
                column: "IdGymCustomPaymentPlan");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_GymCustomPaymentPlans_GymCustomPaymentPlansIdGymCustomPaymentPlan",
                table: "Clients",
                column: "GymCustomPaymentPlansIdGymCustomPaymentPlan",
                principalTable: "GymCustomPaymentPlans",
                principalColumn: "IdGymCustomPaymentPlan");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Gyms_GymsIdGym",
                table: "Clients",
                column: "GymsIdGym",
                principalTable: "Gyms",
                principalColumn: "IdGym");

            migrationBuilder.AddForeignKey(
                name: "FK_GymCustomPaymentPlans_Gyms_GymIdGym",
                table: "GymCustomPaymentPlans",
                column: "GymIdGym",
                principalTable: "Gyms",
                principalColumn: "IdGym");

            migrationBuilder.AddForeignKey(
                name: "FK_GymCustomPaymentPlans_Gyms_IdGym",
                table: "GymCustomPaymentPlans",
                column: "IdGym",
                principalTable: "Gyms",
                principalColumn: "IdGym",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_ReceiverId",
                table: "MessageAdminGyms",
                column: "ReceiverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_SenderId",
                table: "MessageAdminGyms",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_GymCustomPaymentPlans_GymCustomPaymentPlansIdGymCustomPaymentPlan",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Gyms_GymsIdGym",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_GymCustomPaymentPlans_Gyms_GymIdGym",
                table: "GymCustomPaymentPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_GymCustomPaymentPlans_Gyms_IdGym",
                table: "GymCustomPaymentPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_ReceiverId",
                table: "MessageAdminGyms");

            migrationBuilder.DropForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_SenderId",
                table: "MessageAdminGyms");

            migrationBuilder.DropTable(
                name: "Inscriptions");

            migrationBuilder.DropIndex(
                name: "IX_GymCustomPaymentPlans_GymIdGym",
                table: "GymCustomPaymentPlans");

            migrationBuilder.DropIndex(
                name: "IX_Clients_GymCustomPaymentPlansIdGymCustomPaymentPlan",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "GymCustomPaymentPlans");

            migrationBuilder.DropColumn(
                name: "GymIdGym",
                table: "GymCustomPaymentPlans");

            migrationBuilder.DropColumn(
                name: "FirstDayInscription",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "GymCustomPaymentPlansIdGymCustomPaymentPlan",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "IdGym",
                table: "GymCustomPaymentPlans",
                newName: "GymId");

            migrationBuilder.RenameIndex(
                name: "IX_GymCustomPaymentPlans_IdGym",
                table: "GymCustomPaymentPlans",
                newName: "IX_GymCustomPaymentPlans_GymId");

            migrationBuilder.RenameColumn(
                name: "IdInscription",
                table: "Clients",
                newName: "IdGymCustomPaymentPlan");

            migrationBuilder.RenameColumn(
                name: "GymsIdGym",
                table: "Clients",
                newName: "GymCustomPaymentPlanIdGymCustomPaymentPlan");

            migrationBuilder.RenameIndex(
                name: "IX_Clients_GymsIdGym",
                table: "Clients",
                newName: "IX_Clients_GymCustomPaymentPlanIdGymCustomPaymentPlan");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "GymCustomPaymentPlans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "GymCustomPaymentPlans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ClientGymCustomPaymentPlans",
                columns: table => new
                {
                    IdClientGymCustomPaymentPlan = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    GymCustomPaymentPlanId = table.Column<int>(type: "int", nullable: false),
                    SubscriptionDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientGymCustomPaymentPlans", x => x.IdClientGymCustomPaymentPlan);
                    table.ForeignKey(
                        name: "FK_ClientGymCustomPaymentPlans_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "IdClient",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientGymCustomPaymentPlans_GymCustomPaymentPlans_GymCustomPaymentPlanId",
                        column: x => x.GymCustomPaymentPlanId,
                        principalTable: "GymCustomPaymentPlans",
                        principalColumn: "IdGymCustomPaymentPlan",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clients_IdGym",
                table: "Clients",
                column: "IdGym");

            migrationBuilder.CreateIndex(
                name: "IX_ClientGymCustomPaymentPlans_ClientId",
                table: "ClientGymCustomPaymentPlans",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientGymCustomPaymentPlans_GymCustomPaymentPlanId",
                table: "ClientGymCustomPaymentPlans",
                column: "GymCustomPaymentPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_GymCustomPaymentPlans_GymCustomPaymentPlanIdGymCustomPaymentPlan",
                table: "Clients",
                column: "GymCustomPaymentPlanIdGymCustomPaymentPlan",
                principalTable: "GymCustomPaymentPlans",
                principalColumn: "IdGymCustomPaymentPlan");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Gyms_IdGym",
                table: "Clients",
                column: "IdGym",
                principalTable: "Gyms",
                principalColumn: "IdGym",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GymCustomPaymentPlans_Gyms_GymId",
                table: "GymCustomPaymentPlans",
                column: "GymId",
                principalTable: "Gyms",
                principalColumn: "IdGym",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_ReceiverId",
                table: "MessageAdminGyms",
                column: "ReceiverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MessageAdminGyms_AspNetUsers_SenderId",
                table: "MessageAdminGyms",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
