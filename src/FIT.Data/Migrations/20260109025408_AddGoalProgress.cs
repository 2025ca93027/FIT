using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FIT.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddGoalProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Progress",
                table: "goals",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Progress",
                table: "goals");
        }
    }
}
