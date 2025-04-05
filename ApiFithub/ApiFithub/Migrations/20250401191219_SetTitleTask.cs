using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiFithub.Migrations
{
    /// <inheritdoc />
    public partial class SetTitleTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "TaskItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "TaskItems");
        }
    }
}
